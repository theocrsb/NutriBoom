import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Food } from "./Main";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { ImEyeMinus } from "react-icons/im";
import { ImEyePlus } from "react-icons/im";
import { ImEye } from "react-icons/im";
// let convertValue: boolean;
import { AuthContext } from "../contexts/Auth-context";

let allFoods: Food[] = [];
const AdminFoods = () => {
  // Ajout du navigate
  const navigate = useNavigate();

  const { savedToken } = useContext(AuthContext);
  //  Vérification dans la page de la validité du token
  const { valideTimeToken } = useContext(AuthContext);

  const [updateModerate, setUpdateModerate] = useState<boolean>();
  const [validateState, setValidateState] = useState<string>();
  const [mesFoods, setMesFoods] = useState<Food[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/foods/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        console.log("mes foods", res.data);
        setMesFoods(res.data);
        console.log("mes  aliments dans mesfoods ", mesFoods);
      })
      .catch((error) => {
        console.log("something went wrong", error);
        localStorage.removeItem("accesstoken");
        window.location.reload();
      });
  }, []);
  const ModerateFunction = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    let convertValue;
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
    setUpdateModerate(convertValue);
  };
  const fonctionTest = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(
      "voici le resultat du test valeur du state update moderate",
      updateModerate
    );
  };
  const handleCheck = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setValidateState(e.currentTarget.value);
  };

  const handleDeleteli = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    if (window.confirm("Veux-tu vraiment supprimer cet aliment?")) {
      axios
        .delete(`http://localhost:8080/api/foods/${e.currentTarget.value}`, {
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
  const updateFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("cliké");
    console.log("id du Food a patch", e.currentTarget.value);
    console.log("update moderate", updateModerate);

    axios
      .patch(
        `http://localhost:8080/api/foods/${e.currentTarget.value}`,
        {
          validate: updateModerate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);

        console.log("patch ok!");

        alert("Modifications sauvegardées !");
      })
      .catch((error) => {
        console.log("tu est dans le catch error", error);
        alert(`${error.response.data.message}`);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem("accesstoken");
          navigate("/connexion");
        }
      });
  };

  let mesFoodsFilter = [];
  if (mesFoods) {
    for (let i = 0; i < mesFoods.length; i++) {
      if (mesFoods[i].validate.toString() === validateState) {
        mesFoodsFilter.push(mesFoods[i]);
      }
    }
  }

  return (
    <div className="container-food">
      <div className="triFood">
        <h2>Selectionne les aliments a afficher</h2>
        <br />
        <div className="checkbox-container">
          <div className="checkbox">
            <input
              className="form-check-input"
              type="radio"
              id="trueRadio"
              name="select"
              value="true"
              onClick={handleCheck}
            />
            <label className="form-check-label" htmlFor="true">
              Affiché
            </label>
          </div>

          <div className="checkbox">
            <input
              className="form-check-input"
              type="radio"
              id="falseRadio"
              name="select"
              value="false"
              onClick={handleCheck}
            />
            <label className="form-check-label" htmlFor="false">
              Masqué
            </label>
          </div>
          <div className="checkbox">
            <input
              className="form-check-input"
              type="radio"
              id="allRadio"
              name="select"
              value="all"
              defaultChecked
              onInput={handleCheck}
            />
            <label className="form-check-label" htmlFor="all">
              Tous
            </label>
          </div>
        </div>
      </div>

      {/* debut du UL */}

      <ul className="list-food">
        {validateState === "true" || validateState === "false"
          ? //  mesFoods
            //     .filter((food) =>
            //       food.validate.toString().includes(validateState)
            //     )
            mesFoodsFilter.map((foodfiltered, i) => (
              <li key={i}>
                {foodfiltered.validate === true ? (
                  <span style={{ color: "green" }}>visible</span>
                ) : (
                  <span style={{ color: "red" }}>invisible</span>
                )}
                {foodfiltered.name}

                <select
                  name="food"
                  id="foodAdmin"
                  className="htmlForm-label select"
                  defaultValue=""
                  onChange={ModerateFunction}
                >
                  <option
                    // key={i + 2}
                    value=""
                    disabled
                  >
                    Selectionner un choix
                  </option>
                  <option
                    // key={i + 1}
                    value={"true"}
                  >
                    Affiché
                  </option>

                  <option
                    // key={i + 2}
                    value="false"
                  >
                    Masqué
                  </option>
                </select>
                <button
                  className="buttonDeleteAliment"
                  onClick={handleDeleteli}
                  value={foodfiltered.id}
                >
                  <span className="">❌</span>
                </button>
                <button style={{ color: "red" }} onClick={fonctionTest}>
                  test update
                </button>

                {updateModerate === false || updateModerate === true ? (
                  updateModerate === true ? (
                    <button
                      className="buttonValidate"
                      value={foodfiltered.id}
                      onClick={updateFunction}
                    >
                      <ImEyePlus className="iconVisible" />
                    </button>
                  ) : (
                    <button
                      className="buttonValidate"
                      value={foodfiltered.id}
                      onClick={updateFunction}
                    >
                      <ImEyeMinus className="iconInvisible" />
                    </button>
                  )
                ) : (
                  <button
                    className="buttonValidate"
                    value={foodfiltered.id}
                    disabled
                    onClick={updateFunction}
                  >
                    <ImEye className="iconNeutre" />
                  </button>
                )}
              </li>
            ))
          : mesFoods.map((food, i) => (
              <li key={i}>
                {food.validate === true ? (
                  <span style={{ color: "green" }}>visible</span>
                ) : (
                  <span style={{ color: "red" }}>invisible</span>
                )}
                {food.name}
                <select
                  name="food"
                  id="foodAdmin"
                  className="htmlForm-label select"
                  defaultValue=""
                  onChange={ModerateFunction}
                >
                  <option
                    // key={i + 2}
                    value=""
                    disabled
                  >
                    Selectionner un choix
                  </option>
                  <option key={i + 1} value="true">
                    Affiché
                  </option>

                  <option key={i + 2} value="false">
                    Masqué
                  </option>
                </select>

                <button
                  key={i + 4}
                  className="buttonDeleteAliment"
                  onClick={handleDeleteli}
                  value={food.id}
                >
                  <span className="">❌</span>
                </button>
                <button style={{ color: "red" }} onClick={fonctionTest}>
                  test update
                </button>
                {updateModerate === false || updateModerate === true ? (
                  updateModerate === true ? (
                    <button
                      key={i + 5}
                      className="buttonValidate"
                      value={food.id}
                      onClick={updateFunction}
                    >
                      <ImEyePlus className="iconVisible" />
                    </button>
                  ) : (
                    <button
                      key={i + 6}
                      className="buttonValidate"
                      value={food.id}
                      onClick={updateFunction}
                    >
                      <ImEyeMinus className="iconInvisible" />
                    </button>
                  )
                ) : (
                  <button
                    key={i + 7}
                    className="buttonValidate"
                    value={food.id}
                    disabled
                    onClick={updateFunction}
                  >
                    <ImEye className="iconNeutre" />
                  </button>
                )}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default AdminFoods;
