import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import "./Account.css";
import { useNavigate } from "react-router-dom";


export interface User {
  id?: string;
  lastname?: string;
  firstname: string;
  age: number;
  weight: number;
  gender: string;
  email: string;
  password: string;
  ratio?: string;
  height: string;
}

export interface PayloadToken {
  exp: number;
  iat: number;
  id: string;
  role: string;
  username: string;
}

const Account = () => {
  const [UserProfile, setUserProfile] = useState<User>();
  const [updateLastname, setUpdateLastname] = useState<string>();
  const [updateFirstname, setUpdateFirstname] = useState<string>();
   const [updateage, setUpdateage] = useState<number>();
    const [updateGender, setUpdateGender] = useState<string>();
   const [updateWeight, setUpdateWeight] = useState<number>();
  const [updateHeight, setUpdateHeight] = useState<number>();
  const [updateMail, setUpdateMail] = useState<string>();
  const [updatePassword, setUpdatePassword] = useState<string>();
  const [message, setMessage] = useState<string>();
  const navigate = useNavigate();
//  ------------------------------ récupération des infos de l'utilisateur--------------------------------
  let token = localStorage.getItem("accesstoken");

  const searchUserId = () => {
    if (token) {
      let tokenDecoded: PayloadToken = jwt_decode(token);
      console.log("tokenDecoded.-------------------", tokenDecoded);
      console.log("tokenDecoded.id-------------------", tokenDecoded.id);
      return tokenDecoded.id;
    }
  };
  let searchUserIdValue: string | undefined = searchUserId();

  console.log("userSearch-----------------", searchUserIdValue);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${searchUserIdValue}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        console.log("res--------------------------", res.data);
        setUserProfile(res.data);
      })
      .catch((error) => {
        console.log("something went wrong", error);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem("accesstoken");
          navigate("/connexion");
        }
      });
  }, []);
  console.log("UserProfile-------------------", UserProfile?.firstname);
//--------------------------------------------------------------------------------------

// Mise à jour des infos de l'utilisateur


const lastNameFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
  setUpdateLastname(e.currentTarget.value);
 
};
const firstNameFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
  setUpdateFirstname(e.currentTarget.value);
};

const ageFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
  let valeurConvertieNombre = Number(e.currentTarget.value);
  setUpdateage(valeurConvertieNombre);
};

const sexFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setUpdateGender(e.currentTarget.value);
};
const weightFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
  let valeurConvertieNombre = Number(e.currentTarget.value);
  setUpdateWeight(valeurConvertieNombre);
};

const heightFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
  let valeurConvertieNombre = Number(e.currentTarget.value);
  setUpdateHeight(valeurConvertieNombre);
};

const mailFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
  setUpdateMail(e.currentTarget.value);
};

const passwordFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
  setUpdatePassword(e.currentTarget.value);
};


 const submitFunction = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("cliké");

    axios
      .patch(`http://localhost:8080/api/users/${searchUserIdValue}`, {
        lastname: updateLastname,
        firstname: updateFirstname,
        age: updateage,
        gender: updateGender,
        weight: updateWeight,
        height: updateHeight,
        email: updateMail,
        password: updatePassword,
      })
      .then((response) => {
        setTimeout(() => {
          navigate("/main");
        }, 1000);
        setMessage("Modifications sauvegardées !");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem("accesstoken");
          navigate("/connexion");
        }
      });

    }


let age = 6;
let ageOptions = [];

for (let i = 0; i < 71; i++) {
  age++;
  ageOptions.push(age);
}

let poids = 29;
let poidsOptions = [];

for (let i = 0; i < 121; i++) {
  poids++;
  poidsOptions.push(poids);
}

let taille = 1.19;
let tailleOptions = [];

