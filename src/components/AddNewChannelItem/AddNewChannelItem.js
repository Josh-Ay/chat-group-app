import "./style.css";


const AddNewChannelItem = ({ channelRef, newChannelName, setNewChannelName, newChannelDescription, setNewChannelDescription, handleSaveBtnClick, disableSaveBtn }) => {
    return <>
        <div className="new__Channel__Popup__Overlay">
            <div className="new__Channel__Card__Item" ref={channelRef}>
                <p className="title">New Channel</p>
                <input type={"text"} placeholder={"Channel name"} value={newChannelName ? newChannelName : ""} onChange={(setNewChannelName && typeof setNewChannelName === "function") ? (e) => setNewChannelName(e.target.value) : () => {}} />
                <textarea value={newChannelDescription ? newChannelDescription : ""} onChange={(setNewChannelDescription && typeof setNewChannelDescription === "function") ? (e) => setNewChannelDescription(e.target.value) : () => {}} placeholder="Channel description" rows={4}></textarea>
                <button className="save__New__Channel__Btn" onClick={handleSaveBtnClick && typeof handleSaveBtnClick === "function" ? () => handleSaveBtnClick() : () => {}} disabled={disableSaveBtn}>Save</button>
            </div>
        </div>
    </>
}

export default AddNewChannelItem;
