import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useStreamContext } from "../../../contexts/StreamContext";

export default function useUpdateChangeCallTypeOnParams(updateCallType, updateIsVideoCall, handleInvalidCallType) {
    const [ params, setParams ] = useSearchParams();
    const { streamState } = useStreamContext();

    useEffect(() => {

        const callType = params.get("type");

        if (!callType || !["audio", "video"].includes(callType)) return handleInvalidCallType();

        updateCallType(callType);

        if (callType === "audio") {
            // socketInstance.emit("update-video-status", streamState.socketIdToCall, false);
            updateIsVideoCall(false);

            if (!streamState.localStream) return
            streamState.localStream.getVideoTracks().forEach(track => {
                track.enabled = false
            });

            return 
        }

        updateIsVideoCall(true);

    }, [params])
}