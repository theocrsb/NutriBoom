import { Link } from "react-router-dom";
import "./Page404.css";
const Page404 = () => {
    return (
        <div>
            <img src={process.env.PUBLIC_URL + `./assets/carotte triste.png`} alt="carotte triste" className = "carotteLogoTriste" />
            <h1 className ="text404"> BadaBOOM... </h1>
            <h2 className = "text404">La page que vous cherchez est introuvable </h2>
            <Link className="text404" to="/">Retour à la page d'accueil</Link>
        </div>
    )
}

export default Page404;