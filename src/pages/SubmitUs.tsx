import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SubmitUs.css";

const SubmitUs = () => {
  const nomElement = useRef<HTMLInputElement>(null);
  const calorieElement = useRef<HTMLInputElement>(null);
  const lipidesElement = useRef<HTMLInputElement>(null);
  const glucidesElement = useRef<HTMLInputElement>(null);
  const proteinesElement = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const activiteeElement = useRef<HTMLInputElement>(null);

  const consoKalElement = useRef<HTMLInputElement>(null);

  const handleSubmitForm1 = (e: FormEvent) => {
    e.preventDefault();
    console.log("button form clicked");
    console.log(nomElement.current?.value);
    console.log(calorieElement.current?.value);
    console.log(lipidesElement.current?.value);
    console.log(glucidesElement.current?.value);
    console.log(proteinesElement.current?.value);

    axios
      .post(
        `http://localhost:8080/api/foods`,
        {
          name: nomElement.current?.value,
          nombre_calories: calorieElement.current?.value
            ? Math.abs(Number(calorieElement.current?.value)).toString()
            : calorieElement.current?.value,
          lipides: lipidesElement.current?.value
            ? Math.abs(Number(lipidesElement.current?.value)).toString()
            : lipidesElement.current?.value,
          glucides: glucidesElement.current?.value
            ? Math.abs(Number(glucidesElement.current?.value)).toString()
            : glucidesElement.current?.value,

          // glucidesElement.current?.value,
          proteines: proteinesElement.current?.value
            ? Math.abs(Number(proteinesElement.current?.value)).toString()
            : proteinesElement.current?.value,
          validate: false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        setMessage(
          "Aliment ajouté avec succès. Merci d attendre la validation d un administeur"
        );
        setTimeout(() => {
          navigate("/main");
        }, 0);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem("accesstoken");
          navigate("/connexion");
        }
      });
  };

  const handleSubmitForm2 = (e: FormEvent) => {
    e.preventDefault();
    console.log("button form clicked");
    console.log(activiteeElement?.current?.value);
    console.log(consoKalElement?.current?.value);

    axios
      .post(
        `http://localhost:8080/api/activity`,
        {
          // on recupere les inputs
          name: activiteeElement?.current?.value,
          conso_cal_1h: consoKalElement?.current?.value
            ? Math.abs(Number(consoKalElement?.current?.value)).toString()
            : consoKalElement?.current?.value,
          // on rentre en brut pour ne pas afficher dans le front directement
          // attente validation Admin
          validate: false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        setMessage(
          "Activité ajouté avec succès. Merci d attendre la validation d un administeur"
        );
        setTimeout(() => {
          navigate("/main");
        }, 0);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem("accesstoken");
          navigate("/connexion");
        }
      });
  };

  return (
    <div className="App">
      {/* <h2>Soumettez nous un aliment</h2> */}
      <div>
        <h2 className="p-5 text-center title-submit">
          Formulaire pour soumettre un aliment ou une activité
        </h2>
      </div>

      {/*<form onSubmit={(e) =>{handleSubmitForm(e)}}>*/}
      <form className="w-50 m-auto " onSubmit={handleSubmitForm1}>
        <div className="form-floating mb-3 d-flex justify-content-center">
          <input
            type="text"
            className="form-control text-submit"
            id="nameAliment"
            ref={nomElement}
            required
          />
          <label htmlFor="nameAliment " className="label-submit">
            Nom de l'aliment
          </label>
        </div>

        <div className="form-floating mb-3 d-flex justify-content-center">
          <input
            type="number"
            className="form-control text-submit "
            id="calorieAliment"
            ref={calorieElement}
            required
          />
          <label htmlFor="calorieAliment " className="label-submit">
            Nombre de calories
          </label>
        </div>

        <div className="form-floating mb-3 d-flex justify-content-center">
          <input
            type="number"
            className="form-control text-submit"
            id="lipidesAliment"
            ref={lipidesElement}
            required
          />
          <label htmlFor="lipidesAliment" className="label-submit">
            Nombre de lipides
          </label>
        </div>

        <div className="form-floating mb-3 d-flex justify-content-center">
          <input
            type="number"
            className="form-control text-submit"
            id="glucidesAliment"
            ref={glucidesElement}
            required
          />
          <label htmlFor="ProteinesAliment" className="label-submit">
            Nombre de glucides
          </label>
        </div>

        <div className="form-floating mb-3 d-flex justify-content-center">
          <input
            type="number"
            className="form-control text-submit"
            id="ProteinesAliment"
            ref={proteinesElement}
            required
          />
          <label htmlFor="glucidesAliment" className="label-submit">
            Nombre de proteines
          </label>
        </div>
        <div className="form-floating mb-3 d-flex justify-content-center">
          <button
            className="mt-3 btn btn-success btn inscription mb-4"
            type="submit"
          >
            soumettre un aliment
          </button>
        </div>

        {/* Soummettre activitée */}
      </form>
      {/* <h2>Soumettre une activité</h2> */}
      <form className="w-50 m-auto" onSubmit={handleSubmitForm2}>
        <div className="form-floating mb-3 d-flex justify-content-center">
          <input
            type="text"
            className="form-control text-submit"
            id="nameAliment"
            ref={activiteeElement}
          />
          <label className="label-submit" htmlFor="nameAliment">
            Nom de l'activité
          </label>
        </div>
        <div className="form-floating mb-3 d-flex justify-content-center">
          <input
            type="number"
            className="form-control text-submit"
            id="calorieAliment"
            ref={consoKalElement}
          />
          <label className="label-submit" htmlFor="calorieAliment">
            Calories consomées / heures
          </label>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="mt-3 btn btn-success btn inscription mb-4"
            style={{ margin: "0" }}
            type="submit"
          >
            soumettre une activité
          </button>
        </div>
      </form>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SubmitUs;
