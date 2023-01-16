import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import "./Account.css";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./Main";

export interface PayloadToken {
  exp: number;
  iat: number;
  id: string;
  role: string;
  username: string;
}

const Account = () => {
  const [passwordState, setPasswordState] = useState<string>();
  const [passwordState2, setPasswordState2] = useState<string>();
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
    setUpdateLastname(e.currentTarget.value.trimEnd().trimStart());
  };
  const firstNameFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateFirstname(e.currentTarget.value.trimEnd().trimStart());
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
    setUpdateMail(
      e.currentTarget.value
        .toLocaleLowerCase()
        .trim()
        .split(" ")
        .join("")
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
    );
    // normalize et replace pour les accent et autres le reste pour les espaces);
  };

  const passwordFunction1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatePassword(e.currentTarget.value);
  };
  const passwordFunction2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatePassword(e.currentTarget.value);
  };
  const submitFunction = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("cliké");
    console.log("id du user a patch", searchUserIdValue);
    // fonction de verification du mot de passe
    if (passwordState !== passwordState2) {
      alert("Les mots de passe ne correspondent pas.");
    } else {
      axios
        .patch(
          `http://localhost:8080/api/users/${searchUserIdValue}`,
          {
            id: searchUserIdValue,
            lastname: updateLastname,
            firstname: updateFirstname,
            age: updateage,
            gender: updateGender,
            weight: updateWeight,
            height: updateHeight,
            email: updateMail,
            password: updatePassword,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          console.log("id du user a patch dans le response", searchUserIdValue);
          setTimeout(() => {
            navigate("/main");
          }, 1000);
          setMessage("Modifications sauvegardées !");
        })
        .catch((error) => {
          console.log(error);
          console.log("id du user a patch dans le catch", searchUserIdValue);
          setMessage(error.response.data.message);
          if (error.response.data.statusCode === 401) {
            localStorage.removeItem("accesstoken");
            navigate("/connexion");
          }
        });
    }
  };

  let age = 6;
  let ageOptions = [];

  for (let i = 0; i < 71; i++) {
    age++;
    ageOptions.push(age);
  }
  console.log(ageOptions);

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
    let res = Math.round(taille * 100) / 100;
    tailleOptions.push(res);
    // tailleOptions.push(taille.toFixed(2));
  }

  const deleteAccount =(e:React.MouseEvent)=>{
    if(
window.confirm("Veux-tu vraiment supprimer ton compte?")){
  axios.delete(`http://localhost:8080/api/users/${searchUserIdValue}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }).then((res)=>{
          console.log("supp");
          window.alert("compte supprimé");  
          localStorage.removeItem("accesstoken")
          window.location.reload()
          }
          ).catch((err)=>{
            console.log("something went wrong", err)
            window.location.reload()
          })
}
  }

  return (
    <div className="account-page">
      <div className="container-account">
        <img
          id="onglet"
          src={process.env.PUBLIC_URL + `/assets/bandeau mon compte.svg`}
          alt=""
        />
        <div id="container">
          <div id="modifProfil">
            <p className="ProfilActuel">Modifie tes données personnelles</p>

            <form
              id="mb-3"
              method="POST"
              className="ProfilActuel"
              onSubmit={submitFunction}
            >
              <p className="Titre">Ton profil</p>
              <div id="mb-3" className="mb-3">
                <label htmlFor="inputNom" className="htmlForm-label" />
                <input
                  type="nom"
                  className="ProfilActuel"
                  id="inputNom"
                  placeholder={UserProfile?.lastname}
                  onChange={lastNameFunction}
                />
              </div>

              <div id="mb-3" className="mb-3">
                <label htmlFor="inputPrenom" />
                <input
                  type="prenom"
                  className="ProfilActuel"
                  id="inputPrenom"
                  placeholder={UserProfile?.firstname}
                  onChange={firstNameFunction}
                />
              </div>

              {/* <p id="li-actuel-mb3">
              {" "}
              Age actuel: <span className="manchette">{UserProfile?.age} </span>
            </p> */}
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
                    {UserProfile?.age}
                    {" ans "}
                  </option>
                  {ageOptions.map((ageOption) => (
                    <option key={uuidv4()} value={ageOption}>
                      {ageOption} ans
                    </option>
                  ))}
                </select>
              </div>
              {/* <p id="li-actuel-mb3">
              {" "}
              {UserProfile?.weight}:{" "}
              <span className="manchette">{UserProfile?.weight} </span>
            </p> */}
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
                    {UserProfile?.weight} {" Kg "}
                  </option>
                  {poidsOptions.map((poidsOption) => (
                    <option key={uuidv4()} value={poidsOption}>
                      {poidsOption} Kg
                    </option>
                  ))}
                </select>
              </div>
              {/* <p id="li-actuel-mb3">
              {" "}
              Taille actuelle:{" "}
              <span className="manchette">{UserProfile?.height} </span>
            </p> */}
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
                    {UserProfile?.height}
                    {" m"}
                  </option>
                  {tailleOptions.map((tailleOption) => (
                    <option key={uuidv4()} value={tailleOption}>
                      {tailleOption} M
                    </option>
                  ))}
                </select>
              </div>
              {/* <p id="li-actuel-mb3">
              {" "}
              Genre actuel:{" "}
              <span className="manchette">{UserProfile?.gender} </span>
            </p> */}
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
                    {UserProfile?.gender}
                  </option>
                  <option key={uuidv4()} value="femme">
                    Femme
                  </option>
                  <option key={uuidv4()} value="homme">
                    Homme
                  </option>
                </select>
              </div>
              {/* <p id="li-actuel-mb3">
              {" "}
              Mail actuel:{" "}
              <span className="manchette">{UserProfile?.email} </span>
            </p> */}
              <div id="mb-3" className="mb-3">
                <label htmlFor="inputMail" className="htmlForm-label" />
                <input
                  type="mail"
                  className="ProfilActuel"
                  id="inputMail"
                  placeholder={UserProfile?.email}
                  onChange={mailFunction}
                />
              </div>

              <div id="mb-3" className="mb-3">
                <label htmlFor="inputPassword" className="htmlForm-label" />
                <input
                  type="password"
                  className="ProfilActuel"
                  id="inputPassword"
                  placeholder="Nouveau mot de passe"
                  onChange={passwordFunction1}
                />
                {/* <i
                className="far fa-eye"
                id="togglePassword"
                style={{marginLeft: '-30px', cursor: "pointer"}}
              ></i> */}
              </div>
              <div id="mb-3" className="mb-3">
                <label htmlFor="inputPassword" className="htmlForm-label" />
                <input
                  type="password"
                  className="ProfilActuel"
                  id="inputPassword"
                  placeholder="Confirme le mot de passe"
                  onChange={passwordFunction2}
                />
              </div>
              <span className="message">{message}</span>
              <div className="button">
                <button id="button-mb-3" className="btn btn-danger btn-sm m-1">
                  modifier
                </button>
              </div>
            </form>
             <button className="supprimer" onClick={deleteAccount}>
                  supprimer son compte
                </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
