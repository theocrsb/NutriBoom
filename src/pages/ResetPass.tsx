import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import "./Account.css";
import { useNavigate } from "react-router-dom";
import { User } from "./Main";

export interface PayloadToken {
  exp: number;
  iat: number;
  id: string;
  role: string;
  username: string;
}

const ResetPass = () => {
  const [passwordState, setPasswordState] = useState<string>();
  const [passwordState2, setPasswordState2] = useState<string>();
  const [UserProfile, setUserProfile] = useState<User>();
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

  // useEffect(() => {
    // axios
  //     .get(`http://localhost:8080/api/users/${searchUserIdValue}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("res--------------------------", res.data);
  //       setUserProfile(res.data);
  //     })
  //     .catch((error) => {
  //       console.log("something went wrong", error);
  //       if (error.response.data.statusCode === 401) {
  //         localStorage.removeItem("accesstoken");
  //         navigate("/connexion");
  //       }
  //     });
  // }, []);
  // console.log("UserProfile-------------------", UserProfile?.firstname);
  //--------------------------------------------------------------------------------------

  // Mise à jour des infos de l'utilisateur
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
  return (
    <div>
      <img
        id="onglet"
        src={process.env.PUBLIC_URL + `/assets/bandeau mon compte.svg`}
        alt=""
      />
      <div id="container">
        <div id="modifProfil">
          <p className="ProfilActuel">Modifie ton mot de passe</p>

          <form
            id="mb-3"
            method="POST"
            className="ProfilActuel"
            onSubmit={submitFunction}
          >
            <div id="mb-3" className="mb-3">
              <label htmlFor="inputPassword" className="htmlForm-label" />
              <input
                type="password"
                className="ProfilActuel"
                id="inputPassword"
                placeholder="Nouveau mot de passe"
                onChange={passwordFunction1}
              />
            </div>

            <div id="mb-3" className="mb-3">
              <label htmlFor="inputPassword" className="htmlForm-label" />
              <input
                type="password"
                className="ProfilActuel"
                id="inputPassword"
                placeholder="Comfirmez mot de passe"
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
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
