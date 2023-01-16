import { createContext, useContext, useReducer } from "react";
import { streamReducer } from "../reducers/StreamReducer";

const StreamContext = createContext({});

export const useStreamContext = () => useContext(StreamContext);

export const initialStreamStateNames = {
    "localStream": "localStream",
    "remoteStream": "remoteStream",
    "socketId": "socketId",
    "receivingCall": "receivingCall",
    "caller": "caller",
    "callerSignal": "callerSignal",
    "callAccepted": "callAccepted",
    "socketIdToCall": "socketIdToCall",
    "callEnded": "callEnded",
    "callerName": "callerName",
    "isCalling": "isCalling",
    "callType": "callType",
    "remoteAudioStatus": "remoteAudioStatus",
    "remoteVideoStatus": "remoteVideoStatus",
    "isReceivingPeerCall": "isReceivingPeerCall",
    "callRejected": "callRejected",
    "peers": "peers",
}

export const initialState = {
    localStream: null,
    remoteStream: null,
    socketId: "",
    receivingCall: false,
    caller: "",
    callerSignal: null,
    callAccepted: false,
    socketIdToCall: "",
    callEnded: false,
    callerName: "", 
    isCalling: false,
    callType: null,
    remoteAudioStatus: true,
    remoteVideoStatus: true,
    isReceivingPeerCall: false,
    callRejected: false,
    peers: [],
}

export const StreamContextProvider = ({ children }) => {
    const [ streamState, dispatchToStreamState ] = useReducer(streamReducer, initialState);

    return <StreamContext.Provider value={{ streamState, dispatchToStreamState }}>
        { children }
    </StreamContext.Provider>
}