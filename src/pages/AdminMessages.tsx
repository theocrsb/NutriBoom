import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

interface Message {
  id: number;
  name: string;
  mail: string;
  texteArea: string;
  createdAt: Date;
}

const AdminMessage = () => {
  const [messages, SetMessage] = useState<Message[]>([]);
  const [infoBoite, setInfoBoite] = useState<string | null>("nada");
  const navigate = useNavigate();
  const verifMessageFunction = (messages: Message[]) => {
    if (messages.length === 0) {
      console.log("le tableau est vide");
      setInfoBoite("La boîte de réception est vide.");
    } else {
      setInfoBoite("");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/mailto", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        SetMessage(response.data);
        verifMessageFunction(response.data);
      });
  }, []);
  console.log("messages", messages);
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    if (window.confirm("Veux-tu vraiment supprimer ce message ?")) {
      axios
        .delete(`http://localhost:8080/api/mailto/${e.currentTarget.value}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        })
        .then((response) => {
          console.log(response);
          window.location.reload();
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
  return (
    <div className="container-food">
      <section className="container-admin">
        <div
          className="d-flex justify-content-center p-3"
          style={{ color: "white" }}
        >
          <h2 className="ecriture">Messages reçus:</h2>
        </div>
        {/* On map pour avoir autant de carte que de message */}
        <p>{infoBoite}</p>
        {messages.map((x) => (
          <div key={x.id} className="list-group p-4">
            <div className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{x.mail}</h5>
                <small className="text-muted">
                  {new Date(x.createdAt).toLocaleDateString("fr")}
                </small>
              </div>
              <p className="mb-1">{x.texteArea}</p>
              <div className="d-flex justify-content-between">
                <small className="text-muted">{x.name}</small>
                <div className="">
                  <button
                    style={{ color: "white" }}
                    value={x.id}
                    className="buttonValidate"
                    onClick={handleDelete}
                  >
                    <BsTrashFill className="trash" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminMessage;
