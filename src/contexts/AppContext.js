import { createContext, useContext, useState } from "react";
import { currentUserId } from "./UserContext";

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export const amandaId = crypto.randomUUID();

export const AppContextProvider = ({ children }) => {
    const [ frontEndChannelId, randomChannelId, backendChannelId, catsChannelId, welcomeChannelId ] = [ "fjdfkdjfkd4530", crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID() ];
    const [ xanderId, nelleId, annalieseId, cleoId ] = [ crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID() ];
    
    const [ directMessageChannels, setDirectMessageChannels ] = useState([
        { id: amandaId, title: "Amanda Neal", type: "user", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60" },
        { id: xanderId, title: "Xander Neal", type: "user", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60" },
        { id: cleoId, title: "Cleo Grace", type: "user", image: "https://images.unsplash.com/photo-1610202117377-6d16da5011f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YW1hbmRhJTIwZ29ybWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60" },
    ]);
    const [ channels, setChannels ] = useState([
        { id: frontEndChannelId, title: "Front-end developers", type: "group",  description: "front end developers channel" },
        { id: randomChannelId, title: "random", type: "group", description: "randommm stuffs" },
        { id: backendChannelId, title: "BACK-END", type: "group", description: "backend channel" },
        { id: catsChannelId, title: "CATS AND DOGS", type: "group", description: "cats channel" },
        { id: welcomeChannelId, title: "Welcome", type: "group", description: "welcome channel" },
    ]);
    const [ allMessages, setAllMessages ] = useState([
        {
            text: "Hello",
            senderDisplayName: "Nelle Francis",
            senderDisplayPicture: "https://images.unsplash.com/photo-1671533602071-7ed368cb01ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60",
            created: "Monday, December 19, 2022 12:15:19",
            channel: frontEndChannelId,
            author: false,
            userId: nelleId,
        },
        {
            text: "Hi",
            senderDisplayName: "Annaliese Huynh",
            senderDisplayPicture: "https://images.unsplash.com/photo-1671465317593-e2e860e18a3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=700&q=60",
            created: "Monday, December 19, 2022 14:15:40",
            channel: frontEndChannelId,
            author: false,
            userId: annalieseId,
        },
        {
            text: "Hello",
            senderDisplayName: "Xander Neal",
            senderDisplayPicture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
            created: "Tuesday, December 19, 2022 14:15:44",
            author: false,
            channel: xanderId,
            userId: xanderId,
        },
    ]);
    const [ allUsers, setAllUsers ] = useState([
        {
            displayName: "Amanda Neal", 
            displayPicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
            channels: [welcomeChannelId],
            id: amandaId,
        },
        {
            displayName: "Xander Neal",
            displayPicture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
            channels: [welcomeChannelId],
            id: xanderId,
        },
        {
            displayName: "Nelle Francis",
            displayPicture: "https://images.unsplash.com/photo-1671533602071-7ed368cb01ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60",
            channels: [frontEndChannelId, welcomeChannelId],
            id: nelleId,
        },
        {
            displayName: "Annaliese Huynh",
            displayPicture: "https://images.unsplash.com/photo-1671465317593-e2e860e18a3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=700&q=60",
            channels: [frontEndChannelId, welcomeChannelId],
            id: annalieseId,
        },
        {
            displayName: "Cleo Grace", 
            displayPicture: "https://images.unsplash.com/photo-1610202117377-6d16da5011f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YW1hbmRhJTIwZ29ybWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
            channels: [welcomeChannelId],
            id: cleoId,
        },
        {
            displayPicture: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60",
            displayName: "You",
            channels: [frontEndChannelId, welcomeChannelId, catsChannelId, randomChannelId, backendChannelId],
            id: currentUserId
        }
    ]);
    const [ currentChannel, setCurrentChannel ] = useState(null);

    const updateMessages = (newMessage) => {
        if (!newMessage || typeof newMessage !== "object") return;
        setAllMessages((prevValue) => { return [...prevValue, newMessage] })
    }

    const updateChannels = (newChannel) => {
        if (!newChannel || typeof newChannel !== "object") return;
        setChannels((prevValue) => { return [...prevValue, newChannel] })
    }

    const updateDirectMessages = (newDirectMessage) => {
        if (!newDirectMessage || typeof newDirectMessage !== "object") return;
        setDirectMessageChannels((prevValue) => { return [...prevValue, newDirectMessage] })
    }

    return <AppContext.Provider value={{ allUsers, directMessageChannels, allMessages, channels, currentChannel, setAllUsers, setCurrentChannel, updateMessages, updateChannels, updateDirectMessages }}>
        { children }
    </AppContext.Provider>
}