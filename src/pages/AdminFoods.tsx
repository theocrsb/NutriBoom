import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Food } from "./Main";
import { User } from "./Main";
import { UserRole } from "./Main";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
let allFoods: Food[] = [];
const AdminFoods = () => {
  // Ajout du navigate
  const navigate = useNavigate();

  const [validateState, setValidateState] = useState<string>();
  const [mesFoods, setMesFoods] = useState<Food[]>([]);
  const booleanFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValidateState(e.currentTarget.value);
  };
  const handleCheck = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setValidateState(e.currentTarget.value);
  };
  useEffect(() => {
    axios
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
  }, []);
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
          ? mesFoods
              .filter((food) =>
                food.validate.toString().includes(`${validateState}`)
              )
              .map((foodfiltered) => (
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
          : mesFoods.map((food) => (
              <li key={uuidv4()}>
                {food.name}
                <select
                  name="food"
                  id="foodAdmin"
                  className="htmlForm-label select"
                  // value={weightState}
                  onChange={booleanFunction}
                >
                  {food.validate === true ? (
                    <option key={uuidv4()} value="true" selected>
                      true
                    </option>
                  ) : (
                    <option key={uuidv4()} value="true">
                      true
                    </option>
                  )}
                  {food.validate === false ? (
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
                  value={food.id}
                >
                  <span className="">❌</span>
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default AdminFoods;
