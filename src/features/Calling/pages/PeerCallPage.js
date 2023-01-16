import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { initialStreamStateNames, useStreamContext } from "../../../contexts/StreamContext";
import { socketInstance } from "../../utils/socketInstance";
import PeerCallLayout from "../layout/PeerToPeerCall/PeerCallLayout";
import Peer from "simple-peer";
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import OvalButton from "../components/OvalButton/OvalButton";
import CircularButton from "../components/CircularButton/CircularButton";
import { useUserContext } from "../../../contexts/UserContext";
import { VideoCameraFront } from "@mui/icons-material";
import { STREAM_REDUCER_ACTIONS } from "../../../reducers/StreamReducer";

const PeerCallPage = () => {
    const location = useLocation();
    const [ params, setParams ] = useSearchParams();
    const [ isVideoCall, setIsVideoCall ] = useState(false);
    const [ isAudioEnabled, setIsAudioEnabled ] = useState(true);
    const navigate = useNavigate();
    const [ callType, setCallType ] = useState(null);
    const { currentUser } = useUserContext();
    const { streamState, dispatchToStreamState } = useStreamContext();

    useEffect(() => {

        if (!location || !location.state) return navigate("/");

        if (!location.state.newCall) return navigate("/");

        // TO ADD
        // if (!location.state.userIdToCall) return 

        // callUser(location.state.userIdToCall)

    }, [location])

    useEffect(() => {

        const callType = params.get("type");

        if (!callType || !["audio", "video"].includes(callType)) return navigate("/");

        setCallType(callType);

        if (callType === "audio") {
            // socketInstance.emit("update-video-status", streamState.socketIdToCall, false);
            setIsVideoCall(false);

            if (!streamState.localStream) return
            
            streamState.localStream.getVideoTracks().forEach(track => {
                track.enabled = false
            });

            return 
        }

        setIsVideoCall(true);

    }, [params])

    useEffect(() => {

        if (!streamState.callRejected && !streamState.callEnded) return

        setTimeout(() => navigate("/"), 1800);        

    }, [streamState.callRejected, streamState.callEnded])

    const callUser = (userIdToCall) => {

        if (!userIdToCall || userIdToCall.length < 1) return
        
        dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.START_PEER_CALL })

        // creating a new peer instance for the current user initating the call
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: streamState.localStream
        })

        // to emit an event to call a user as soon as this peer receives a signal
        peer.on("signal", (data) => {
            socketInstance.emit("call-user", userIdToCall, data, streamState.socketId, currentUser.displayName, callType)
        })

        // to update the other user's video stream when this peer receives it
        peer.on("stream", (stream) => {
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_REMOTE_STREAM, stateToUpdate: initialStreamStateNames.remoteStream, payload: { value: stream }})
        })

        socketInstance.on("call-accepted", (signal) => {
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_CALL_ACCEPTED, stateToUpdate: initialStreamStateNames.callAccepted, payload: { value: true }})
            peer.signal(signal)
        })

    }

    const leaveCall = () => dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_CALL_ENDED, stateToUpdate: initialStreamStateNames.callEnded, payload: { value: true } })


    const handleUpdateAudioStatus = () => {
        const updatedStatus = !isAudioEnabled;
        setIsAudioEnabled(updatedStatus);
        
        if ((!streamState.receivingCall) && (!streamState.socketIdToCall || streamState.socketIdToCall.length < 1)) return
        
        if (streamState.receivingCall) return socketInstance.emit("update-audio-status", streamState.caller, updatedStatus);
        
        socketInstance.emit("update-audio-status", streamState.socketIdToCall, updatedStatus);
    }

    const handleUpdateVideoStatus = () => {
        const updatedStatus = !isVideoCall;        
        setIsVideoCall(updatedStatus);

        if ((!streamState.receivingCall) && (!streamState.socketIdToCall || streamState.socketIdToCall.length < 1)) return

        if (streamState.receivingCall) return socketInstance.emit("update-video-status", streamState.caller, updatedStatus);

        socketInstance.emit("update-video-status", streamState.socketIdToCall, updatedStatus);
    }

    return <PeerCallLayout localUserAudioEnabled={isAudioEnabled} localUserVideoEnabled={isVideoCall} remoteUserAudioEnabled={streamState.remoteAudioStatus} remoteUserVideoEnabled={streamState.remoteVideoStatus}>

        <p className="calling__User__Status__Indicator">
            { 
                (streamState.isCalling && !streamState.callRejected) ?
                "Calling..." :
                streamState.callRejected ?
                "Call Rejected" : 
                streamState.callEnded ?
                "Call Ended" :
                <></>
            }
        </p>

        {/* TO REMOVE */}
        <p style={{ position: "fixed", bottom: "3rem", color: "#fff"}}>Your socket id: {streamState.socketId}</p>
        <input style={{ background: "#fff", position: "fixed", bottom: "2rem" }} value={streamState.socketIdToCall} onChange={(e) => dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_SOCKET_ID_TO_CALL, stateToUpdate: initialStreamStateNames.socketIdToCall, payload: { value:  e.target.value }})} />
        
        <div className="call__Btns__Container">
            { !streamState.isCalling && !streamState.receivingCall && <CircularButton style={{ background: "#2F80ED", color: "#fff", marginRight: "1.5rem"}} icon={<CallIcon />} handleClick={() => callUser(streamState.socketIdToCall)} /> }
            
            <CircularButton style={{ background: isAudioEnabled ? "#fff" : "#EB5757" }} icon={<MicIcon />} handleClick={() => handleUpdateAudioStatus()} />

            <CircularButton style={{ background: !isVideoCall ? "#EB5757" : "#2F80ED", color: "#fff", marginLeft: "1.5rem"}} icon={<VideoCameraFront />} handleClick={() => handleUpdateVideoStatus()} />

            {
                streamState.callAccepted &&
                <OvalButton icon={<CallEndIcon />} style={{ marginLeft: "1.5rem"}} handleClick={() => leaveCall()} />
            }
        </div>
    </PeerCallLayout>
}

export default PeerCallPage;
