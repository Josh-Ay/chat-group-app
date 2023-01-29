import { useEffect, useRef } from "react";
import "./style.css";


const UserVideoItem = ({ videoStream, isLocalUser, isMuted, showVideo, userPicture }) => {

    const videoRef = useRef();

    useEffect(() => {
        
        if (!videoRef.current || !videoStream) return

        videoRef.current.srcObject = videoStream;
        
    }, [videoStream])

    useEffect(() => {
        
        if (!videoStream) return

        videoStream.getAudioTracks().forEach(track => {
            track.enabled = isMuted ? true : false
        });

    }, [videoStream, isMuted])

    useEffect(() => {
        
        if (!videoStream) return

        videoStream.getVideoTracks().forEach(track => {
           track.enabled = showVideo ? true : false
        });

        if (!videoRef.current || !showVideo) return

        videoRef.current.srcObject = videoStream;

    }, [videoStream, showVideo])

    return <>
        {
            showVideo && videoStream ? 
            <video muted={isLocalUser ? true : false} ref={videoRef} className={`${isLocalUser ? 'local__User' : ''}`} autoPlay playsInline controls={false} controlsList="nofullscreen"></video> :          
            <img src={userPicture} alt="user" />
        }                
    </>
}

export default UserVideoItem;
