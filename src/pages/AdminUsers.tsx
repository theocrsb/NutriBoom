import "./Admin.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { User } from "./Main";
import { UserRole } from "./Main";
import { AuthContext } from "../contexts/Auth-context";
import { PayloadToken } from "./Main";
import jwt_Decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BsCheckLg, BsPersonDashFill, BsTrashFill, BsX } from "react-icons/bs";

const Admin = () => {
  const [mesUsers, setMesUsers] = useState<User[]>([]);
  const [valueState, setValueState] = useState<string>();
  const [roleUser, setRoleUser] = useState<string>();
  const { savedToken } = useContext(AuthContext);
  // Verification dans la page de la validité du token
  const { valideTimeToken } = useContext(AuthContext);
  if (valideTimeToken === "token") {
    window.location.reload();
  }

  const navigate = useNavigate();

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
        const tab = res.data;
        // Fonction pour gérer le tri par ordre alphabétique des users-------------
        function sortArray(x: User, y: User) {
          if (x.lastname && y.lastname) {
            if (x.lastname < y.lastname) {
              return -1;
            }
            if (x.lastname > y.lastname) {
              return 1;
            }
          }
        }
        let tab2 = tab.sort(sortArray);
        setMesUsers(tab2);
        // Fin de l'implémentation de la fonction tri alphabétique ----------------------------------
        console.log("mes users dans le state", mesUsers);
        setRoleUser(res.data.role);
        console.log("le role du user", roleUser);
      })
      .catch((error) => {
        console.log("something went wrong", error);
        localStorage.removeItem("accesstoken");
        window.location.reload();
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
    console.log("valeur du validateRole", e.currentTarget.value);
    if (
      window.confirm(
        `Hey Admin, veux tu vraiment changer le statut de cet utilisateur?`
      )
    )
      axios
        .patch(
          `http://localhost:8080/api/users/${e.currentTarget.value}/admin`,
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
          console.log("value state dans la requete", valueState);
          window.location.reload();
        })
        .catch((error) => {
          console.log("pas update");
          window.location.reload();
        });
  };

  return (
    <div className="container-food">
      <section className="container-admin">
        <div className="encadrement">
          <h1 className="ecriture">Gestion des utilisateurs</h1>
          <p className="ecriture">
            Tu peux ici gérer la liste des utilisateurs, changer leur rôle en
            administrateur ou utilisateur lambda.
          </p>
          {/* <div className="sousEncadrement">
   
            <br />
  
      </div>      */}
          <ul className="list-food">
            {mesUsers.map((user: User, index) => (
              <li key={index}>
                <div className="container text-center">
                  <div className="row test-li">
                    <div className="col">
                      <p>
                        <strong>
                          {user.firstname} {user.lastname}
                        </strong>
                      </p>
                    </div>
                    <div className="col">
                      {user.email}
                      {user.role.label === "user" ? (
                        <span className="text" style={{ color: "green" }}>
                          [ {user.role.label} ]
                        </span>
                      ) : (
                        <span className="text" style={{ color: "purple" }}>
                          [ {user.role.label} ]
                        </span>
                      )}
                    </div>
                    <div className="col btn-gestion">
                      <div className="col"></div>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="admin"
                        name="drone"
                        value="2"
                        onChange={adminValue}
                        // defaultChecked={user.role.label === "admin" ? true : false}
                      />
                      <label className="label" htmlFor="admin">
                        admin
                      </label>
                      <input
                        className="form-check-input "
                        type="radio"
                        id="user"
                        name="drone"
                        value="1"
                        onChange={userValue}
                        // defaultChecked={user.role.label === "user" ? true : false}
                      />
                      <label className="label" htmlFor="user">
                        user
                      </label>
                    </div>
                    <div className="col btn-gestion">
                      <button
                        className="buttonValidate"
                        value={user.id}
                        onClick={validateRole}
                      >
                        <BsCheckLg className="iconVisible" />
                      </button>
                      <button
                        className="buttonValidate"
                        onClick={suppAccount}
                        value={user.id}
                      >
                        <BsPersonDashFill className="trash" />
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
export default Admin;
