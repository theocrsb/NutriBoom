import "./Suscribe.css";
import SuscribeButton from "../components/SuscribeButton";
import { v4 as uuidv4 } from "uuid";

const Suscribe = () => {
  // creation de tableau avec les valeurs des options de nos select via une boucle for
  let taille = 1.19;
  let tailleOptions = [];

  for (let i = 0; i < 111; i++) {
    taille += 0.01;
    tailleOptions.push(taille.toFixed(2));
  }
  // console.log(tailleOptions);
  let poids = 29;
  let poidsOptions = [];

  for (let i = 0; i < 121; i++) {
    poids++;
    poidsOptions.push(poids);
  }
  // console.log(poidsOptions);
  let age = 6;
  let ageOptions = [];

  for (let i = 0; i < 71; i++) {
    age++;
    ageOptions.push(age);
  }
  console.log(ageOptions);
  return (
    <div>
      <div className="suscribe">
        <h1>Inscris toi gratuitement!</h1>
      </div>
      <form className="suscribeForm carotteFond">
        <div className="mb-3">
          <label htmlFor="inputNom" className="htmlForm-label text-center" />
          <input
            type="nom"
            className="htmlForm-control text-center "
            id="inputNom"
            placeholder="nom"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPrenom" className="htmlForm-label text-center" />
          <input
            type="prenom"
            className="htmlForm-control text-center"
            id="inputPrenom"
            placeholder="prenom"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputMail" className="htmlForm-label text-center " />
          <input
            type="mail"
            className="htmlForm-control text-center"
            id="exampleInputAge"
            placeholder="mail"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="inputPassword"
            className="htmlForm-label text-center"
          />
          <input
            type="password"
            className="htmlForm-control text-center"
            id="inputPassword"
            placeholder="mot de passe"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputAge" className="htmlForm-label text-center" />
          {/* <input
            type="age"
            className="htmlForm-control text-center"
            id="inputAge"
            placeholder="âge"
          /> */}
          <select
            name="age"
            id="inputAge"
            className="htmlForm-label text-center"
          >
            <option key={uuidv4()} value="">
              Selectionner votre age{" "}
            </option>
            {ageOptions.map((ageOption) => (
              <option key={uuidv4()} value={ageOption}>
                {ageOption} ans
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="inputWeight" className="htmlForm-label" />
          {/* <input
            type="weight"
            className="htmlForm-control"
            id="inputWeight"
            placeholder="poids(kg)"
          /> */}
          <select name="weight" id="inputWeight" className="htmlForm-label">
            <option key={uuidv4()} value="">
              Selectionner votre poids
            </option>
            {poidsOptions.map((poidsOption) => (
              <option key={uuidv4()} value={poidsOption}>
                {poidsOption} Kg
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="inputHeight" className="htmlForm-label" />
          {/* <input
            type="height"
            className="htmlForm-control"
            id="inputHeight"
            placeholder="taille(cm)"
          /> */}
          <select name="height" id="inputHeight" className="htmlForm-label">
            <option key={uuidv4()} value="">
              Selectionner votre taille
            </option>
            {tailleOptions.map((tailleOption) => (
              <option key={uuidv4()} value={tailleOption}>
                {tailleOption} M
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="inputGender" className="htmlForm-label" />
          {/* <input
            type="gender"
            className="htmlForm-control"
            id="inputGender"
            placeholder="sexe"
          /> */}
          <select
            name="gender"
            id="inputGender"
            className="htmlForm-label text-center"
          >
            <option key={uuidv4()} value="">
              Selectionner votre sexe
            </option>
            <option key={uuidv4()} value="femme">
              femme
            </option>
            <option key={uuidv4()} value="homme">
              homme
            </option>
          </select>
        </div>
        <SuscribeButton />
      </form>
    </div>
  );
};
export default Suscribe;
