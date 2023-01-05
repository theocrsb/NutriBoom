import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Food } from "./Main";
import { User } from "./Main";
import { UserRole } from "./Main";
import "./Admin.css";

const AdminFoods = () => {
  const [mesFoods, setMesFoods] = useState<Food[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/foods", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        console.log("mes foods", res.data);
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
      if (mesFoods[i].validate === true) {
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
        // onChange={weightFunction}
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
      {mesFoodsFilter.map((food) => (
        <li>{food.name}</li>
      ))}
    </div>
  );
};

export default AdminFoods;
