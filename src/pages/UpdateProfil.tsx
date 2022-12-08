const UpdateProfil = ()=>{
    return(
        <div>
            <h1>Modifie ton profil</h1>
             <form className="suscribeForm carotteFond">
  <div className="mb-3">
    <label htmlFor="inputNom" className="htmlForm-label"/>
    <input type="nom" className="htmlForm-control" id="inputNom"placeholder="nom"/>
  </div>
  <div className="mb-3">
    <label htmlFor="inputPrenom" className="htmlForm-label"/>
    <input type="prenom" className="htmlForm-control" id="inputPrenom" placeholder="prenom"/>
  </div>
  <div className="mb-3">
    <label htmlFor="inputMail" className="htmlForm-label"/>
    <input type="mail" className="htmlForm-control" id="exampleInputAge" placeholder="mail"/>
  </div>
  <div className="mb-3">
    <label htmlFor="inputPassword" className="htmlForm-label"/>
    <input type="password" className="htmlForm-control" id="inputPassword" placeholder="mot de passe"/>
  </div>
  <div className="mb-3">
    <label htmlFor="inputAge" className="htmlForm-label"/>
    <input type="age" className="htmlForm-control" id="inputAge" placeholder="âge"/>
  </div>
  <div className="mb-3">
    <label htmlFor="inputWeight" className="htmlForm-label"/>
    <input type="weight" className="htmlForm-control" id="inputWeight" placeholder="poids(kg)"/>
  </div>
  <div className="mb-3">
    <label htmlFor="inputHeight" className="htmlForm-label"/>
    <input type="height" className="htmlForm-control" id="inputHeight" placeholder="taille(cm)"/>
  </div>
  <div className="mb-3">
    <label htmlFor="inputGender" className="htmlForm-label"/>
    <input type="gender" className="htmlForm-control" id="inputGender" placeholder="sexe"/>
  </div>
<button>modifier</button>
</form>
        </div>
    )
}
export default UpdateProfil;