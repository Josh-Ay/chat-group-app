import { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export const currentUserId = crypto.randomUUID();

export const UserContextProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState({
        displayPicture: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60",
        displayName: "You",
        id: currentUserId,
    })

    return <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        { children }
    </UserContext.Provider>
}
