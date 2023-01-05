import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Food } from "./Main";
import { User } from "./Main";
import { UserRole } from "./Main";
import "./Admin.css";
let allFoods: Food[] = [];
const AdminFoods = () => {
  const [validateState, setValidateState] = useState<string>();
  const [mesFoods, setMesFoods] = useState<Food[]>([]);
  const booleanFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      <select
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
      </select>
      {validateState
        ? mesFoods
            .filter((food) =>
              food.validate.toString().includes(`${validateState}`)
            )
            .map((foodfiltered) => <li>{foodfiltered.name}</li>)
        : mesFoods.map((food) => <li>{food.name}</li>)}
    </div>
  );
};

export default AdminFoods;
