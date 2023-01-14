import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import ChatTileItem from '../ChatTileItem/ChatTileItem';
import "./style.css";


const SingleChannelInfo = ({ handleBackBtnClick }) => {
    const { currentChannel, setCurrentChannel, allUsers } = useAppContext();

    const handleMemberItemClick = (member) => {
        if (!handleBackBtnClick || typeof handleBackBtnClick !== "function") return
        
        setCurrentChannel(member);
        handleBackBtnClick();
    }

    return <>
        <div className='current__Channel__Info'>
            <div className='go__Back__Container' onClick={handleBackBtnClick && typeof handleBackBtnClick === "function" ? () => handleBackBtnClick() : () => {}}>
                <ArrowBackIosIcon />
                <p>All channels</p>
            </div>
            <h3 className='channel__Title'>{currentChannel?.title}</h3>
            <span className='channel__About'>{currentChannel?.description}</span>

            <h3 className='channel__Members__Title'>Members</h3>
            <div className='channel__Members__Container'>
                {
                    currentChannel ?
                    
                    React.Children.toArray(allUsers.filter(user => user.channels.find(userChannel => userChannel === currentChannel.id)).map(user => {
                        return <ChatTileItem 
                            title={user.displayName} 
                            tileImage={user.displayPicture} 
                            handleChatTileClick={setCurrentChannel && typeof setCurrentChannel === "function" ? () => handleMemberItemClick(user) : () => {}}  
                        />
                    })) :

                    <></>
                }
            </div>
        </div>
    </>
}

export default SingleChannelInfo;
