import "./Admin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Food } from "./Main";

export interface User {
  id: number;
  lastname: string;
  firstname: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  ratio: number;
  email: string;
  password: string;
}

const Admin = () => {
  const [mesUsers, setMesUsers] = useState<User[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        console.log("mes users", res.data);
        setMesUsers(res.data);
        console.log("mes users dans le state", mesUsers);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  }, []);
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
      if (mesFoods[i].validate === false) {
        mesFoodsFilter.push(mesFoods[i]);
      }
    }
  }
  console.log("mesFoodsFilter resultat", mesFoodsFilter);
  return (
    <div>
      <h1 className="ecriture">
        Salut Admin ! <br />
        Voici la liste des utilisateurs
      </h1>
      {mesUsers.map((user: User, index) => (
        <li key={index} className="ecritureAdmin" style={{ color: "black" }}>
          {user.lastname} {user.firstname} {user.email}
        </li>
      ))}
    </div>
  );
};
export default Admin;