for (let i = 0; i < 111; i++) {
  taille += 0.01;
  tailleOptions.push(taille.toFixed(2));
}

  return (
    <div>
      <div id="container">
        <div id="profil">
          <p className="ProfilActuel">Profil Actuel</p>
          <ul id="mb-3">
            {<li id="mb-3">Mon nom: {UserProfile?.lastname} </li>}
            {<li id="mb-3">Mon prenom: {UserProfile?.firstname}</li>}
            {<li id="mb-3">Mon mail: {UserProfile?.email}</li>}
            {<li id="mb-3">Mon mot de passe: {UserProfile?.password}</li>}
            {<li id="mb-3">Mon âge: {UserProfile?.age}</li>}
            {<li id="mb-3">Mon poids: {UserProfile?.weight}</li>}
            {<li id="mb-3">Ma taille: {UserProfile?.height}</li>}
            {<li id="mb-3">Mon genre: {UserProfile?.gender}</li>}
          </ul>
        </div>
        <div id="modifProfil">
          <p className="ProfilActuel">Modifie ton profil</p>
          <form
            id="mb-3"
            method="POST"
            className="ProfilActuel"
            onSubmit={submitFunction}
          >
            <div id="mb-3" className="mb-3">
              <label htmlFor="inputNom" className="htmlForm-label" />
              <input
                type="nom"
                className="ProfilActuel"
                id="inputNom"
                placeholder="nouveau nom"
                onChange={lastNameFunction}
              />
            </div>
            <div id="mb-3" className="mb-3">
              <label htmlFor="inputPrenom" className="htmlForm-label" />
              <input
                type="prenom"
                className="ProfilActuel"
                id="inputPrenom"
                placeholder="nouveau prenom"
                onChange={firstNameFunction}
              />
            </div>
            <div id="mb-3" className="mb-3">
              <label htmlFor="inputMail" className="htmlForm-label" />
              <input
                type="mail"
                className="ProfilActuel"
                id="inputMail"
                placeholder="nouvel e-mail"
                onChange={mailFunction}
              />
            </div>

            <div id="mb-3" className="mb-3">
              <label htmlFor="inputPassword" className="htmlForm-label" />
              <input
                type="password"
                className="ProfilActuel"
                id="inputPassword"
                placeholder="nouveau mot de passe"
                onChange={passwordFunction}
              />
            </div>
            <div id="mb-3" className="mb-3">
              <label htmlFor="inputAge" className="htmlForm-label" />
              <select
                name="age"
                id="inputAge"
                className="ProfilActuel"
                onChange={ageFunction}
                value={updateage}
              >
                <option key={uuidv4()} value="">
                  Sélectionner votre age{" "}
                </option>
                {ageOptions.map((ageOption) => (
                  <option key={uuidv4()} value={ageOption}>
                    {ageOption} ans
                  </option>
                ))}
              </select>
            </div>

            <div id="mb-3" className="mb-3">
              <label htmlFor="inputWeight" className="htmlForm-label" />
              <select
                name="weight"
                id="inputWeight"
                className="ProfilActuel"
                value={updateWeight}
                onChange={weightFunction}
              >
                <option key={uuidv4()} value="">
                  Sélectionner votre poids
                </option>
                {poidsOptions.map((poidsOption) => (
                  <option key={uuidv4()} value={poidsOption}>
                    {poidsOption} Kg
                  </option>
                ))}
              </select>
            </div>
            <div id="mb-3" className="mb-3">
              <label htmlFor="inputHeight" className="htmlForm-label" />
              <select
                name="height"
                id="inputHeight"
                className="ProfilActuel"
                value={updateHeight}
                onChange={heightFunction}
              >
                <option key={uuidv4()} value="">
                  Sélectionner votre taille
                </option>
                {tailleOptions.map((tailleOption) => (
                  <option key={uuidv4()} value={tailleOption}>
                    {tailleOption} M
                  </option>
                ))}
              </select>
            </div>
            <div id="mb-3" className="mb-3">
              <label htmlFor="inputGender" className="htmlForm-label" />
              <select
                name="gender"
                id="inputGender"
                className="ProfilActuel"
                value={updateGender}
                onChange={sexFunction}
              >
                <option key={uuidv4()} value="">
                  Sélectionner votre genre
                </option>
                <option key={uuidv4()} value="femme">
                  femme
                </option>
                <option key={uuidv4()} value="homme">
                  homme
                </option>
              </select>
            </div>
            <span className="message">{message}</span>
            <div className="button">
              <button id="mb-3" className="btn btn-danger btn-sm m-1">
                modifier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
