import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import "./ResetPass.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { User } from "./Main";
import React from "react";

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
  const [UserProfileId, setUserProfileId] = useState<string>();
  const [showState, setShowState] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation();
  // utilisation des query params pour recuperer le token dans l'url
  let queryParam = new URLSearchParams(location.search);
  let recupToken = queryParam.get("token");
  console.log("token récuperé dans l' url via les query params", recupToken);
  const tokenExpiration = (token: string | null) => {
    if (recupToken) {
      const decoded: PayloadToken = jwt_decode(recupToken);
      if (Date.now() <= decoded.exp * 1000) {
        return true;
      } else {
        return false;
      }
    }
  };

  let tokenValidator: boolean | undefined = tokenExpiration(recupToken);
  console.log("le token est il encore valide:", tokenValidator);

  // Mise à jour des infos de l'utilisateur
  const passwordFunction1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState(e.currentTarget.value);
  };
  const passwordFunction2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState2(e.currentTarget.value);
  };
  const submitFunction = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("cliké");
    console.log("password dans le state 1", passwordState);
    console.log("password dans le state 2", passwordState2);
    // fonction de verification du mot de passe
    if (passwordState !== passwordState2) {
      setMessage("Les mots de passe ne correspondent pas.");
    } else if (tokenValidator !== true) {
      setMessage("Votre demande à expiré");
    } else {
      axios
        .patch(`http://localhost:8080/api/users/reset/password`, {
          password: passwordState,
          token: recupToken,
        })
        .then((response) => {
          console.log(response);
          setTimeout(() => {
            navigate("/connexion");
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
  };
  return (
    <div>
      <div id="container">
        <div id="modifProfil-reset">
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
                type={showState ? "text" : "password"}
                className="ProfilActuel"
                id="inputPassword"
                placeholder="Nouveau mot de passe"
                onChange={passwordFunction1}
              />
            </div>

            <div id="mb-3" className="mb-3">
              <label htmlFor="inputPassword" className="htmlForm-label" />
              <input
                type={showState ? "text" : "password"}
                className="ProfilActuel"
                id="inputPassword"
                placeholder="Comfirmez mot de passe"
                onChange={passwordFunction2}
              />
            </div>
            <div className="container-check-reset">
              <input
                className="form-check-input "
                type="checkbox"
                id="mdp-afficher"
                name="drone"
                onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                  setShowState(e.currentTarget.checked);
                  console.log("valeur de la checkbox", e.currentTarget.checked);
                }}
                // defaultChecked={user.role.label === "user" ? true : false}
              />
              <label className="label-reset" htmlFor="mdp-afficher">
                Afficher le mot de passe
              </label>
            </div>

            <p className="message">{message}</p>
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
