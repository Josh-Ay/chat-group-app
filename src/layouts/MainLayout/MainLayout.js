import { useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import NavigationTitleItem from "../../components/NavigationTitleItem/NavigationTitleItem";
import AddNewChannelItem from "../../components/AddNewChannelItem/AddNewChannelItem";
import SideNavigationBar from "../../components/SideNavigationBar/SideNavigationBar";
import { useAppContext } from "../../contexts/AppContext";
import useClickOutside from "../../hooks/useClickOutside";
import useClickInside from "../../hooks/useClickInside";
import MenuIcon from '@mui/icons-material/Menu';
import "./style.css";
import AddNewMessageItem from "../../components/AddNewMessageItem/AddNewMessageItem";
import { Close } from "@mui/icons-material";
import { peopleSvg } from "../../assets/images/imagesIndex";
import { useStreamContext } from "../../contexts/StreamContext";
import IncomingCallItem from "../../features/Calling/components/IncomingCall/IncomingCallItem";


const MainLayout = ({ children }) => {
    const isLargeScreen = useMediaQuery("(min-width: 992px)");
    const isMediumScreen = useMediaQuery("(min-width: 768px) and (max-width: 991px)")
    const isSmallScreen = useMediaQuery("(max-width: 767px)");

    const sideNavBarWidth = isLargeScreen ? "22.778%" : isMediumScreen ? "35%" : "80%";
    const contentWidth = isLargeScreen ? "77.222%" : isMediumScreen ? "65%" : "100%";
    
    const { currentChannel, setCurrentChannel, updateChannels } = useAppContext();
    const newChannelRef = useRef(null);
    const newMessageRef = useRef(null);

    const [ showNewItem, setShowNewItem ] = useState({
        showNewChannel: false,
        showNewMessage: false,
    });

    const [ newChannelDetails, setNewChannelDetails ] = useState({
        title: "",
        description: "",
        id: "",
        type: "group",
    });

    const contentContainerRef = useRef(null);
    const [ disableSaveBtn, setDisableSaveBtn ] = useState(true);
    const [ isSideBarOpen, setIsSideBarOpen ] = useState(true);
    const { streamState } = useStreamContext();

    useEffect(() => {

        if (newChannelDetails.title.length < 1 || newChannelDetails.description.length < 1) return setDisableSaveBtn(true);

        setDisableSaveBtn(false);

    }, [newChannelDetails])
    
    useClickOutside(newChannelRef, () => setShowNewItem({ showNewChannel: false, showNewMessage: false }));
    useClickOutside(newMessageRef, () => setShowNewItem({ showNewChannel: false, showNewMessage: false }));
    useClickInside(contentContainerRef, isSmallScreen ? () => setIsSideBarOpen(false) : () => {})

    const handleUpdateNewChannelDetails = (itemToUpdate, value) => {
        if (!itemToUpdate || !value) return

        setNewChannelDetails((prevValue) => { return { ...prevValue, [itemToUpdate]: value } })
    }

    const handleAddNewChannelIconClick = () => setShowNewItem({ showNewChannel: true, showNewMessage: false })

    const handleAddNewMessageIconClick = () => setShowNewItem({ showNewChannel: false, showNewMessage: true })

    const handleAddNewChannel = () => {
        const newChannelDetailsCopy = { ...newChannelDetails };
        newChannelDetailsCopy.id = crypto.randomUUID();

        updateChannels(newChannelDetailsCopy);
        setCurrentChannel(newChannelDetailsCopy);
        setNewChannelDetails({
            title: "",
            description: "",
            id: "",
            type: "group",
        });
        setShowNewItem({ showNewChannel: false, showNewMessage: false });
    }

    const handleStartNewDirectMessage = (passedChannel) => {
        setCurrentChannel(passedChannel);
        setShowNewItem({ showNewChannel: false, showNewMessage: false });
    }

    const handleNavMenuClick = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    return <>
        <div className="main__Chat__App__Layout__Container">

            {
                isSideBarOpen && <SideNavigationBar 
                    width={sideNavBarWidth} 
                    handleAddNewChannel={handleAddNewChannelIconClick}
                    handleAddNewMessage={handleAddNewMessageIconClick}
                    closeSideBarOnItemClick={isSmallScreen ? () => setIsSideBarOpen(false) : () => {}}
                /> 
            }
            
            <main>            
                <div className="main__Content__Container" style={{ width: contentWidth, marginLeft: isSideBarOpen ? sideNavBarWidth : 0 }} ref={contentContainerRef}>
                    { 
                        isSmallScreen ? <div className={`hamburger__Icon__Small ${isSideBarOpen ? 'open' : ''}`} onClick={handleNavMenuClick}>
                            <>
                                {
                                    isSideBarOpen ? <Close /> : <MenuIcon />
                                }
                            </>
                        </div> : <></> 
                    }
                    { 
                        currentChannel ? <NavigationTitleItem title={currentChannel?.title || currentChannel?.displayName} style={isSmallScreen && isSideBarOpen ? { paddingLeft: "20%" } : {}} /> : 
                        <>
                            <div className="no__Chats__Open__Container">
                                <img src={peopleSvg} alt="" />
                                <p>No one to chat with yet😶</p>
                            </div>
                        </>
                    }
                    { children }
                </div>
            </main>

            { 
                showNewItem.showNewChannel && 
                <AddNewChannelItem 
                    channelRef={newChannelRef}
                    newChannelName={newChannelDetails.title} 
                    setNewChannelName={(valuePassed) => handleUpdateNewChannelDetails("title", valuePassed)}
                    newChannelDescription={newChannelDetails.description}
                    setNewChannelDescription={(valuePassed) => handleUpdateNewChannelDetails("description", valuePassed)}
                    handleSaveBtnClick={handleAddNewChannel}
                    disableSaveBtn={disableSaveBtn}
                /> 
            }

            { 
                showNewItem.showNewMessage && 
                <AddNewMessageItem 
                    messageRef={newMessageRef}
                    handleStartNewDirectMessage={handleStartNewDirectMessage}
                />
            }
            
            { 
                streamState.receivingCall && streamState.isReceivingPeerCall && !streamState.callAccepted &&
                <IncomingCallItem
                    personCalling={streamState.callerName}
                    isGroupCall={false}
                />
            }
        </div>
    </>
}

export default MainLayout;
