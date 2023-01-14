import "./Suscribe.css";
import SuscribeButton from "../components/SuscribeButton";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/Auth-context";
import { useNavigate } from "react-router-dom";
import React from "react";

const Suscribe = () => {
  const [lastNameState, setLastNameState] = useState<string>();
  const [firstNameState, setFirstNameState] = useState<string>();
  const [passwordState, setPasswordState] = useState<string>();
  const [passwordState2, setPasswordState2] = useState<string>();
  const [mailState, setMailState] = useState<string>();
  const [ageState, setAgeState] = useState<number>();
  const [weightState, setWeightState] = useState<number>();
  const [heightState, setHeightState] = useState<number>();
  const [ratioState, setRatioState] = useState<number>();
  const [sexState, setSexState] = useState<string>();
  const [champManquant, setChampManquant] = useState<string>();
  const [passVerif, setPassVerif] = useState<string>();
  const navigate = useNavigate();

  const lastNameFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastNameState(e.currentTarget.value.trimEnd().trimStart());
  };
  const firstNameFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNameState(e.currentTarget.value.trimEnd().trimStart());
  };
  const mailFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMailState(
      e.currentTarget.value
        .toLocaleLowerCase()
        .trim()
        .split(" ")
        .join("")
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
      // normalize et replace pour les accent et autres le reste pour les espaces
    );
  };
  const passwordFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState(e.currentTarget.value);
  };
  const passwordFunction2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState2(e.currentTarget.value);
  };
  const ageFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let valeurConvertieNombre = Number(e.currentTarget.value);
    setAgeState(valeurConvertieNombre);
  };
  const weightFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let valeurConvertieNombre = Number(e.currentTarget.value);
    setWeightState(valeurConvertieNombre);
  };
  const heightFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let valeurConvertieNombre = Number(e.currentTarget.value);
    setHeightState(valeurConvertieNombre);
  };
  const sexFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSexState(e.currentTarget.value.trim().trimStart());
  };

  const ratioFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let valeurConvertieNombre = Number(e.currentTarget.value);
    setRatioState(valeurConvertieNombre);
  };

  const submitFunction = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("cliké");
    // fonction de verification du mot de passe
    if (passwordState !== passwordState2) {
      alert("Les mots de passe ne correspondent pas.");
    } else {
      axios
        .post(`http://localhost:8080/api/users`, {
          lastname: lastNameState,
          firstname: firstNameState,
          age: ageState,
          gender: sexState,
          weight: weightState,
          height: heightState,
          email: mailState,
          password: passwordState,
          ratio: ratioState,
        })
        .then((response) => {
          console.log("le console.log du response.data", response.data);
          let inscription = true;
          if (inscription) {
            return navigate("/inscriptionok");
          }
        })
        .catch((error) => {
          console.error("something went wrong", error);
          if (
            !lastNameState ||
            !firstNameState ||
            !ageState ||
            !sexState ||
            !weightState ||
            !heightState ||
            !mailState ||
            !passwordState ||
            !ratioState
          ) {
            setChampManquant("un des champs est oublié ou mal rempli");
          } else if (error.response.data.message) {
            setChampManquant(error.response.data.message);
          }
        });
    }
  };

  useEffect(() => {
    console.log("lastName", lastNameState);
    console.log("firstName", firstNameState);
    console.log("mail", mailState);
    console.log("age dans useEffect", ageState);
    console.log("password", passwordState);
    console.log("password2", passwordState2);
    console.log("weight", weightState);
    console.log("height", heightState);
    console.log("sex", sexState);
    console.log("ratio", ratioState);
  });

  // creation de tableau avec les valeurs des options de nos select via une boucle htmlFor
  let taille = 1.19;
  let tailleOptions = [];

  for (let i = 0; i < 111; i++) {
    taille += 0.01;
    let res = Math.round(taille * 100) / 100;
    tailleOptions.push(res);
    // tailleOptions.push(taille.toFixed(2));
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
    <div className="subscribe-page carotteFond">
      <section className="container-form-global">
        <img
          className="carotte-img-1"
          src={process.env.PUBLIC_URL + `/assets/carotte heureux.png`}
          alt="logo"
        />{" "}
        <div className="container-form-sub">
          <div className="suscribe ">
            <h1>Inscris-toi gratuitement!</h1>
          </div>
          {/* <form
            method="POST"
            className="suscribeForm "
            onSubmit={submitFunction}
          >
            <div className="mb-3">
              <label
                htmlFor="inputNom"
                className="htmlForm-label text-center"
              />{" "}
              <input
                type="nom"
                className="htmlForm-control text-center "
                id="inputNom"
                placeholder="Nom"
                onChange={lastNameFunction}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="inputPrenom"
                className="htmlForm-label text-center"
              />
              <input
                type="prenom"
                className="htmlForm-control text-center"
                id="inputPrenom"
                placeholder="Prénom"
                onChange={firstNameFunction}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="inputMail"
                className="htmlForm-label text-center "
              />
              <input
                type="email"
                className="htmlForm-control text-center"
                id="exampleInputAge"
                placeholder="Email"
                onChange={mailFunction}
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
                placeholder="Mot de passe"
                onChange={passwordFunction}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="inputPassword2"
                className="htmlForm-label text-center"
              />
              <input
                type="password"
                className="htmlForm-control text-center"
                id="inputPassword2"
                placeholder="Confirme le mot de passe"
                onChange={passwordFunction2}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="inputAge"
                className="htmlForm-label text-center"
              />

              <select
                name="age"
                id="inputAge"
                className="htmlForm-label text-center select"
                onChange={ageFunction}
                value={ageState}
              >
                <option key={uuidv4()} value="">
                  Sélectionne ton âge{" "}
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

              <select
                name="weight"
                id="inputWeight"
                className="htmlForm-label select"
                value={weightState}
                onChange={weightFunction}
              >
                <option key={uuidv4()} value="">
                  Sélectionne ton poids
                </option>
                {poidsOptions.map((poidsOption) => (
                  <option key={uuidv4()} value={poidsOption}>
                    {poidsOption} kg
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="inputHeight" className="htmlForm-label" />

              <select
                name="height"
                id="inputHeight"
                className="htmlForm-label select"
                value={heightState}
                onChange={heightFunction}
              >
                <option key={uuidv4()} value="">
                  Sélectionne ta taille
                </option>
                {tailleOptions.map((tailleOption) => (
                  <option key={uuidv4()} value={tailleOption}>
                    {tailleOption} m
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="inputGender" className="htmlForm-label" />

              <select
                name="gender"
                id="inputGender"
                className="htmlForm-label text-center select"
                value={sexState}
                onChange={sexFunction}
              >
                <option key={uuidv4()} value="">
                  Sélectionne ton genre
                </option>
                <option key={uuidv4()} value="femme">
                  Femme
                </option>
                <option key={uuidv4()} value="homme">
                  Homme
                </option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="inputRation" className="htmlForm-label" />

              <select
                name="ratio"
                id="inputRatio"
                className="htmlForm-label text-center select"
                value={ratioState}
                onChange={ratioFunction}
              >
                <option key={uuidv4()} value="">
                  Sélectionne ton activité
                </option>
                <option key={uuidv4()} value="1.375">
                  sédentaire (travail de bureau et faible activité physique)
                </option>
                <option key={uuidv4()} value="1.56">
                  activité physique légère (entraînement 1 à 3 fois par semaine)
                </option>
                <option key={uuidv4()} value="1.64">
                  activité physique modérée (entraînement 4 à 6 fois par
                  semaine)
                </option>
                <option key={uuidv4()} value="1.82">
                  activité physique intense (plus de 6 entraînements par
                  semaine)
                </option>
              </select>
            </div>
            <span className="messageDynamique">{champManquant}</span>
            <SuscribeButton />
          </form> */}
          {/* test pour sauver le css de la page ---------------------------- */}
          <form
            method="POST"
            className="suscribeForm "
            onSubmit={submitFunction}
          >
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="firstname"
                id="firstname"
                aria-label="default input example"
                onChange={firstNameFunction}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                Lastname
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="firstname"
                id="firstname"
                aria-label="default input example"
                onChange={lastNameFunction}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={mailFunction}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Mot de passe"
                onChange={passwordFunction}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label">
                Confirme ton mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Confirmation Mot de passe"
                onChange={passwordFunction2}
              />
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                value={ageState}
                onChange={ageFunction}
              >
                <option key={uuidv4()} value="">
                  Sélectionne ton âge{" "}
                </option>
                {ageOptions.map((ageOption) => (
                  <option key={uuidv4()} value={ageOption}>
                    {ageOption} ans
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                value={weightState}
                onChange={weightFunction}
              >
                <option key={uuidv4()} value="">
                  Sélectionne ton poids
                </option>
                {poidsOptions.map((poidsOption) => (
                  <option key={uuidv4()} value={poidsOption}>
                    {poidsOption} kg
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                value={heightState}
                onChange={heightFunction}
              >
                <option key={uuidv4()} value="">
                  Sélectionne ta taille
                </option>
                {tailleOptions.map((tailleOption) => (
                  <option key={uuidv4()} value={tailleOption}>
                    {tailleOption} m
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                className="form-select text-center"
                aria-label="Default select example"
                value={sexState}
                onChange={sexFunction}
              >
                <option key={uuidv4()} value="">
                  Sélectionne ton genre
                </option>
                <option key={uuidv4()} value="femme">
                  Femme
                </option>
                <option key={uuidv4()} value="homme">
                  Homme
                </option>
              </select>
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                value={ratioState}
                onChange={ratioFunction}
              >
                <option key={uuidv4()} value="">
                  Sélectionne ton activité
                </option>
                <option key={uuidv4()} value="1.375">
                  sédentaire (travail de bureau et faible activité physique)
                </option>
                <option key={uuidv4()} value="1.56">
                  activité physique légère (entraînement 1 à 3 fois par semaine)
                </option>
                <option key={uuidv4()} value="1.64">
                  activité physique modérée (entraînement 4 à 6 fois par
                  semaine)
                </option>
                <option key={uuidv4()} value="1.82">
                  activité physique intense (plus de 6 entraînements par
                  semaine)
                </option>
              </select>
            </div>

            <button type="submit" className="btn btn-success">
              Confirmer
            </button>
          </form>
        </div>
        <img
          className="carotte-img-2"
          src={process.env.PUBLIC_URL + `/assets/missCarotte.png`}
          alt="logo"
        />{" "}
      </section>
    </div>
  );
};
export default Suscribe;
{
  /* <form>
    <div className="mb-3" >
<label htmlFor="firstname" className="form-label">Firstname</label>
<input className="form-control" type="text" placeholder="firstname" id="firstname" aria-label="default input example"/>
</div>
  <div className="mb-3" >
<label htmlFor="firstname" className="form-label">Lastname</label>
<input className="form-control" type="text" placeholder="firstname" id="firstname" aria-label="default input example"/>
</div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3" >
    <select className="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
</div>
  <div className="mb-3" >
    <select className="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
</div>
  <div className="mb-3" >
    <select className="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
</div>
  <div className="mb-3" >
    <select className="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
</div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form> */
}
