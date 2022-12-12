import "./Connexion.css";
import { Link } from "react-router-dom";
import ConnexionButton from "../components/ConnexionButton";
import React, { useState, useEffect } from "react";
import { E } from "chart.js/dist/chunks/helpers.core";

const Connexion = () => {
  const [mailState, setMailState] = useState<string>();
  const [passwordState, setPasswordState] = useState<string>();

  const mailFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMailState(e.currentTarget.value);
  };
  const passwordFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState(e.currentTarget.value);
  };

  const submitFunction=()=>{
    console.log("submit")
  }

  // useEffect pour tester les states car ils sont asynchrones//
  //et affichent avant re-render une première valeur undefined//
  useEffect(() => {
    console.log("mail dans useEffect", mailState);
    console.log("password dans useEffect", passwordState);
  });
  return (
    <div className="fondCarotte">
      <div className="textConnect">
        <h1>Connecte toi!</h1>
        <p>Tu n'as pas encore de compte sur nutriBoom?</p>
        <Link className="linkSub" to="/suscribe">
          <p className="lienInscription">
            {" "}
            <strong>Inscription</strong>
          </p>
        </Link>
      </div>
      <div>
        <form className="formConnexion" onSubmit={submitFunction}>
          <div className="mb-3">
            <label htmlFor="inputMail" className="htmlForm-label" />
            <input
              type="mail"
              className="htmlForm-control"
              id="inputMail"
              placeholder="mail"
              onChange={mailFunction}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="htmlForm-label" />
            <input
              type="password"
              className="htmlForm-control"
              id="inputPassword"
              placeholder="mot de passe"
              onChange={passwordFunction}
            />
          </div>
             <div className="connexionButton">
        <ConnexionButton />
      </div>
        </form>
      </div>
   
    </div>
  );
};
export default Connexion;
