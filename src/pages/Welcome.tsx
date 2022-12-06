import SuscribeButton from "../components/SuscribeButton";
import ConnexionButton from "../components/ConnexionButton";
import ImcButton from "../components/ImcButton";
import {HashLink as Link} from "react-router-hash-link"
import "./Welcome.css"

const Welcome = ()=>{
    return(
        <div  id = "haut"> 
          <div className="imcButtonStyle">
            <Link to="#imc">
               <ImcButton/>
            </Link>
   </div> 
          <div className = "saladePicture">
            {/* image avec salade */}
          </div>
          <div className="containerButton">
              <Link to = "/connexion">
    <ConnexionButton/>
    </Link>
    <Link to = "/suscribe">
     <SuscribeButton/>
     </Link>
     </div>
     <p className = "nboomText">Avec NutriBoom, boostez votre hygiène de vie !</p>
     <div className="containerText">
<p className="description"><strong> Suivi Journalier</strong>
<br /> Complétez votre parcours santé en ajoutant vos aliments et exercices préférés à votre journal.
<br /> <strong>Tableau de bord</strong>
<br />Obtenez un rapport sur une durée grâce à notre tableau de bord.
<br /><strong>Alimentez la base de données de la communauté</strong>
<br />Soumettez vos aliments/exercices afin de nous permettre d'améliorervotre expérience utilisateur
</p>
     </div>
     <form className="imcForm">
  <div id="imc" className="mb-3">
    <label htmlFor="exampleInputTaille" className="htmlForm-label"/>
    <input type="taille" className="htmlForm-control" id="exampleInputTaille"placeholder="taille"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPoids" className="htmlForm-label"/>
    <input type="poids" className="htmlForm-control" id="exampleInputPoids" placeholder="poids"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputAge" className="htmlForm-label"/>
    <input type="age" className="htmlForm-control" id="exampleInputAge" placeholder="age"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputSexe" className="htmlForm-label"/>
    <input type="sexe" className="htmlForm-control" id="exampleInputSexe" placeholder="sexe"/>
  </div>
  <div className="imcButton2">
  <ImcButton/>
  </div>
</form>
<Link to="#haut">
 <p className="hautPage"> Revenir en haut de page </p>
 </Link>
      </div>
    )
}
export default Welcome;