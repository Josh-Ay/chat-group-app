import { Link } from "react-router-dom";
import { page404 } from "../../assets/images/imagesIndex";
import "./style.css";


const PageNotFound = () => {
    return <div className="page__Not__Found__Container">        
        <img src={page404} alt="page not found illustration" />
        <p>Ooops! Looks like the page you are looking for does not exist</p>
        <Link to={"/"}>
            <button>Go Home</button>
        </Link>
    </div>
}

export default PageNotFound;
