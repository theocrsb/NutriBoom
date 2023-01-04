import "./Admin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Food } from "./Main";
import { User } from "./Main";
import { UserRole } from "./Main";
import { ByRoleMatcher } from "@testing-library/react";

const Admin = () => {
  const [mesUsers, setMesUsers] = useState<User[]>([]);
  const [valueState, setValueState] = useState<string>();
  const [roleUser, setRoleUser] = useState<string>();

  let role: UserRole;

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
        setRoleUser(res.data.role);
        console.log("le role du user", roleUser);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  }, []);

  const suppAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("id user", e.currentTarget.value);
    if (
      window.confirm("Hey admin,veux-tu vraiment supprimer cet utilisateur?")
    ) {
      axios
        .delete(`http://localhost:8080/api/users/${e.currentTarget.value}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        })
        .then((response) => {
          console.log(response);
          window.alert("Utilisateur supprimé");
          window.location.reload();
        })
        .catch((error) => {
          console.log("tu ne peux pas poster", error);
        });
    }
  };

  const adminValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueState(e.currentTarget.value);
    console.log("valeur input", valueState);
  };

  const userValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueState(e.currentTarget.value);
    console.log("valeur input", valueState);
  };

  const validateRole = (e: React.MouseEvent<HTMLButtonElement>) => {
    axios
      .patch(
        `http://localhost:8080/api/users/${e.currentTarget.value}`,
        {
          role: {
            id: valueState,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      )
      .then((resp) => {
        console.log("update");
      })
      .catch((error) => {
        console.log("pas update");
      });
  };

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
        <li key={index} className="ecritureAdmin">
          {user.email} ---- {user.lastname} {user.firstname} est un{" "}
          {user.role.label}
          <div className="users">
            <button className="supp" onClick={suppAccount} value={user.id}>
              supprimer
            </button>
            <div>
              <span className="role">Changer rôle utilisateur </span>
              <div>
                <input
                  type="radio"
                  id="admin"
                  name="drone"
                  value="admin"
                  onChange={adminValue}
                />
                <label htmlFor="admin">admin</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="user"
                  name="drone"
                  value="user"
                  onChange={userValue}
                />
                <label htmlFor="user">user</label>
              </div>
              <button
                className="supp"
                value={user.role.label}
                onClick={validateRole}
              >
                valider
              </button>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};
export default Admin;
