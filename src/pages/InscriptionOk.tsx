import {Link} from "react-router-dom"
import "./InscriptionOk.css"
const InscriptionOk =()=>{
    return(
        <div>
        <div className="textAccueil">
        <h1 className = "textInscription"> Boom...</h1>
        <h1 className="textInscription">Tu es enfin inscrit sur la meilleure app de suivi calorique</h1>
        </div>
        <p className ="textInscriptionBis">Connecte toi dès maintenant pour pouvoir profiter de notre offre ! </p>
        <Link to ="/connexion" className="link">
        <p className ="lien">Se connecter</p>
        </Link>
        
        </div>
    )
}
export default InscriptionOk