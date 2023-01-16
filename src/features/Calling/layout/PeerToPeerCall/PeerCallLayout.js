import { useEffect } from "react";
import { initialStreamStateNames, useStreamContext } from "../../../../contexts/StreamContext";
import { useUserContext } from "../../../../contexts/UserContext";
import { STREAM_REDUCER_ACTIONS } from "../../../../reducers/StreamReducer";
import UserVideoItem from "../../components/UserVideoItem/UserVideoItem";
import { getLocalUserStream } from "../../utils/utils";
import "./style.css";


const PeerCallLayout = ({ children, localUserAudioEnabled, localUserVideoEnabled, remoteUserAudioEnabled, remoteUserVideoEnabled}) => {
    const { currentUser } = useUserContext();
    const { streamState, dispatchToStreamState } = useStreamContext();

    useEffect(() => {

        getLocalUserStream().then(stream => {
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_LOCAL_STREAM, stateToUpdate: initialStreamStateNames.localStream, payload: { value: stream }})
        }).catch(err => {
            console.log(err)
        })
    
    }, [])
    
    return <>
        <div className="peer__Call__Container__Page">
            <div className="local__User__Video__Container">
                { 
                    <UserVideoItem
                        isMuted={localUserAudioEnabled} 
                        showVideo={localUserVideoEnabled} 
                        videoStream={streamState.localStream} 
                        isLocalUser={true} 
                        userPicture={currentUser.displayPicture} 
                    />
                }
            </div>
            <div className="remote__User__Video__Container">
                { 
                    <UserVideoItem 
                        isMuted={remoteUserAudioEnabled} 
                        showVideo={remoteUserVideoEnabled} 
                        videoStream={streamState.remoteStream} 
                        // userPicture={currentUser.displayPicture} 
                    />
                }
            </div>

            { children }
        </div>
    </>
}

export default PeerCallLayout;