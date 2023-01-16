import { useEffect } from "react"
import { initialStreamStateNames, useStreamContext } from "../contexts/StreamContext";
import { socketInstance } from "../features/utils/socketInstance"
import { STREAM_REDUCER_ACTIONS } from "../reducers/StreamReducer";

export default function useListenForPeerMediaChange () {
    const { dispatchToStreamState } = useStreamContext();

    useEffect(() => {

        socketInstance.on("update-video-status", (value) => {
            // console.log("updating video...", value)
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_REMOTE_USER_VIDEO_STATUS, stateToUpdate: initialStreamStateNames.remoteVideoStatus, payload: { value: value }})
        });

        socketInstance.on("update-audio-status", (value) => {
            // console.log("updating audio...", value)
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_REMOTE_USER_AUDIO_STATUS, stateToUpdate: initialStreamStateNames.remoteAudioStatus, payload: { value: value }})
        });

    }, [])

}