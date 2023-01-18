import SuscribeButton from "../components/SuscribeButton";
import ConnexionButton from "../components/ConnexionButton";
import ImcButton from "../components/ImcButton";
import { HashLink as Link } from "react-router-hash-link";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Welcome.css";
import { AuthContext } from "../contexts/Auth-context";

const Welcome = () => {
  const [tailleState, setTailleState] = useState<string>();
  const [poidsState, setPoidsState] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [messageBis, setMessageBis] = useState<string>();
  const { savedToken } = useContext(AuthContext);

  const imcSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let taille = Number(tailleState);
    let poids = Number(poidsState);

    if (!tailleState || !poidsState) {
      setMessage("un élément est manquant pour le calcul");
      setMessageBis("");
    } else {
      console.log("taille convertie en number", taille);
      let tailleDivise = taille / 100;
      console.log("taille divisée par 100", tailleDivise);
      let resultImc = poids / (tailleDivise * tailleDivise);
      let resultatImc = resultImc.toFixed(2);
      console.log("resultat de l'imc", resultImc);
      setMessage(`Ton IMC est de ${resultatImc} `);

      switch (true) {
        case Number(resultatImc) < 18.5:
          setMessageBis(
            "D'après l'échelle de l'OMS, tu es en situation d'insuffisance pondérale (maigreur)"
          );
          break;

        case Number(resultatImc) >= 18.5 && Number(resultatImc) <= 25:
          setMessageBis(
            "D'après l'échelle de l'OMS, tu es de corpulence normale"
          );
          break;

        case Number(resultatImc) > 25 && Number(resultatImc) <= 30:
          setMessageBis(
            "D'après l'échelle de l'OMS, tu es en situation de surpoids"
          );
          break;

        case Number(resultatImc) > 30 && Number(resultatImc) <= 35:
          setMessageBis(
            "D'après l'échelle de l'OMS, tu es en situation d'obésité modérée"
          );
          break;

        case Number(resultatImc) > 35 && Number(resultatImc) <= 40:
          setMessageBis(
            "D'après l'échelle de l'OMS, tu es en situation d'obésité sévère"
          );
          break;

        case Number(resultatImc) > 40:
          setMessageBis(
            "D'après l'échelle de l'OMS, tu es en situation d'obésité morbide ou massive"
          );
          break;
      }
    }
  };

  const tailleFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTailleState(e.currentTarget.value);
  };

  const poidsFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoidsState(e.currentTarget.value);
  };

  // useEffect pour tester les states car ils sont asynchrones//
  //et affichent avant re-render une première valeur undefined//
  useEffect(() => {
    console.log("taille dans useEffect", tailleState);
    console.log("poids dans useEffect", poidsState);
  });
  return (
    <div>
      <div className="imcButtonStyle">
        <Link to="#imc">
          <ImcButton />
        </Link>
      </div>
      <div className="saladePicture">{/* image avec salade */}</div>
      {!savedToken && (
        <div className="containerButton">
          <Link to="/connexion">
            <ConnexionButton />
          </Link>
          <Link to="/suscribe">
            <SuscribeButton />
          </Link>
        </div>
      )}
      <h1 className="nboomText">Avec NutriBoom, booste ton hygiène de vie !</h1>
      <div className="containerText">
        <p className="description">
          <span className="wordStyle"> Suivi Journalier</span>
          <br /> Complète ton parcours santé en ajoutant tes aliments consommés
          et exercices réalisés à ton journal.
          <br />
          <br />
          <span className="wordStyle">
            Alimente la base de données de la communauté
          </span>
          <br />
          Soumets tes aliments/exercices afin de nous permettre d'améliorer ton
          expérience utilisateur
        </p>
      </div>
      <div className="imc-container">
        <section>
          <form className="imcForm" onSubmit={imcSubmit}>
            <div id="imc" className="mb-3">
              <label htmlFor="exampleInputTaille" className="htmlForm-label" />
              <input
                type="number"
                min={100}
                className="htmlForm-control"
                id="exampleInputTaille"
                placeholder="taille (cm)"
                onChange={tailleFunction}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPoids" className="htmlForm-label" />
              <input
                type="number"
                min={10}
                className="htmlForm-control"
                id="exampleInputPoids"
                placeholder="poids (kg)"
                onChange={poidsFunction}
              />
            </div>
            <p className="message">
              {message} <br />
              {messageBis}
            </p>
            <div className="imcButton2">
              <ImcButton />
            </div>
          </form>
        </section>
      </div>
      <div>
        {!savedToken && (
          <div className="containerButton">
            <Link to="/connexion">
              <ConnexionButton />
            </Link>
          </div>
        )}
        <Link to="#hautNavBar" className="basDePageLink">
          <p className="hautPage"> Revenir en haut de page </p>
        </Link>
      </div>
    </div>
  );
};
export default Welcome;
