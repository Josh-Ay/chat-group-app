import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import "./style.css";
import { toast } from 'react-toastify';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { socketInstance } from '../../features/utils/socketInstance';
import { useUserContext } from '../../contexts/UserContext';
import { useStreamContext } from '../../contexts/StreamContext';
import { STREAM_REDUCER_ACTIONS } from '../../reducers/StreamReducer';


const NavigationTitleItem = ({ title, style }) => {
    const navigate = useNavigate();
    const { currentChannel, allUsers } = useAppContext();
    const { currentUser } = useUserContext();
    const { dispatchToStreamState } = useStreamContext();

    const handleStartNewCall = (type) => {
        if ((!currentChannel ) || (!["group", "user"].includes(currentChannel.type))) return

        const idsToCallForGroupCall = allUsers.filter(user => user.channels.includes(currentChannel.id)).filter(user => user.id !== currentUser.id).map(user => user.id)

        switch (type) {
            case "audio":
                if (currentChannel.type === "group") {
                    socketInstance.emit("create-room", currentChannel.id, idsToCallForGroupCall, (response) => {
                        if (response.error) return toast.info(response.error);
                        if (!response.roomId) return
                        response.peers.forEach(peer => {
                            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.ADD_NEW_PEER, payload: { value: peer }})
                        })
                        navigate(`/group-call?id=${response.roomId}&type=audio&channelId=${currentChannel.id}`, { state: { newCall: true } })
                    })
                    return
                }
                return navigate("/peer-call?type=audio", { state: { newCall: true, userIdToCall: currentChannel.id } })
            case "video":
                if (currentChannel.type === "group") {
                    socketInstance.emit("create-room", currentChannel.id, idsToCallForGroupCall, (response) => {
                        if (response.error) return toast.info(response.error);
                        if (!response.roomId) return
                        response.peers.forEach(peer => {
                            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.ADD_NEW_PEER, payload: { value: peer }})
                        })
                        navigate(`/group-call?id=${response.roomId}&type=video&channelId=${currentChannel.id}`, { state: { newCall: true } })
                    })
                    return
                }
                return navigate("/peer-call?type=video", { state: { newCall: true, userIdToCall: currentChannel.id } })
            default:
                console.log("Invalid type passed")
                break;
        }
    }
    
    return <>
        <div className={`current__Page__Title__Item`} style={style}>
            <p>{title}</p>
            <div className='new__Call__Container'>
                <PhoneIcon onClick={() => handleStartNewCall("audio")} />
                <VideocamIcon onClick={() => handleStartNewCall("video")} />
            </div>
        </div>
    </>
}

export default NavigationTitleItem;
