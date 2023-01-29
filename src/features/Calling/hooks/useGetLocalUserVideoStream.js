import { useEffect } from "react";
import { initialStreamStateNames, useStreamContext } from "../../../contexts/StreamContext";
import { STREAM_REDUCER_ACTIONS } from "../../../reducers/StreamReducer";
import { getLocalUserStream } from "../utils/utils";

export default function useGetLocalUserVideoStream() {
    const { dispatchToStreamState } = useStreamContext();

    useEffect(() => {

        getLocalUserStream().then(stream => {
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_LOCAL_STREAM, stateToUpdate: initialStreamStateNames.localStream, payload: { value: stream }})
        }).catch(err => {
            console.log(err)
        })
    
    }, [])
}