import React from "react";
import { useAppContext } from "../../contexts/AppContext";
import ChatTileItem from "../ChatTileItem/ChatTileItem";
import "./style.css";


const AddNewMessageItem = ({ messageRef, handleStartNewDirectMessage }) => {
    const { allUsers } = useAppContext();

    return <>
        <div className="new__Channel__Popup__Overlay">
            <div className="new__Channel__Card__Item" ref={messageRef}>
                <p className="title">New Message</p>
                <span>Start a new conversation</span>
                <div className="all__Users__Container">
                    {
                        React.Children.toArray(allUsers.map(user => {
                            return <ChatTileItem title={user.displayName} tileImage={user.displayPicture} handleChatTileClick={handleStartNewDirectMessage && typeof handleStartNewDirectMessage === "function" ? () => handleStartNewDirectMessage(user) : () => {}} />
                        }))
                    }
                </div>
            </div>
        </div>
    </>
}

export default AddNewMessageItem;