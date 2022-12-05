import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Main.css";

ChartJS.register(ArcElement, Tooltip);
const calorieTotal = 2500;
const calorieEnCour = 1350;
const dataCal = {
  labels: ["Calories consommé", "Total calories restant"],
  datasets: [
    {
      label: "Kcal",
      data: [`${calorieEnCour}`, `${calorieTotal}`],
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
        "rgba(0, 0, 0, 0.2)",
        // "rgba(255, 206, 86, 1)",
        // "rgba(75, 192, 192, 1)",
        // "rgba(153, 102, 255, 1)",
        // "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 0,
    },
  ],
};
const dataLip = {
  labels: ["Consommé", "Restant"],
  datasets: [
    {
      label: "Kcal",
      data: [`${calorieEnCour}`, `${calorieTotal}`],
      backgroundColor: [
        "rgba(252, 255, 50, 1)",
        "rgba(0, 0, 0, 0.5)",
        // "rgba(255, 206, 86, 1)",
        // "rgba(75, 192, 192, 1)",
        // "rgba(153, 102, 255, 1)",
        // "rgba(255, 159, 64, 1)",
      ],
      borderColor: [
        "rgba(252, 255, 50, 1)",
        "rgba(0, 0, 0, 0.2)",
        // "rgba(255, 206, 86, 1)",
        // "rgba(75, 192, 192, 1)",
        // "rgba(153, 102, 255, 1)",
        // "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 0,
    },
  ],
};
const dataProt = {
  labels: ["consommé", "restant"],
  datasets: [
    {
      label: "Kcal",
      data: [`${calorieEnCour}`, `${calorieTotal}`],
      backgroundColor: [
        "rgba(255, 99, 95, 1)",
        "rgba(0, 0, 0, 0.5)",
        // "rgba(255, 206, 86, 1)",
        // "rgba(75, 192, 192, 1)",
        // "rgba(153, 102, 255, 1)",
        // "rgba(255, 159, 64, 1)",
      ],
      borderColor: [
        "rgba(255, 99, 95, 1)",
        "rgba(0, 0, 0, 0.2)",
        // "rgba(255, 206, 86, 1)",
        // "rgba(75, 192, 192, 1)",
        // "rgba(153, 102, 255, 1)",
        // "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 0,
    },
  ],
};
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
        "rgba(0, 0, 0, 0.2)",
        // "rgba(255, 206, 86, 1)",
        // "rgba(75, 192, 192, 1)",
        // "rgba(153, 102, 255, 1)",
        // "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 0,
    },
  ],
};
const Main = () => {
  return (
    <div>
      <img
        id="onglet"
        src={process.env.PUBLIC_URL + `/assets/dashboard.svg`}
        alt=""
      />
      <div className="container-chart">
        <div className="container-chartCal text-center">
          <p className="title-chart">Calories</p>
          <section className="donutCal">
            <Doughnut data={dataCal} />
          </section>
        </div>
        <div className="d-flex container-nutri">
          <section className="donutProt text-center">
            <p className="title-chart">Protein</p>
            <Doughnut data={dataProt} />
          </section>
          <section className="donutGlu text-center ">
            <p className="title-chart">Glucide</p>
            <Doughnut data={dataGlu} />
          </section>
          <section className="donutLip text-center">
            <p className="title-chart">Lipide</p>
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
              Petit dej
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body"></div>
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
            <div className="accordion-body"></div>
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
            <div className="accordion-body"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
