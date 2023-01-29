import { VideoCameraFront } from "@mui/icons-material";
import CircularButton from "../components/CircularButton/CircularButton";
import GroupCallLayout from "../layout/GroupCall/GroupCallLayout";
import MicIcon from '@mui/icons-material/Mic';
import OvalButton from "../components/OvalButton/OvalButton";
import CallEndIcon from '@mui/icons-material/CallEnd';
import useUpdateChangeCallTypeOnParams from "../hooks/useUpdateChangeCallTypeOnParams";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialStreamStateNames, useStreamContext } from "../../../contexts/StreamContext";
import useListenForMembersJoiningRoom from "../hooks/useListenForMembersJoiningRoom";
import { socketInstance } from "../../utils/socketInstance";
import { useAppContext } from "../../../contexts/AppContext";
import { STREAM_REDUCER_ACTIONS } from "../../../reducers/StreamReducer";

const GroupCallPage = () => {
    const [ callType, setCallType ] = useState(null);
    const [ isVideoCall, setIsVideoCall ] = useState(false);
    const [ isAudioEnabled, setIsAudioEnabled ] = useState(true);
    const { streamState, dispatchToStreamState } = useStreamContext();
    const { currentChannel } = useAppContext();
    const navigate = useNavigate();

    useUpdateChangeCallTypeOnParams(setCallType, setIsVideoCall, () => navigate("/"));
    useListenForMembersJoiningRoom();

    useEffect(() => {

        if (!streamState.groupCallEnded) return

        setTimeout(() => navigate("/"), 1800);        

    }, [streamState.groupCallEnded])

    const handleUpdateAudioStatus = () => {
        const updatedStatus = !isAudioEnabled;
        setIsAudioEnabled(updatedStatus);
    }

    const handleUpdateVideoStatus = () => {
        const updatedStatus = !isVideoCall;        
        setIsVideoCall(updatedStatus);
    }

    const handleLeaveGroupCall = () => {
        if (streamState.userLeftGroupCall) return
        socketInstance.emit("leave-room", streamState.socketId, currentChannel.id, streamState.currentRoomId);
        dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_USER_LEFT_GROUP_CALL, stateToUpdate: initialStreamStateNames.userLeftGroupCall, payload: { value: true }});
        setTimeout(() => navigate("/"), 1800); 
    }

    return <GroupCallLayout localUserAudioEnabled={isAudioEnabled} localUserVideoEnabled={isVideoCall}>
        
        { (streamState.groupCallEnded || streamState.userLeftGroupCall) && <p className="group__Call__Ended__Text">Call Ended</p> }

        <div className="call__Btns__Container">
            <CircularButton style={{ background: isAudioEnabled ? "#fff" : "#EB5757" }} icon={<MicIcon />} handleClick={() => handleUpdateAudioStatus()} />

            <CircularButton style={{ background: !isVideoCall ? "#EB5757" : "#2F80ED", color: "#fff", marginLeft: "1.5rem"}} icon={<VideoCameraFront />} handleClick={() => handleUpdateVideoStatus()} />

            <OvalButton icon={<CallEndIcon />} style={{ marginLeft: "1.5rem"}} handleClick={() => handleLeaveGroupCall()} />
        </div>
        
    </GroupCallLayout>
}

export default GroupCallPage;
