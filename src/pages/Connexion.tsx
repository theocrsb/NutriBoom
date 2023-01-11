import "./Connexion.css";
import { Link } from "react-router-dom";
import ConnexionButton from "../components/ConnexionButton";
import { useState, useEffect, FormEvent, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth-context";

const Connexion = () => {
  const { onAuthChange } = useContext(AuthContext);
  const [mailState, setMailState] = useState<string>();
  const [passwordState, setPasswordState] = useState<string>();
  const [message, setMessage] = useState<string>();
  const navigate = useNavigate();
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
    await axios
      .post("http://localhost:8080/api/auth/login", {
        email: mailState,
        password: passwordState,
      })
      .then((token) => {
        console.log(token.data.access_token);
        const tokens = token.data.access_token;
        localStorage.setItem("accesstoken", tokens);

        // recuperation du token dans le local storage afin de l'utiliser dans les context d'authentification
        // recupToken = localStorage.getItem("accesstoken");
        onAuthChange(tokens);
        // console.log("valeur de onAuthChange", onAuthChange("montoken"));
        //console.log("token recupere dans le local storage", recupToken);
        setTimeout(() => {
          navigate("/main");
        }, 1000);
        setMessage("Connexion réussie !");
      })
      .catch((error) => {
        console.log("connexion impossible", error);
        if (!mailState || !passwordState) {
          console.log("erreur", error.response.data.message);
          setMessage(error.response.data.message);
        } else if (error.message === "Request failed with status code 401") {
          setMessage("Mot de passe ou adresse mail inconnu(e)");
        }
      });
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
        <form className="formConnexion" onSubmit={handleLoginForm}>
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
          <button type="submit" className="btn inscription">
            {" "}
            Se connecter
          </button>
        </form>
        <Link className="linkSub" to="/mdo">
          <p className="lienInscription">
            {" "}
            <p>Mot de passe oublié</p>
          </p>
        </Link>
      </div>
      <span className="message">{message}</span>
      <div className="connexionButton">{/* <ConnexionButton /> */}</div>
    </div>
  );
};
export default Connexion;
