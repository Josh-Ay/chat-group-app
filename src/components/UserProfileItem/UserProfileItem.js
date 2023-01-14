import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from "../../contexts/UserContext";
import "./style.css";


const UserProfileItem = ({ width }) => {
    const [ showProfilePopup, setShowProfilePopup ] = useState(false);
    const { currentUser } = useUserContext();
    const profileNavigationLinks = [
        {
            address: `/profile/${currentUser.id}`,
            icon: <AccountCircleIcon />,
            text: "My Profile",
        },
        {
            address: `/settings`,
            icon: <SettingsIcon />,
            text: "Settings",
        },
        {
            address: `/logout`,
            icon: <ExitToAppIcon />,
            text: "Logout",
            className: 'red__Color'
        },
    ]

    return <>
        <div style={{ width: width }} className="current__User__Profile__Container" onMouseEnter={() => setShowProfilePopup(true)} onMouseLeave={() => setShowProfilePopup(false)}>
            <div className='profile__Items'>
                <img src={currentUser.displayPicture} alt={currentUser.displayPicture} />
                <p>{currentUser.displayName}</p>
                <div className="down__Arrow__Item">
                    <KeyboardArrowDownIcon />
                </div>
                {
                    showProfilePopup ? <> 
                        <div className="user__Profile__List__Options">
                            <ul>
                                {
                                    React.Children.toArray(profileNavigationLinks.map(profileLink => {
                                        return <li>
                                            <Link to={profileLink.address} className={profileLink.className ? profileLink.className : ''}>
                                                {profileLink.icon}
                                                <span>{profileLink.text}</span>
                                            </Link>
                                        </li>
                                    }))
                                }
                            </ul>
                        </div>
                    </> :<></>
                }
            </div>
        </div>
    </>
}

export default UserProfileItem;
