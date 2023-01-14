import AddIcon from '@mui/icons-material/Add';
import "./style.css";


const SideNavigationTitleItem = ({ className, title, handleAddBtnClick }) => {

    return <>
        <div className={`current__Navigation__Title__Item ${className ? className : ''}`}>
            <p>{title}</p>
            <div className='add__Icon__Container' onClick={handleAddBtnClick && typeof handleAddBtnClick === "function" ? () => handleAddBtnClick() : () => {}}>
                <AddIcon />
            </div>
        </div>
    </>
}

export default SideNavigationTitleItem;
