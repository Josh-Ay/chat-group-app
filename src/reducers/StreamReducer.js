import { initialState, initialStreamStateNames } from "../contexts/StreamContext";

export const STREAM_REDUCER_ACTIONS = {
    "UPDATE_LOCAL_STREAM": "UPDATE_LOCAL_STREAM",
    "UPDATE_REMOTE_STREAM": "UPDATE_REMOTE_STREAM",
    "UPDATE_SOCKET_ID": "UPDATE_SOCKET_ID",
    "UPDATE_RECEIVING_CALL": "UPDATE_RECEIVING_CALL",
    "UPDATE_CALLER": "UPDATE_CALLER",
    "UPDATE_CALLER_SIGNAL": "UPDATE_CALLER_SIGNAL",
    "UPDATE_CALL_ACCEPTED": "UPDATE_CALL_ACCEPTED",
    "UPDATE_SOCKET_ID_TO_CALL": "UPDATE_SOCKET_ID_TO_CALL",
    "UPDATE_CALL_ENDED": "UPDATE_CALL_ENDED",
    "UPDATE_CALLER_NAME": "UPDATE_CALLER_NAME",
    "UPDATE_IS_CALLING": "UPDATE_IS_CALLING",
    "UPDATE_CALL_TYPE": "UPDATE_CALL_TYPE",
    "UPDATE_REMOTE_USER_AUDIO_STATUS": "UPDATE_REMOTE_USER_AUDIO_STATUS",
    "UPDATE_REMOTE_USER_VIDEO_STATUS": "UPDATE_REMOTE_USER_VIDEO_STATUS",
    "UPDATE_IS_RECEIVING_PEER_CALL": "UPDATE_IS_RECEIVING_PEER_CALL",
    "UPDATE_CALL_REJECTED": "UPDATE_CALL_REJECTED",
    "START_PEER_CALL": "START_PEER_CALL",
    "REJECT_PEER_CALL": "REJECT_PEER_CALL",
    "ADD_NEW_PEER": "ADD_NEW_PEER",
    "REMOVE_PEER": "REMOVE_PEER",
    "RESET_STATE": "RESET_STATE",
}

export const streamReducer = (currentState, action) => {
    switch (action.type) {
        case STREAM_REDUCER_ACTIONS.UPDATE_LOCAL_STREAM:
        case STREAM_REDUCER_ACTIONS.UPDATE_REMOTE_STREAM:
        case STREAM_REDUCER_ACTIONS.UPDATE_SOCKET_ID:
        case STREAM_REDUCER_ACTIONS.UPDATE_RECEIVING_CALL:
        case STREAM_REDUCER_ACTIONS.UPDATE_CALLER:
        case STREAM_REDUCER_ACTIONS.UPDATE_CALLER_SIGNAL:
        case STREAM_REDUCER_ACTIONS.UPDATE_CALL_ACCEPTED:
        case STREAM_REDUCER_ACTIONS.UPDATE_SOCKET_ID_TO_CALL:
        case STREAM_REDUCER_ACTIONS.UPDATE_CALL_ENDED:
        case STREAM_REDUCER_ACTIONS.UPDATE_CALLER_NAME:
        case STREAM_REDUCER_ACTIONS.UPDATE_IS_CALLING:
        case STREAM_REDUCER_ACTIONS.UPDATE_CALL_TYPE:
        case STREAM_REDUCER_ACTIONS.UPDATE_REMOTE_USER_AUDIO_STATUS:
        case STREAM_REDUCER_ACTIONS.UPDATE_REMOTE_USER_VIDEO_STATUS:
        case STREAM_REDUCER_ACTIONS.UPDATE_IS_RECEIVING_PEER_CALL:
        case STREAM_REDUCER_ACTIONS.UPDATE_CALL_REJECTED:
            if (!action.payload.value || !action.stateToUpdate) return currentState
            return { ...currentState, [initialStreamStateNames[`${action.stateToUpdate}`]]: action.payload.value }
        case STREAM_REDUCER_ACTIONS.START_PEER_CALL:
            return { ...currentState, [initialStreamStateNames.isCalling]: true, [initialStreamStateNames.callRejected]: false }
        case STREAM_REDUCER_ACTIONS.REJECT_PEER_CALL:
            return {
                ...currentState,
                [initialStreamStateNames.receivingCall] : initialState.receivingCall,
                [initialStreamStateNames.isReceivingPeerCall] : initialState.isReceivingPeerCall,
                [initialStreamStateNames.callerSignal] : initialState.callerSignal,
                [initialStreamStateNames.caller] : initialState.caller,
                [initialStreamStateNames.callerName] : initialState.callerName,
                [initialStreamStateNames.callType] : initialState.callType,
            }
        case STREAM_REDUCER_ACTIONS.ADD_NEW_PEER:
            if (!action.payload.value) return currentState
            return { ...currentState, [initialStreamStateNames.peers]: [ ...currentState[initialStreamStateNames.peers], action.payload.value ]}
        case STREAM_REDUCER_ACTIONS.REMOVE_PEER:
            if (!action.payload.value) return currentState
            return { ...currentState, [initialStreamStateNames.peers]: [...currentState[initialStreamStateNames].filter(peer => peer.peerId !== action.payload.idToRemove)]}    
        case STREAM_REDUCER_ACTIONS.RESET_STATE:
            const initialStateCopy = { ...initialState };
            delete initialStateCopy.socketId;
            return {
                ...initialStateCopy,
                [initialStreamStateNames.socketId]: currentState.socketId
            }
        default:
            return currentState;
    }
}