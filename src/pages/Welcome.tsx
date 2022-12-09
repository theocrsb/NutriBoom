import SuscribeButton from "../components/SuscribeButton";
import ConnexionButton from "../components/ConnexionButton";
import ImcButton from "../components/ImcButton";
import {HashLink as Link} from "react-router-hash-link"
import React, {useState, useEffect} from "react"
import "./Welcome.css"
import { E } from "chart.js/dist/chunks/helpers.core";

const Welcome = ()=>{
 const [tailleState, setTailleState] = useState<string>();
 const [poidsState, setPoidsState] = useState<string>();
 const [ageState, setAgeState] = useState<string>();
 const [sexeState, setSexeState] = useState<string>();
 const [message, setMessage] =useState<string>()
 const [messageBis, setMessageBis] =useState<string>()
 
  const imcSubmit=(e:React.FormEvent)=>{
     e.preventDefault()
  if(!tailleState || !poidsState){
    setMessage("un élément est manquant pour le calcul")
  }else{
   
    let taille = Number(tailleState)
    let poids = Number(poidsState)
    console.log("taille convertie en number",taille)
    let tailleDivise = taille /100
    console.log ("taille divisée par 100", tailleDivise)
    let resultImc = poids / (tailleDivise * tailleDivise);
    let resultatImc = resultImc.toFixed(2)
    console.log("resultat de l'imc",resultImc)
    setMessage(`Votre IMC est de ${resultatImc} `)
//     if(Number(resultatImc) > 25){
// setMessageBis(", vous rentrez dans la catégorie surpoids")
//     }
switch(true){
  case Number(resultatImc)>18 && Number(resultatImc) <25:
    setMessageBis("vous rentrez dans la categorie normale")
    break;
    case Number(resultatImc)<18:
      setMessageBis("vous rentrez dans l'insufisance pondérale")
      break;
}
  }
    
  }

  const tailleFunction=(e:React.ChangeEvent<HTMLInputElement>)=>{
setTailleState(e.currentTarget.value)
  }

    const poidsFunction=(e:React.ChangeEvent<HTMLInputElement>)=>{
setPoidsState(e.currentTarget.value)
    }
  const ageFunction=(e:React.ChangeEvent<HTMLInputElement>)=>{
setAgeState(e.currentTarget.value)
  }
  const sexeFunction=(e:React.ChangeEvent<HTMLInputElement>)=>{
setSexeState(e.currentTarget.value)
  }

  // useEffect pour tester les states car ils sont asynchrones//
  //et affichent avant re-render une première valeur undefined//
  useEffect(() => {
  console.log("taille dans useEffect", tailleState)
  console.log("poids dans useEffect", poidsState)
})
    return(
        <div> 
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
     <form className="imcForm" onSubmit={imcSubmit}>
  <div id="imc" className="mb-3">
    <label htmlFor="exampleInputTaille" className="htmlForm-label"/>
    <input type="taille" className="htmlForm-control" id="exampleInputTaille"placeholder="taille" onChange={tailleFunction}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPoids" className="htmlForm-label"/>
    <input type="poids" className="htmlForm-control" id="exampleInputPoids" placeholder="poids" onChange={poidsFunction}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputAge" className="htmlForm-label"/>
    <input type="age" className="htmlForm-control" id="exampleInputAge" placeholder="age" onChange={ageFunction}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputSexe" className="htmlForm-label"/>
    <input type="sexe" className="htmlForm-control" id="exampleInputSexe" placeholder="sexe" onChange={sexeFunction}/>
  </div>
  <div className="imcButton2">
  <ImcButton/>
  </div>
</form>
  <p className ="message">{message}{messageBis}</p>
<div>
<Link to="#hautNavBar" className="basDePageLink">
 <p className="hautPage"> Revenir en haut de page </p>
 </Link>
 </div>
      </div>
    )
}
export default Welcome;
