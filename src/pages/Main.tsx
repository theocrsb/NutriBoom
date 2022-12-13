import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Main.css";
import axios from "axios";
import PlusAddButton from "../components/PlusAddButton";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { type } from "os";

//  creation des interfaces pour le typage des differentes table de la base de donnée
interface User {
  id?: string;
  lastname?: string;
  firstname: string;
  age: number;
  weight: number;
  gender: string;
  email: string;
  ratio?: string;
  height: string;
  role: UserRole;
  eatenfood: EatenFood[];
  exercices: Exercice[];
}
interface UserRole {
  id: number;
  label: string;
}
interface EatenFood {
  createdAt: string;
  food: Food;
  id: number;
  name: string;
  quantity: number;
  type: Type;
}
interface Type {
  id: number;
  name: string;
}
interface Food {
  glucides: number;
  id: number;
  lipides: number;
  name: string;
  nombre_calories: number;
  proteines: number;
}
interface Exercice {
  id: number;
  activity: Activity;
  createdAt: string;
  time: number;
}
interface Activity {
  id: number;
  name: string;
  conso_cal_1h: number;
}
//  interface pour l'objet du token payload decodé
interface PayloadToken {
  exp: number;
  iat: number;
  id: string;
  role: string;
  username: string;
}
// element de parametrage du graphique
ChartJS.register(ArcElement, Tooltip);
let calorieEnCour = 0;

