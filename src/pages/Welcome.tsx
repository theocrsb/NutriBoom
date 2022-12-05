import SuscribeButton from "../components/SuscribeButton";
import ConnexionButton from "../components/ConnexionButton";
import ImcButton from "../components/ImcButton";
import "./Welcome.css"

const Welcome = ()=>{
    return(
        <div> 
          <div className="imcButtonStyle">
   <ImcButton/>
   </div> 
          <div className = "saladePicture">
            {/* image avec salade */}
          </div>
          <div className="containerButton">
    <ConnexionButton/>
     <SuscribeButton/>
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
     
      </div>
    )
}
export default Welcome;