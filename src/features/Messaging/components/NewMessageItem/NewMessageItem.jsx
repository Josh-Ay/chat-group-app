import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

import "./style.css"; 
import React, { useEffect, useRef, useState } from 'react';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import { emojisList } from '../../../../utils/emojisList';
import { chunkArray } from '../../../../utils/helpers';
import useClickOutside from '../../../../hooks/useClickOutside';
import { toast } from 'react-toastify';
import { useAppContext } from '../../../../contexts/AppContext';
import { useUserContext } from '../../../../contexts/UserContext';
import { socketInstance } from '../../../utils/socketInstance';
import EmojisContainerItem from '../EmojisContainerItem/EmojisContainerItem';

const NewMessageItem = () => {
    const [ newMessage, setNewMessage ] = useState({
        text: "",
        audio: null,
        image: null,
        document: null,
    })
    const [ showEmojis, setShowEmojis ] = useState(false);
    const [ searchEmojiValue, setSearchEmojiValue ] = useState("");
    const [ allEmojis, setAllEmojis ] = useState(chunkArray(emojisList, 10));
    const emojisListRef = useRef(null);
    const { currentUser } = useUserContext();
    const { currentChannel, updateMessages, directMessageChannels, updateDirectMessages } = useAppContext();

    useClickOutside(emojisListRef, () => setShowEmojis(false));

    useEffect(() => {

        if (searchEmojiValue.length < 1) return setAllEmojis(chunkArray(emojisList, 10));
        
        const matchedEmojis = emojisList.filter(emojiItem => emojiItem.description.toLocaleLowerCase().includes(searchEmojiValue.toLocaleLowerCase()) || searchEmojiValue.toLocaleLowerCase().includes(emojiItem.description.toLocaleLowerCase()));
        setAllEmojis(chunkArray(matchedEmojis, 10));

    }, [searchEmojiValue])

    socketInstance.on("receive-message", (message) => {
        console.log("New message: ", message)
    })

    const updateNewMessageText = (key, value) => setNewMessage((prevValue) => { return { ...prevValue, [key]: value}});

    const handleAddEmojiIconClick = () => setShowEmojis(!showEmojis);

    const handleKeyPress = (e) => {
        if (!handleSendNewMessage || typeof handleSendNewMessage !== "function") return
        
        if (e.key === "Enter" || e.keyCode === 13) handleSendNewMessage();
    }

    const handleSendNewMessage = () => {
        if (newMessage.text.length < 1) return

        const newMessageObj = {
            text: newMessage.text,
            senderDisplayName: currentUser.displayName,
            senderDisplayPicture: currentUser.displayPicture,
            created: new Date(),
            channel: currentChannel.id,
            author: true,
        }
        
        socketInstance.emit("send-message", newMessageObj, currentChannel?.socketId);

        const receiverInSenderDM = directMessageChannels.find(message => message.id === currentChannel.id);
        if (!receiverInSenderDM && currentChannel.type === "user") {
            updateDirectMessages({
                title: currentChannel.title ? currentChannel.title : currentChannel.displayName ? currentChannel.displayName : "N/A",
                id: currentChannel.id,
                image: currentChannel.displayPicture,
                type: "user"
            })
        }

        updateMessages(newMessageObj);
        setNewMessage({
            text: "",
            audio: null,
            image: null,
            document: null,
        });
    }

    return <>
        <div className="new__Message__Item__Container">
            <div className='add__Extra__Options__Container'>
                <SentimentSatisfiedAltIcon className='icon' onClick={handleAddEmojiIconClick} />
                <AddPhotoAlternateIcon className='icon'>
                    <input type={"file"} />
                </AddPhotoAlternateIcon>
                <NoteAddIcon className='icon'>
                    <input type={"file"} />
                </NoteAddIcon>

                { 
                    showEmojis && <EmojisContainerItem 
                        emojisListRef={emojisListRef}
                        emojisList={allEmojis}
                        emojiSearchValue={searchEmojiValue}
                        updateEmojiSearchValue={setSearchEmojiValue}
                        handleAddEmoji={(emoji) => updateNewMessageText("text", newMessage + emoji)}
                    />
                }
            </div>
            <input type={"text"} placeholder={"Type a message here"} autoFocus value={newMessage ? newMessage.text : ""} onChange={(e) => updateNewMessageText("text", e.target.value)} onKeyDown={handleKeyPress} />
            <div className="send__New__Message__Btn" onClick={newMessage.length > 1 ? () => handleSendNewMessage() : () => toast.info("Still in development")}>
                {
                    newMessage.text.length < 1 ? <GraphicEqIcon /> : <SendIcon />
                }
            </div>
        </div>
    </>
}

export default NewMessageItem;
