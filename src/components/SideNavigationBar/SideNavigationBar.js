import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import ChatTileItem from '../ChatTileItem/ChatTileItem';
import SearchBar from '../SearchBar/SearchBar';
import SideNavigationTitleItem from '../SideNavigationTitleItem/SideNavigationTitleItem';
import SingleChannelInfo from '../SingleChannelInfo/SingleChannelInfo';
import UserProfileItem from '../UserProfileItem/UserProfileItem';

import "./style.css";


const SideNavigationBar = ({ width, handleAddNewChannel, handleAddNewMessage, closeSideBarOnItemClick }) => {
    const { channels, currentChannel, setCurrentChannel, directMessageChannels } = useAppContext();
    const [ searchValue, setSearchValue ] = useState("");
    const [ showCurrentChannelInfo, setShowCurrentChannelInfo ] = useState(false);

    const handleInfoMenuClick = (passedId) => {
        const foundChannel = channels.find(channel => channel.id === passedId);

        if (!foundChannel) return

        setCurrentChannel(foundChannel);
        setShowCurrentChannelInfo(true);
    }

    const handleTileItemClick = (passedChannel) => {
        if (!setCurrentChannel || typeof setCurrentChannel !== "function") return 
        setCurrentChannel(passedChannel)

        if (closeSideBarOnItemClick && typeof closeSideBarOnItemClick === "function") closeSideBarOnItemClick() 
    }

    return <>
        <div style={{ width: width }} className="side__Navigation__Bar__Container">
            {
                showCurrentChannelInfo ? <>
                    <SingleChannelInfo 
                        handleBackBtnClick={() => setShowCurrentChannelInfo(false)}
                    />
                </> : 
                
                <>
                    <SideNavigationTitleItem title={"Channels"} handleAddBtnClick={handleAddNewChannel} />
                
                    <SearchBar searchValue={searchValue} updateSearchValue={setSearchValue} />

                    <div className='side__Navigation__Tiles__Container'>
                        {
                            searchValue.length < 1 ?
                            
                            React.Children.toArray(channels.map(channel => {
                                return <ChatTileItem 
                                    id={channel.id}
                                    activeTile={currentChannel && currentChannel.id === channel.id ? true : false} 
                                    title={channel.title}
                                    handleChatTileClick={() => handleTileItemClick(channel)}  
                                    showInfoMenuOnRightMouseClick={true}
                                    handleInfoMenuClick={handleInfoMenuClick}
                                />
                            })) : 

                            channels.filter(channel => channel.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || searchValue.toLocaleLowerCase().includes(channel.title.toLocaleLowerCase())).length < 1 ? <p className='chat__Tile__Container'>No channels found</p> :

                            React.Children.toArray(channels.filter(channel => channel.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || searchValue.toLocaleLowerCase().includes(channel.title.toLocaleLowerCase())).map(channel => {
                                return <ChatTileItem activeTile={currentChannel && currentChannel.id === channel.id ? true : false} title={channel.title} handleChatTileClick={setCurrentChannel && typeof setCurrentChannel === "function" ? () => setCurrentChannel(channel) : () => {}} />
                            }))
                        }
                    </div>

                    <SideNavigationTitleItem className="direct__Messages__Title__Item" title={"Direct Messages"} handleAddBtnClick={handleAddNewMessage} />
                    
                    <div className='side__Navigation__Tiles__Container'>
                        {
                            searchValue.length < 1 ?

                            React.Children.toArray(directMessageChannels.map(channel => {
                                return <ChatTileItem 
                                    activeTile={currentChannel && currentChannel.id === channel.id ? true : false} 
                                    title={channel.title} tileImage={channel.image} 
                                    handleChatTileClick={() => handleTileItemClick(channel)} 
                                />
                            })) :
                            
                            directMessageChannels.filter(channel => channel.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || searchValue.toLocaleLowerCase().includes(channel.title.toLocaleLowerCase())).length < 1 ? <p className='chat__Tile__Container'>No messages found</p> :

                            React.Children.toArray(directMessageChannels.filter(channel => channel.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || searchValue.toLocaleLowerCase().includes(channel.title.toLocaleLowerCase())).map(channel => {
                                return <ChatTileItem 
                                    activeTile={currentChannel && currentChannel.id === channel.id ? true : false} 
                                    title={channel.title} 
                                    tileImage={channel.image} 
                                    handleChatTileClick={() => handleTileItemClick(channel)} 
                                />
                            }))
                        }
                    </div>
                </>
            }
            <UserProfileItem width={width} />
        </div>
    </>
}

export default SideNavigationBar;
