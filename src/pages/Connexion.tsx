import "./Connexion.css";
import { Link } from "react-router-dom";
import ConnexionButton from "../components/ConnexionButton";
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";

const Connexion = () => {
  const [mailState, setMailState] = useState<string>();
  const [passwordState, setPasswordState] = useState<string>();
  let recupToken: string | null;

  const mailFunction = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setMailState(e.currentTarget.value);
  };
  const passwordFunction = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setPasswordState(e.currentTarget.value);
  };
  const handleLoginForm = async (e: FormEvent) => {
    e.preventDefault();
    console.log("button form clicked");
    console.log(mailState);
    console.log(passwordState);
    if (mailState || passwordState === null) {
      alert("merci de verifier vos identifiants");
    } else if (mailState && passwordState === null) {
      alert("merci de verifier vos identifiants");
    } else if (mailState || passwordState === undefined) {
      alert("merci de verifier vos identifiants");
    }
    if (mailState && passwordState !== undefined) {
      await axios
        .post("http://localhost:8080/api/auth/login", {
          email: mailState,
          password: passwordState,
        })
        .then((token) => {
          console.log(token.data.access_token);
          const tokens = token.data.access_token;
          localStorage.setItem("accesstoken", tokens);
          recupToken = localStorage.getItem("accesstoken");
        });
    } else {
      return;
    }
  };

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
        <form className="formConnexion">
          <div className="mb-3">
            <label htmlFor="inputMail" className="htmlForm-label" />
            <input
              type="mail"
              className="htmlForm-control"
              id="inputMail"
              placeholder="mail"
              onInput={mailFunction}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="htmlForm-label" />
            <input
              type="password"
              className="htmlForm-control"
              id="inputPassword"
              placeholder="mot de passe"
              onInput={passwordFunction}
            />
          </div>
        </form>
      </div>
      <div className="connexionButton">
        <button
          onClick={handleLoginForm}
          type="submit"
          className="btn inscription"
        >
          {" "}
          s'inscrire
        </button>
        {/* <ConnexionButton /> */}
      </div>
    </div>
  );
};
export default Connexion;
