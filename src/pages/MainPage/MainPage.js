import React, { useEffect, useRef, useState } from "react";
import NewMessageItem from "../../features/Messaging/components/NewMessageItem/NewMessageItem";
import { useAppContext } from "../../contexts/AppContext";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { formatDateAndTime } from "../../utils/helpers";
import useScrollToBottom from "../../hooks/useScrollToBottom";
import "./style.css";
import { useStreamContext } from "../../contexts/StreamContext";
import { STREAM_REDUCER_ACTIONS } from "../../reducers/StreamReducer";


const MainPage = () => {
    const { allMessages, currentChannel } = useAppContext();
    const [ currentChannelMessages, setCurrentChannelMessages ] = useState([]);
    const allMessagesRef = useRef(null);
    const { dispatchToStreamState } = useStreamContext();

    useScrollToBottom(allMessagesRef);

    useEffect(() => {
        dispatchToStreamState({ type: STREAM_REDUCER_ACTIONS.RESET_STATE })
    }, [])

    useEffect(() => {

        if (!currentChannel) return

        setCurrentChannelMessages(allMessages.filter(message => message.channel === currentChannel.id));

    }, [currentChannel, allMessages])

    return <MainLayout>
        <div className="all__Messages__Container" ref={allMessagesRef}>
            {
                React.Children.toArray(currentChannelMessages.map(message => {
                    return <div className="message__Item__Container">
                        <div className="message__Image__Item">
                            <img src={message.senderDisplayPicture} alt="sender pic" />
                        </div>
                        <div className="message__Contents__Item">
                            <div className="top__Content">
                                <p>{message.senderDisplayName}</p>
                                <span>{formatDateAndTime(message.created)}</span>
                            </div>
                            <div className="message__Content">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    </div>
                }))
            }
        </div>
        { currentChannel ? <NewMessageItem /> : <></> }
    </MainLayout>
}

export default MainPage;
