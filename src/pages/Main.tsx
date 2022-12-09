import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Main.css";
import axios from "axios";
import PlusAddButton from "../components/PlusAddButton";
import { Link } from "react-router-dom";

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
}
// element de parametrage du graphique
ChartJS.register(ArcElement, Tooltip);
const calorieTotal = 2500;
const calorieEnCour = 1350;

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
  let userSearch = displayUser.find(
    (user) => user.firstname.toLocaleLowerCase() === "jack"
  );
  console.log("Recherche utilisateur par le firstname", userSearch);
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
        label: "Kcal",
        data: [`${calorieEnCour}`, `${calorieTotal - calorieEnCour}`],
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
        label: "Kcal",
        data: [`${calorieEnCour}`, `${calorieTotal}`],
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
        label: "Kcal",
        data: [`${calorieEnCour}`, `${calorieTotal}`],
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
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem, ipsum dolor sit.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem.</li>
                <li>Lorem, ipsum.</li>
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
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem, ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem.</li>
                <li>Lorem, ipsum.</li>
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
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem.</li>
                <li>Lorem, ipsum.</li>
                <Link className="buttonAdd" to="/diner">
                  <PlusAddButton />
                </Link>
                <span className = "textAjout"> Ajouter un aliment</span>
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
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem.</li>
                <li>Lorem, ipsum.</li>
                <Link className="buttonAdd" to="/collation">
                  <PlusAddButton />
                </Link>
                <span className = "textAjout"> Ajouter un aliment</span>
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
              Exercice
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
                <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem.</li>
                <li>Lorem, ipsum.</li>
                <Link className="buttonAdd" to="/exercices">
                  <PlusAddButton />
                </Link>
                <span className = "textAjout"> Ajouter un aliment</span>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
