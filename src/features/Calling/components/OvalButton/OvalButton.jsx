import "./style.css";

export default function OvalButton ({ icon, handleClick, style }) {
    return <button style={style} className="oval__Call__Btn" onClick={handleClick}>
        { icon }
    </button>
}