const Main = () => {
  // Fonction permettant d'obtenir la valeur journaliere  des calories à consommer
  const convertToCal = (
    sexe: string,
    age: number,
    poids: number,
    taille: number,
    ratio: number
  ) => {
    if (sexe === "homme") {
      let calculPoids = 13.7516 * poids;
      let calculTaille = 500.33 * taille;
      let calculAge = 6.755 * age;
      let result = (calculPoids + calculTaille - calculAge + 66.473) * ratio;
      console.log("poids", calculPoids);
      console.log("taille", calculTaille);
      console.log("age", calculAge);
      console.log("ratio", ratio);

      console.log("homme nb de calorie:", result);
      return result;
    } else if (sexe === "femme") {
      let calculPoids = 9.5634 * poids;
      let calculTaille = 184.96 * taille;
      let calculAge = 4.6756 * age;
      let result = (calculPoids + calculTaille - calculAge + 665.0955) * ratio;
      console.log("poids", calculPoids);
      console.log("taille", calculTaille);
      console.log("age", calculAge);
      console.log("ratio", ratio);

      console.log("femme nb de calorie:", result);
      return result;
    } else {
      console.log("le sexe de l'utilisateur n' as pas été determiné");
    }
  };
  //  recuperation du token User
  let recupToken = localStorage.getItem("accesstoken");

  console.log("voici le token ", recupToken);

  // Usetate pour recuperer dynamiquement la liste de tout les utilisateurs
  const [displayUser, setDisplayUser] = useState<User[]>([]);
  // UseEffect pour recuperer le tableau de tout les utilisateurs
  useEffect(() => {
    axios.get("http://localhost:8080/api/users").then((response) => {
      console.log("response", response);
      setDisplayUser(response.data);
    });
  }, []);
  console.log(displayUser);
  // Recherche d'un utilisateur via la method find

  const searchUser = () => {
    if (recupToken) {
      let tokenDecoded: PayloadToken = jwt_decode(recupToken);
      console.log(tokenDecoded.username);
      return displayUser.find(
        (user) => user.email.toLocaleLowerCase() === tokenDecoded.username
      );
    }
  };
  let userSearch = searchUser();
  console.log("Recherche utilisateur par le mail", userSearch);
  //  application de la fonction de calcul des calories a l'utisateur qu'on a recuperé
  let resultUserCal = userSearch
    ? convertToCal(
        userSearch.gender,
        userSearch.age,
        Number(userSearch.weight),
        Number(userSearch.height),
        Number(userSearch.ratio)
      )
    : null;
  // calcul du  nbre de calorie en cour de consomation pour ce meme utilisateur
  let consoCal = userSearch?.eatenfood;
  console.log("tableau de consomation user", consoCal);
  // recuperation des calories consommé afin de les  stocker dans un tableau et les additionner par la suite
  let tabConsoCal = consoCal?.map((aliment) => aliment.food.nombre_calories);
  console.log("voici le tableau des calories consommé", tabConsoCal);
  //  addition de ces valeurs via une boucle for
  let sumConsoCal = 0;
  if (tabConsoCal) {
    for (let i = 0; i < tabConsoCal.length; i++) {
      sumConsoCal += tabConsoCal[i];
    }
    console.log("resultat de la consomation de calorie =", sumConsoCal);
  }
  calorieEnCour = sumConsoCal;
  // calcul des besoins proteine,glucide,lipide journalier
  // glucide
  let resultUserGlu;
  if (resultUserCal) {
    resultUserGlu = ((resultUserCal / 100) * 50) / 4;
    console.log("resultat des besoins en glucide =", resultUserGlu);
  }
  // proteine
  let resultUserProt;
  if (resultUserCal) {
    resultUserProt = ((resultUserCal / 100) * 15) / 4;
    console.log("resultat des besoins en proteine =", resultUserProt);
  }
  // lipide
  let resultUserLip;
  if (resultUserCal) {
    resultUserLip = ((resultUserCal / 100) * 35) / 9;
    console.log("resultat des besoins en lipide =", resultUserLip);
  }

  //  on refait la meme logique pour calculer la conso journaliere en proteine ,lipide,glucide
  // proteine
  let tabConsoProt = consoCal?.map((aliment) => aliment.food.proteines);
  console.log("voici le tableau des proteines consommé", tabConsoProt);
  //  addition de ces valeurs via une boucle for
  let sumConsoProt = 0;
  if (tabConsoProt) {
    for (let i = 0; i < tabConsoProt.length; i++) {
      sumConsoProt += tabConsoProt[i];
    }
    console.log("resultat de la consomation de proteine =", sumConsoProt);
  }
  // lipide
  let tabConsoLip = consoCal?.map((aliment) => aliment.food.lipides);
  console.log("voici le tableau des lipides consommé", tabConsoLip);
  //  addition de ces valeurs via une boucle for
  let sumConsoLip = 0;
  if (tabConsoLip) {
    for (let i = 0; i < tabConsoLip.length; i++) {
      sumConsoLip += tabConsoLip[i];
    }
    console.log("resultat de la consomation de lipide =", sumConsoLip);
  }
  //  glucide
  let tabConsoGlu = consoCal?.map((aliment) => aliment.food.glucides);
  console.log("voici le tableau des glucides consommé", tabConsoGlu);
  //  addition de ces valeurs via une boucle for
  let sumConsoGlu = 0;
  if (tabConsoGlu) {
    for (let i = 0; i < tabConsoGlu.length; i++) {
      sumConsoGlu += tabConsoGlu[i];
    }
    console.log("resultat de la consomation de glucide =", sumConsoGlu);
  }
  //  Recuperation du repas et des aliments consommé correspondant
  // !!!!!!!! ATTENTION VERIFIER BIEN QUE LES  ID DE VOS TYPES DE REPAS CORRESPONDENT AVEC CELLES MISE EN PLACE ICI!!!!!!!!!!!!!!!!!!!!!!!
  // petit dejeuner du jour
  let tabPetitDej = userSearch?.eatenfood.filter(
    // filtre en fonction de l'id et de la date (jour/mois/année)
    (typeDej) =>
      typeDej.type.id === 2 &&
      new Date(`${typeDej.createdAt}`).getDate() === new Date().getDate() &&
      new Date(`${typeDej.createdAt}`).getMonth() === new Date().getMonth() &&
      new Date(`${typeDej.createdAt}`).getFullYear() ===
        new Date().getFullYear()
  );
  const valeurJour = new Date("2022-12-12T20:29:21.759Z").getDate();
  console.log("tableau de tout les petits dej ", tabPetitDej);
  console.log("jour", valeurJour);
  console.log("mois", new Date("2022-12-12T20:29:21.759Z").getMonth());
  console.log("année", new Date().getFullYear());
  // Dejeuner du jour
  let tabDej = userSearch?.eatenfood.filter(
    // filtre en fonction de l'id et de la date (jour/mois/année)
    (typeDej) =>
      typeDej.type.id === 4 &&
      new Date(`${typeDej.createdAt}`).getDate() === new Date().getDate() &&
      new Date(`${typeDej.createdAt}`).getMonth() === new Date().getMonth() &&
      new Date(`${typeDej.createdAt}`).getFullYear() ===
        new Date().getFullYear()
  );
  let tabDiner = userSearch?.eatenfood.filter(
    // filtre en fonction de l'id et de la date (jour/mois/année)
    (typeDej) =>
      typeDej.type.id === 3 &&
      new Date(`${typeDej.createdAt}`).getDate() === new Date().getDate() &&
      new Date(`${typeDej.createdAt}`).getMonth() === new Date().getMonth() &&
      new Date(`${typeDej.createdAt}`).getFullYear() ===
        new Date().getFullYear()
  );
  let tabCollation = userSearch?.eatenfood.filter(
    // filtre en fonction de l'id et de la date (jour/mois/année)
    (typeDej) =>
      typeDej.type.id === 1 &&
      new Date(`${typeDej.createdAt}`).getDate() === new Date().getDate() &&
      new Date(`${typeDej.createdAt}`).getMonth() === new Date().getMonth() &&
      new Date(`${typeDej.createdAt}`).getFullYear() ===
        new Date().getFullYear()
  );

  // Gaphique calories
  const dataCal = {
    labels: ["Calories consommé", "Total calories restant"],
    datasets: [
      {
        label: "Kcal",
        // valeur affiché sur le graphique
        data: [
          `${calorieEnCour}`,
          `${(resultUserCal ? Math.floor(resultUserCal) : 0) - calorieEnCour}`,
        ],
        backgroundColor: [
          "rgba(97, 255, 51, 1)",
          "rgba(0, 0, 0, 0.5)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(97, 255, 51, 1)",
          "rgba(0, 0, 0, 0.5)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  // Gaphique lipide
  const dataLip = {
    labels: ["Consommé", "Restant"],
    datasets: [
      {
        label: "g",
        data: [
          `${sumConsoLip}`,
          `${(resultUserLip ? Math.floor(resultUserLip) : 0) - sumConsoLip}`,
        ],
        backgroundColor: ["rgba(252, 255, 50, 1)", "rgba(0, 0, 0, 0.5)"],
        borderColor: ["rgba(252, 255, 50, 1)", "rgba(0, 0, 0, 0.5)"],
        borderWidth: 1,
      },
    ],
  };
  // Gaphique Proteine
  const dataProt = {
    labels: ["consommé", "restant"],
    datasets: [
      {
        label: "g",
        data: [
          `${sumConsoProt}`,
          `${(resultUserProt ? Math.floor(resultUserProt) : 0) - sumConsoProt}`,
        ],
        backgroundColor: ["rgba(255, 99, 95, 1)", "rgba(0, 0, 0, 0.5)"],
        borderColor: ["rgba(255, 99, 95, 1)", "rgba(0, 0, 0, 0.5)"],
        borderWidth: 1,
      },
    ],
  };
  // Gaphique Glucide
  const dataGlu = {
    labels: ["Consommé", "Restant"],
    datasets: [
      {
        label: "g",
        data: [
          `${sumConsoGlu}`,
          `${(resultUserGlu ? Math.floor(resultUserGlu) : 0) - sumConsoGlu}`,
        ],
        backgroundColor: [
          "rgba(51, 181, 255, 1)",
          "rgba(0, 0, 0, 0.5)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(51, 181, 255, 1)",
          "rgba(0, 0, 0, 0.5)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <img
        id="onglet"
        src={process.env.PUBLIC_URL + `/assets/dashboard.svg`}
        alt=""
      />

      <div className="container-chart">
        <div className="container-chartCal text-center">
          <p>Calories</p>

          <section id="donutCal">
            <div className="user-recap">
              <h2>
                {calorieEnCour} /{resultUserCal ? Math.floor(resultUserCal) : 0}
              </h2>
              <p id="kcal">Kcal</p>
            </div>
            <Doughnut data={dataCal} />
          </section>
        </div>
        <div className="d-flex container-nutri">
          <section className="donutProt text-center">
            <p>Protein</p>
            <Doughnut data={dataProt} />
          </section>
          <section className="donutGlu text-center ">
            <p>Glucide</p>
            <Doughnut data={dataGlu} />
          </section>
          <section className="donutLip text-center">
            <p>Lipide</p>
            <Doughnut data={dataLip} />
          </section>
        </div>
      </div>
      <div className="accordion " id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header text-center" id="headingOne">
            <button
              className="accordion-button "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Petit dejeuner
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <ul className="petit-dej">
                {tabPetitDej?.map((aliment) => (
                  <li key={uuidv4()}>
                    [{aliment.name}] {aliment.food.name}
                  </li>
                ))}
                {/* <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem, ipsum dolor sit.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem.</li>
                <li>Lorem, ipsum.</li> */}
                <Link className="buttonAdd" to="/petitdejeuner">
                  <PlusAddButton />
                </Link>
                <span className="textAjout"> Ajouter un aliment</span>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header text-center" id="headingTwo">
            <button
              className="accordion-button collapsed "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Dejeuner
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <ul className="petit-dej">
                {tabDej?.map((aliment) => (
                  <li key={uuidv4()}>
                    [{aliment.name}] {aliment.food.name}
                  </li>
                ))}
                {/* <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem, ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem.</li>
                <li>Lorem, ipsum.</li> */}
                {}
                <Link className="buttonAdd" to="/dejeuner">
                  <PlusAddButton />
                </Link>
                <span className="textAjout"> Ajouter un aliment</span>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header text-center" id="headingThree">
            <button
              className="accordion-button collapsed "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Diner
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <ul className="petit-dej">
                {tabDiner?.map((aliment) => (
                  <li key={uuidv4()}>
                    [{aliment.name}] {aliment.food.name}
                  </li>
                ))}
                {/* <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem.</li>
                <li>Lorem, ipsum.</li> */}
                <Link className="buttonAdd" to="/diner">
                  <PlusAddButton />
                </Link>
                <span className="textAjout"> Ajouter un aliment</span>
              </ul>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header text-center" id="headingFour">
            <button
              className="accordion-button collapsed "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Collation
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <ul className="petit-dej">
                {tabCollation?.map((aliment) => (
                  <li key={uuidv4()}>
                    [{aliment.name}] {aliment.food.name}
                  </li>
                ))}
                {/* <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem, ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem.</li>
                <li>Lorem, ipsum.</li> */}
                <Link className="buttonAdd" to="/petitdejeuner">
                  <PlusAddButton />
                </Link>
                <span className="textAjout"> Ajouter un aliment</span>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header text-center" id="headingFive">
            <button
              className="accordion-button collapsed "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Activité Physique
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <ul className="petit-dej">
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem, ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem.</li>
                <li>Lorem, ipsum.</li>
                <Link className="buttonAdd" to="/petitdejeuner">
                  <PlusAddButton />
                </Link>
                <span className="textAjout"> Ajouter une activitée</span>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
