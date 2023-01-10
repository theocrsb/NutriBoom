import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Admin.css";
import { Activity } from "./Main";
import { FcCheckmark } from "react-icons/fc";
let convertValue: boolean;
let allActivity: Activity[] = [];
let updateActivity: Activity;
const AdminActivity = () => {
  // Ajout du navigate
  const navigate = useNavigate();
  const [updateModerate, setUpdateModerate] = useState<string>();

  const [validateState, setValidateState] = useState<string>();
  const [Activity, setActivity] = useState<Activity[]>([]);
  // const booleanFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   console.log(
  //     "--------------setValidateState(e.currentTarget.value)",
  //     e.currentTarget.value
  //   );
  //   setValidateState(e.currentTarget.value);
  // };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/activity", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        console.log("mes activites", res.data);
        // allActivity = res.data;
        setActivity(res.data);
        console.log("mes  activités dans le state", Activity);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  }, []);

   const ModerateFunction = (e: React.SyntheticEvent<HTMLSelectElement>) => {
     if (e.currentTarget.value) {
       if (e.currentTarget.value === "true") {
         convertValue = true;
       } else if (e.currentTarget.value === "false") {
         convertValue = false;
       }
     }
     console.log(
       "value moderate fonction -------------------",
       e.currentTarget.value
     );
     setUpdateModerate(e.currentTarget.value);
   };
   const fonctionTest = (e: React.MouseEvent<HTMLButtonElement>) => {
     console.log(
       "voici le resultat du test valeur du state update moderate",
       updateModerate
     );
   };
  const handleCheck = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log("handlecheckValue", e.currentTarget.value);
    setValidateState(e.currentTarget.value);
  };
  // axios
  //   .patch(
  //     `http://localhost:8080/api/activity`,
  //     {
  //       validate: patchState,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
  //       },
  //     }
  //   )
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);

  //     if (error.response.data.statusCode === 401) {
  //       localStorage.removeItem("accesstoken");
  //       navigate("/connexion");
  //     }
  //   });
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
  // console.log("------------Activity", Activity);
  // let mesActivitésFilter: any = [];
  // if (Activity) {
  //   for (let i = 0; i < Activity.length; i++) {
  //     if (Activity[i].validate.toString() === validateState) {
  //       mesActivitésFilter.push(Activity[i]);
  //       console.log("+++++++++++++++++validateState boucle", validateState);
  //       console.log(
  //         "+++++++++++++++++Activity[i]",
  //         Activity[i].validate.toString()
  //       );
  //       console.log(
  //         "-----------------mesActivitésFilter après boucle",
  //         mesActivitésFilter
  //       );
  //     }
  //   }
  // }

  const updateFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  console.log (e.currentTarget.value);
    
    console.log("cliké");
    console.log("id de l'activité a patch", e.currentTarget.value);

    axios
      .patch(
        `http://localhost:8080/api/activity/${e.currentTarget.value}`,
        {
          // id: e.currentTarget.value,
          // updateActivity: { validate: validateState },
          validate: convertValue,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      )
      .then((response) => {
        console.log("___________________response", response);
        console.log(
          "___________________response.data.validate",
          response.data.validate
        );
        console.log(
          "id du user a patch dans le response",
          e.currentTarget.value
        );
        // setTimeout(() => {
        //   navigate("/main");
        // }, 1000);
        alert("Modifications sauvegardées !");
      })
      .catch((error) => {
        console.log(error);
        console.log(
          "id de l'activité à patch dans le catch",
          e.currentTarget.value
        );
        alert(`${error.response.data.message}`);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem("accesstoken");
          navigate("/connexion");
        }
      });
  };

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
          ? Activity.filter((acti) =>
              acti.validate.toString().includes(`${validateState}`)
            ).map((actifiltered, i) => (
              <li key={i}>
                {actifiltered.name}/{actifiltered.validate.toString()}
                <select
                  name="food"
                  id="foodAdmin"
                  className="htmlForm-label select"
                  defaultValue={actifiltered.validate.toString()}
                  // value={weightState}
                  onChange={ModerateFunction}
                >
                  {/* {actifiltered.validate === true ? ( */}
                  <option key={i + 1} value="true" selected>
                    Affiché
                  </option>
                  {/* ) : ( */}
                  <option key={i + 2} value="false">
                    Masqué
                  </option>
                  {/* )} */}
                  {/* {actifiltered.validate === false ? (
                    <option key={uuidv4()} value="false" selected>
                      False
                    </option>
                  ) : (
                    <option key={uuidv4()} value="false">
                      False
                    </option>
                  )} */}
                </select>
                <button
                  className="buttonDeleteAliment"
                  onClick={handleDeleteli}
                  value={actifiltered.id}
                >
                  <span className="">❌</span>
                </button>
                <button style={{ color: "red" }} onClick={fonctionTest}>
                  test update
                </button>
                <button value={actifiltered.id} onClick={updateFunction}>
                  <FcCheckmark />
                </button>
              </li>
            ))
          : Activity.map((activite, i) => (
              <li key={i}>
                {activite.name}
                <select
                  name="food"
                  id="foodAdmin"
                  className="htmlForm-label select"
                  defaultValue={activite.validate.toString()}
                  // value={weightState}
                  onChange={ModerateFunction}
                >
                  <option key={i + 1} value="true">
                    Affiché
                  </option>

                  <option key={i + 2} value="false">
                    Masqué
                  </option>
                </select>
                <button
                  className="buttonDeleteAliment"
                  onClick={handleDeleteli}
                  value={activite.id}
                >
                  <span className="">❌</span>
                </button>
                <button style={{ color: "red" }} onClick={fonctionTest}>
                  test update
                </button>
                <button value={activite.id} onClick={updateFunction}>
                  <FcCheckmark />
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
};
export default AdminActivity;
