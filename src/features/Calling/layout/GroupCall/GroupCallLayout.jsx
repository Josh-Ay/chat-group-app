import React, { useEffect, useState } from "react";
import { initialStreamStateNames, useStreamContext } from "../../../../contexts/StreamContext";
import { useUserContext } from "../../../../contexts/UserContext";
import UserVideoItem from "../../components/UserVideoItem/UserVideoItem";
import useGetLocalUserVideoStream from "../../hooks/useGetLocalUserVideoStream";
import Peer from "simple-peer";
import "./style.css";
import { socketInstance } from "../../../utils/socketInstance";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../../../../contexts/AppContext";
import { STREAM_REDUCER_ACTIONS } from "../../../../reducers/StreamReducer";

const GroupCallLayout = ( { children, localUserAudioEnabled, localUserVideoEnabled }) => {

    const { streamState, dispatchToStreamState } = useStreamContext();
    const { currentUser } = useUserContext();
    const { currentChannel, channels, setCurrentChannel } = useAppContext();
    const [ params, setParams ] = useSearchParams();
    const [ currentUserPeerRef, setCurrentUserPeerRef ] = useState(null);

    useGetLocalUserVideoStream();

    useEffect(() => {
        
        const passedId = params.get("id");
        const currentChannelId = params.get("channelId");
        
        if (!passedId || !currentChannelId) return
        
        const foundChannel = channels.find(channel => channel.id === currentChannelId)
        if (!foundChannel) return
        
        setCurrentChannel(foundChannel);
        dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_CURRENT_ROOM_ID, stateToUpdate: initialStreamStateNames.currentRoomId, payload: { value: passedId }})
        
        socketInstance.emit("get-users-in-room", foundChannel.id, passedId, (response) => {
            response.peers.forEach(peer => {
                dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.ADD_NEW_PEER, payload: { value: peer }})
            })
        })

    }, [params])
    
    useEffect(() => {

        if (!streamState.localStream) return

        // creating a new peer instance for this current user
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: streamState.localStream
        })

        peer.on("signal", (data) => {
            if (!streamState.currentRoomId) return
            socketInstance.emit("update-users-in-room", currentUser.id, streamState.socketId, currentChannel.id, streamState.currentRoomId, data)
        })

        peer.on("stream", (stream) => {
            if (!streamState.currentRoomId) return
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_PEER_STREAM_IN_ROOM, payload: { value: stream, userId: currentUser.id } })
        })

        setCurrentUserPeerRef(peer);

    }, [streamState.localStream])

    useEffect(() => {
        
        if (!currentUserPeerRef) return
        
        streamState.peers.forEach(peer => {
            try {
                currentUserPeerRef.signal(peer.signal)                
            } catch (error) {
                console.log(error)
            }
        })
        
    }, [currentUserPeerRef, streamState.peers])

    return <>
        <div className="group__Call__Container">
            <h3 className="group__Title">Front-end developers group call</h3>
            <div className="group__Videos__Container">
                { 
                    <UserVideoItem
                        isMuted={localUserAudioEnabled} 
                        showVideo={localUserVideoEnabled} 
                        videoStream={streamState.localStream} 
                        isLocalUser={true} 
                        userPicture={currentUser.displayPicture} 
                    />
                }                
                {
                    React.Children.toArray(streamState.peers.map(peer => {
                        return <UserVideoItem videoStream={peer.stream} />
                    }))
                }
            </div>

            { children }
        </div>
    </>
}

export default GroupCallLayout;