import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Food } from "./Main";
import { User } from "./Main";
import { UserRole } from "./Main";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { FcCheckmark } from "react-icons/fc";
let allFoods: Food[] = [];
let convertValue: boolean;
const AdminFoods = () => {
  // Ajout du navigate
  const navigate = useNavigate();
  const [updateModerate, setUpdateModerate] = useState<string>();
  const [optionState, setOptionState] = useState<string>("true");
  // const updateModerate = useRef<HTMLSelectElement>(null);
  const [validateState, setValidateState] = useState<string>();
  const [mesFoods, setMesFoods] = useState<Food[]>([]);

  // const booleanFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setValidateState(e.currentTarget.value);
  // };

  const handleCheck = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setValidateState(e.currentTarget.value);
  };

  const ModerateFunction = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    // let valeurConvertieNombre = Number(e.currentTarget.value);

    if (e.currentTarget.value) {
      if (e.currentTarget.value === "true") {
        convertValue = true;
      } else if (e.currentTarget.value === "false") {
        convertValue = false;
      }
    }
    console.log("valeur de convert value avant set update", convertValue);
    console.log("valeur de update moderate avant set update", updateModerate);
    // setUpdateModerate(convertValue);
    setOptionState(e.currentTarget.value);
  };
  // useEffect(() => {
  //   setUpdateModerate(convertValue);
  //   console.log("valeur dans le useeffect de  update moderate", updateModerate);
  // }, [optionState]);

  // let convertValue: boolean;

  // let valueSelect = updateModerate.current?.value;
  // console.log("value", valueSelect);

  // if (value) {
  //   if (value === "true") {
  //     convertValue = true;
  //   } else if (value === "false") {
  //     convertValue = false;
  //   }
  // }
  // console.log("valeur converti en boolean", convertValue);

  // console.log("update Moderate valeur", updateModerate.current?.value);
  const fonctionTest = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(
      "voici le resultat du test valeur du state update moderate",
      updateModerate
    );
    console.log("valeur converti en boolean", convertValue);
    // console.log("value dans le update", valueSelect);
  };

  const getFoods = async () => {
    await axios
      .get("http://localhost:8080/api/foods", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        console.log("mes foods", res.data);
        allFoods = res.data;
        setMesFoods(res.data);
        console.log("mes  dansfoods le state", mesFoods);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  };
  useEffect(() => {
    getFoods();
    // let response = await axios
    //     .get("http://localhost:8080/api/foods", {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    //       },
    //     })
    //     .then((res) => {
    //       console.log("mes foods", res.data);
    //       allFoods = res.data;
    //       setMesFoods(res.data);
    //       console.log("mes  dansfoods le state", mesFoods);
    //     })
    //     .catch((error) => {
    //       console.log("something went wrong", error);
    //     });
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("update moderate", updateModerate);
    setOptionState(e.currentTarget.value);

    // console.log("what is this ? ", e.target);
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

    axios
      .patch(
        `http://localhost:8080/api/foods/${e.currentTarget.value}`,
        {
          validate: convertValue,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
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
        console.log("id du food a patch dans le catch", e.currentTarget.value);
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
          ? mesFoods
              .filter((food) =>
                food.validate.toString().includes(validateState)
              )
              .map((foodfiltered) => (
                <li key={uuidv4()}>
                  {foodfiltered.name}

                  <select
                    name="food"
                    id="foodAdmin"
                    className="htmlForm-label select"
                    // defaultValue={foodfiltered.validate.toString()}
                    onChange={(e) => {
                      const selectedModerate = e.currentTarget.value;
                      setUpdateModerate(selectedModerate);
                      console.log("voici selected moderate", selectedModerate);
                    }}
                    // ref={updateModerate}
                    // onChange={handleChange}
                  >
                    <option key={uuidv4()} value="true">
                      Affiché
                    </option>

                    <option key={uuidv4()} value="false">
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

                  <button value={foodfiltered.id} onClick={updateFunction}>
                    <FcCheckmark />
                  </button>
                </li>
              ))
          : mesFoods.map((food) => (
              <li key={uuidv4()}>
                {food.name}
                <select
                  name="food"
                  id="foodAdmin"
                  className="htmlForm-label select"
                  // defaultValue={food.validate.toString()}
                  // onChange={handleChange}
                  onChange={(e) => {
                    const selectedModerate = e.currentTarget.value;
                    setUpdateModerate(selectedModerate);
                    console.log("voici selected moderate", selectedModerate);
                  }}
                  // ref={updateModerate}
                >
                  <option key={uuidv4()} value="true">
                    Affiché
                  </option>

                  <option key={uuidv4()} value="false">
                    Masqué
                  </option>
                </select>
                <button
                  className="buttonDeleteAliment"
                  onClick={handleDeleteli}
                  value={food.id}
                >
                  <span className="">❌</span>
                </button>
                <button style={{ color: "red" }} onClick={fonctionTest}>
                  test update
                </button>
                <button value={food.id} onClick={updateFunction}>
                  <FcCheckmark />
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default AdminFoods;
