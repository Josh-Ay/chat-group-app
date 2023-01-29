import { useStreamContext } from "../../../../contexts/StreamContext";
import { useUserContext } from "../../../../contexts/UserContext";
import UserVideoItem from "../../components/UserVideoItem/UserVideoItem";
import "./style.css";
import useGetLocalUserVideoStream from "../../hooks/useGetLocalUserVideoStream";

const PeerCallLayout = ({ children, localUserAudioEnabled, localUserVideoEnabled, remoteUserAudioEnabled, remoteUserVideoEnabled}) => {
    const { currentUser } = useUserContext();
    const { streamState } = useStreamContext();

    useGetLocalUserVideoStream();
    
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