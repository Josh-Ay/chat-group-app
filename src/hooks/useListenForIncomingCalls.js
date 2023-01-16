import { useEffect } from "react"
import { initialStreamStateNames, useStreamContext } from "../contexts/StreamContext";
import { socketInstance } from "../features/utils/socketInstance"
import { STREAM_REDUCER_ACTIONS } from "../reducers/StreamReducer";

export default function useListenForIncomingCalls () {
    const { dispatchToStreamState } = useStreamContext();

    useEffect(() => {
        
        socketInstance.on("receiving-call", (signal, caller, callerName, callType) => {
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_RECEIVING_CALL, stateToUpdate: initialStreamStateNames.receivingCall, payload: { value: true }})
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_IS_RECEIVING_PEER_CALL, stateToUpdate: initialStreamStateNames.isReceivingPeerCall, payload: { value: true }})
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_CALLER_SIGNAL, stateToUpdate: initialStreamStateNames.callerSignal, payload: { value: signal }})
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_CALLER, stateToUpdate: initialStreamStateNames.caller, payload: { value: caller }})
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_CALLER_NAME, stateToUpdate: initialStreamStateNames.callerName, payload: { value: callerName }})
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_CALL_TYPE, stateToUpdate: initialStreamStateNames.callType, payload: { value: callType }})
        })

        socketInstance.on("call-cancelled", () => {
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.UPDATE_CALL_REJECTED, stateToUpdate: initialStreamStateNames.callRejected, payload: { value: true }})
        })
        
    }, [])
}