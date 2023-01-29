import { useEffect } from "react";
import { initialStreamStateNames, useStreamContext } from "../contexts/StreamContext";
import { socketInstance } from "../features/utils/socketInstance";
import { STREAM_REDUCER_ACTIONS } from "../reducers/StreamReducer";

export default function useConnectToSocketIoServer () {
    const { dispatchToStreamState } = useStreamContext();

    useEffect(() => {

        socketInstance.on("connect", () => {
            dispatchToStreamState({ type:  STREAM_REDUCER_ACTIONS.UPDATE_SOCKET_ID, stateToUpdate: initialStreamStateNames.socketId, payload: { value: socketInstance.id }});
        })

        socketInstance.on("disconnect", () => {
            console.log("disconnected from server")
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_CALL_ENDED, stateToUpdate: initialStreamStateNames.callEnded, payload: { value: true }})
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_GROUP_CALL_ENDED, stateToUpdate: initialStreamStateNames.groupCallEnded, payload: { value: true }})
        })
        
    }, [])
}
