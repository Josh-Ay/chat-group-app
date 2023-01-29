import { Close } from "@mui/icons-material";
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { initialStreamStateNames, useStreamContext } from "../../../../contexts/StreamContext";
import { STREAM_REDUCER_ACTIONS } from "../../../../reducers/StreamReducer";
import CircularButton from "../CircularButton/CircularButton";
import OvalButton from "../OvalButton/OvalButton";
import Peer from "simple-peer";
import "./style.css";
import { socketInstance } from "../../../utils/socketInstance";
import { useNavigate } from "react-router-dom";


const IncomingCallItem = ({ personCalling, channel, isGroupCall }) => {
    const { streamState, dispatchToStreamState } = useStreamContext();
    const navigate = useNavigate();

    const answerPeerCall = () => {

        // update the status of the call
        dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_CALL_ACCEPTED, stateToUpdate: initialStreamStateNames.callAccepted, payload: { value: true }})

        // creating a new peer instance for the user about to answer the call
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: streamState.localStream
        })

        // to emit an event to call a user as soon as this peer receives a signal
        peer.on("signal", (data) => {
            socketInstance.emit("answer-call", streamState.caller, data)
        })

        // to update the other user's video stream when this peer receives it
        peer.on("stream", (stream) => {
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_REMOTE_STREAM, stateToUpdate: initialStreamStateNames.remoteStream, payload: { value: stream }})
        })

        peer.signal(streamState.callerSignal)
        
        navigate(`/peer-call?type=${streamState.callType}`, { state: { newCall: true }})
    }

    const handleCancelCall = () => {

        if (!isGroupCall) {
            socketInstance.emit("cancel-call", streamState.caller)
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.REJECT_PEER_CALL })
            return
        }

    }

    const answerGroupCall = () => {

    }

    return <div className="incoming__Call__Overlay">
        <div className="incoming__Call__Container">
            <div className="close__Icon" onClick={handleCancelCall}>
                <Close />
            </div>
            <h1>{personCalling} is calling...</h1>
            { channel && <span>from {channel.length > 40 ? channel.slice(0, 40) + "..." : channel}</span> }
            <div className="incoming__Call__Btns__Container">
                <CircularButton style={{ background: "#2F80ED", color: "#fff", marginRight: "1.5rem"}} icon={<CallIcon />} handleClick={isGroupCall ? () => answerGroupCall() : () => answerPeerCall()} />
                <OvalButton icon={<CallEndIcon />} style={{ marginLeft: "1.5rem"}} handleClick={handleCancelCall} />
            </div>
        </div>
    </div> 
}

export default IncomingCallItem;