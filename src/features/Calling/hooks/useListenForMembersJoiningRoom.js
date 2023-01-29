import { useEffect } from "react";
import { useStreamContext } from "../../../contexts/StreamContext";
import { STREAM_REDUCER_ACTIONS } from "../../../reducers/StreamReducer";
import { socketInstance } from "../../utils/socketInstance";

export default function useListenForMembersJoiningRoom() {
    const { dispatchToStreamState } = useStreamContext();

    useEffect(() => {
        
        socketInstance.on("user-joined-room", ({ user }) => {
            console.log("joined room: ", user)
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.ADD_NEW_PEER, payload: { value: user }})
        })

        socketInstance.on("user-left-room", ({ userSocketId }) => {
            console.log("left room: ", userSocketId)
            dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.REMOVE_PEER, payload: { idToRemove: userSocketId }})
        })

    }, [])
}