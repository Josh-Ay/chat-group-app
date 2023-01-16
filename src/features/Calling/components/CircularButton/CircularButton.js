import "./style.css";

export default function CircularButton ({ icon, style, handleClick }) {
    return <button style={style} className="circular__Call__Btn" onClick={handleClick}>
        { icon }
    </button>
}
