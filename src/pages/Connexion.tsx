import "./Connexion.css"
import {Link} from "react-router-dom";
import ConnexionButton from "../components/ConnexionButton";

const Connexion = ()=>{
    return(
        <div  className="fondCarotte">
            <div className ="textConnect">
            <h1>Connecte toi!</h1>
            <p>Tu n'as pas encore de compte sur nutriBoom?</p>
          <Link to ="/suscribe">
          <p className = "lienInscription"> <strong>Inscription</strong></p>
          </Link>
          </div>
          <div>
          <form className = "formConnexion" >
  <div className="mb-3">
    <label htmlFor="inputMail" className="htmlForm-label"/>
    <input type="mail" className="htmlForm-control" id="inputMail"placeholder="mail"/>
  </div>
  <div className="mb-3">
    <label htmlFor="inputPassword" className="htmlForm-label"/>
    <input type="password" className="htmlForm-control" id="inputPassword" placeholder="mot de passe"/>
  </div>  
  </form>
  </div>
  <div className="connexionButton">
<ConnexionButton/>
</div>
        </div>
    )
}
export default Connexion;