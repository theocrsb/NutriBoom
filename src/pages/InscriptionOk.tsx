import { Link } from "react-router-dom";
import ConnexionButton from "../components/ConnexionButton";
import "./InscriptionOk.css";
import "./Welcome.css";

const InscriptionOk = () => {
  return (
    <div className="inscriptionok-page">
      <div className="inscriptionok-container">
        <div className="textAccueil">
          <h1 className="textInscription"> Boom...</h1>
          <h1 className="textInscription">
            Tu es enfin inscrit sur la meilleure app de suivi calorique
          </h1>
        </div>
        <p className="textInscriptionBis">
          Connecte toi dès maintenant pour pouvoir profiter de notre offre !{" "}
        </p>
        {/* <Link to ="/connexion" className="link">
        <p className ="lien">Se connecter</p>
        </Link> */}
        <div className="containerButton">
          <Link to="/connexion">
            <ConnexionButton />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default InscriptionOk;
