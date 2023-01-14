import { useState, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import "./style.css";

const ChatTileItem = ({ id, title, tileImage, activeTile, handleChatTileClick, handleInfoMenuClick, showInfoMenuOnRightMouseClick }) => {
    const [ showInfoMenu, setShowInfoMenu ] = useState(false);
    const infoMenuRef = useRef(null);

    const titlePassedCharList = title ? title.split(" ") : null;
    let tileText;

    if (titlePassedCharList && titlePassedCharList.length > 1) tileText = titlePassedCharList[0][0].toLocaleUpperCase() + titlePassedCharList[1][0].toLocaleUpperCase();
    if (titlePassedCharList && titlePassedCharList.length === 1) tileText = titlePassedCharList[0][0].toLocaleUpperCase();

    useClickOutside(infoMenuRef, () => setShowInfoMenu(false));

    const handleRightMouseClick = (e) => {
        e.preventDefault();
        setShowInfoMenu(true);
    }

    const handleInfoClick = () => {
        setShowInfoMenu(false);

        if (handleInfoMenuClick && typeof handleInfoMenuClick === "function") handleInfoMenuClick(id)   
    }

    return <>
        <div className="chat__Tile__Wrapper">
            <div className={`chat__Tile__Container ${activeTile ? 'active': ''}`} onClick={title && handleChatTileClick && typeof handleChatTileClick === "function" ? () => handleChatTileClick(title) : () => {}} onContextMenu={showInfoMenuOnRightMouseClick ? (e) => handleRightMouseClick(e) : () => {} }>
                {
                    tileImage ? <img className="chat__Tile__Image__Item" src={tileImage} alt={title} /> :
                    <div className="chat__Tile__Image__Item"><p>{tileText ? tileText : "NA"}</p></div>
                }
                <p>{title ? title.length > 15 ? title.slice(0, 15) + "..." : title : "Not available"}</p>
            </div>
            {
                showInfoMenu && <div className="info__Container" ref={infoMenuRef} onClick={handleInfoClick}>
                    About
                </div>
            }
        </div>
    </>
}

export default ChatTileItem;
