import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import "./style.css";
import { toast } from 'react-toastify';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';


const NavigationTitleItem = ({ title, style }) => {
    const { currentChannel } = useAppContext();
    const navigate = useNavigate();

    const handleStartNewCall = (type) => {
        if ((!currentChannel ) || (!["group", "user"].includes(currentChannel.type))) return
        if (currentChannel.type === "group") return toast.info("Group call coming soon.");

        switch (type) {
            case "audio":
                if (currentChannel.type === "group") return navigate("/group-call?type=audio", { state: { newCall: true, userIdsToCall: [] } })
                return navigate("/peer-call?type=audio", { state: { newCall: true, userIdToCall: currentChannel.id } })
            case "video":
                if (currentChannel.type === "group") return navigate("/group-call?type=video", { state: { newCall: true, userIdsToCall: [] } })
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
