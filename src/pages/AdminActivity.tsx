import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Admin.css";
import { Activity } from "./Main";

let allActivity: Activity[] = [];

const AdminActivity = () => {
  // Ajout du navigate
  const navigate = useNavigate();

  const [validateState, setValidateState] = useState<string>();
  const [Activity, setActivity] = useState<Activity[]>([]);
  const booleanFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(
      "--------------setValidateState(e.currentTarget.value)",
      e.currentTarget.value
    );
    setValidateState(e.currentTarget.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/activity", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        console.log("mes activites", res.data);
        allActivity = res.data;
        setActivity(res.data);
        console.log("mes  activités dans le state", Activity);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  }, []);

  const handleCheck = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log("handlecheckValue", e.currentTarget.value);
    setValidateState(e.currentTarget.value);
  };
//   axios
//     .patch(
//       `http://localhost:8080/api/activity/`,
//       {
//         validate: validateState,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
//         },
//       }
//     )
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);

//       if (error.response.data.statusCode === 401) {
//         localStorage.removeItem("accesstoken");
//         navigate("/connexion");
//       }
//     });
  const handleDeleteli = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    if (window.confirm("Veux-tu vraiment supprimer cette activité?")) {
      axios
        .delete(`http://localhost:8080/api/activity/${e.currentTarget.value}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        })
        .then((response) => {
          console.log(response);
          window.location.reload();
          // navigate('/main');
        })
        .catch((error) => {
          console.log("tu ne peux pas poster", error);
          if (error.response.data.statusCode === 401) {
            localStorage.removeItem("accesstoken");
            navigate("/connexion");
          }
        });
    }
  };
  console.log("------------Activity", Activity);
  let mesActivitésFilter: any = [];
  if (Activity) {
    for (let i = 0; i < Activity.length; i++) {
      if (Activity[i].validate.toString() === validateState) {
        mesActivitésFilter.push(Activity[i]);
        console.log("+++++++++++++++++validateState boucle", validateState);
        console.log(
          "+++++++++++++++++Activity[i]",
          Activity[i].validate.toString()
        );
        console.log(
          "-----------------mesActivitésFilter après boucle",
          mesActivitésFilter
        );
      }
    }
  }

  return (
    <div className="container-food">
      {/* <select
        name="food"
        id="foodAdmin"
        className="htmlForm-label select"
        // value={weightState}
        onChange={booleanFunction}
      >
        <option key={uuidv4()} value="">
          Sélectionner une valeur
        </option>
        <option key={uuidv4()} value="true">
          true
        </option>
        <option key={uuidv4()} value="false">
          false
        </option>
      </select> */}
      <div className="triFood">
        <h2>Selectionne les activités a afficher</h2>
        <br />
        <div className="checkbox-container">
          <div className="checkbox">
            <input
              type="radio"
              id="trueRadio"
              name="select"
              value="true"
              onClick={handleCheck}
            />
            <label htmlFor="true">True</label>
          </div>

          <div className="checkbox">
            <input
              type="radio"
              id="falseRadio"
              name="select"
              value="false"
              onClick={handleCheck}
            />
            <label htmlFor="false">False</label>
          </div>
          <div className="checkbox">
            <input
              type="radio"
              id="allRadio"
              name="select"
              value="all"
              onClick={handleCheck}
            />
            <label htmlFor="all">All</label>
          </div>
        </div>
      </div>
      <ul className="list-food">
        {validateState === "true" || validateState === "false"
          ? Activity.filter((food) =>
              food.validate.toString().includes(`${validateState}`)
            ).map((foodfiltered) => (
              <li key={uuidv4()}>
                {foodfiltered.name}
                <select
                  name="food"
                  id="foodAdmin"
                  className="htmlForm-label select"
                  // value={weightState}
                  onChange={booleanFunction}
                >
                  {foodfiltered.validate === true ? (
                    <option key={uuidv4()} value="true" selected>
                      true
                    </option>
                  ) : (
                    <option key={uuidv4()} value="true">
                      true
                    </option>
                  )}
                  {foodfiltered.validate === false ? (
                    <option key={uuidv4()} value="false" selected>
                      False
                    </option>
                  ) : (
                    <option key={uuidv4()} value="false">
                      False
                    </option>
                  )}
                </select>
                <button
                  className="buttonDeleteAliment"
                  onClick={handleDeleteli}
                  value={foodfiltered.id}
                >
                  <span className="">❌</span>
                </button>
              </li>
            ))
          : Activity.map((activite) => (
              <li key={uuidv4()}>
                {activite.name}
                <select
                  name="food"
                  id="foodAdmin"
                  className="htmlForm-label select"
                  // value={weightState}
                  onChange={booleanFunction}
                >
                  {activite.validate === true ? (
                    <option key={uuidv4()} value="true" selected>
                      true
                    </option>
                  ) : (
                    <option key={uuidv4()} value="true">
                      true
                    </option>
                  )}
                  {activite.validate === false ? (
                    <option key={uuidv4()} value="false" selected>
                      False
                    </option>
                  ) : (
                    <option key={uuidv4()} value="false">
                      False
                    </option>
                  )}
                </select>
                <button
                  className="buttonDeleteAliment"
                  onClick={handleDeleteli}
                  value={activite.id}
                >
                  <span className="">❌</span>
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
};
export default AdminActivity;
