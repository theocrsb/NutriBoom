import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Mailto = () => {
  const emailElement = useRef<HTMLInputElement>(null);
  const nomElement = useRef<HTMLInputElement>(null);
  const texteAreaElement = useRef<HTMLInputElement>(null);
  const navigate =useNavigate()

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("button form clicked");
    console.log(emailElement.current?.value);
    console.log(nomElement.current?.value);
    console.log(texteAreaElement.current?.value);
    console.log("les valeurs recuperé", nomElement);

    alert("votre message a  bien été envoyé");

    axios
      .post(`http://localhost:8080/api/mailto`, {
        name: nomElement.current?.value,
        mail: emailElement.current?.value,
        texteArea: texteAreaElement.current?.value,
      })

      .then((response) => {
        console.log("le console.log du response.data", response.data);
        navigate('/welcome')
      })

      .catch((error) => {
        console.error("something went wrong", error);
      });
  };

  return (
    <div className="App">
      <h1>Faites nous part de vos suggestions</h1>
      {/*<form onSubmit={(e) =>{handleSubmitForm(e)}}>*/}
      <form className="w-50 m-auto" onSubmit={handleSubmitForm}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="nomUser"
            placeholder="Votre nom"
            ref={nomElement}
          />
          <label htmlFor="nomUser">Nom</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="emailUser"
            placeholder="name@example.com"
            ref={emailElement}
          />
          <label htmlFor="emailUser">Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="textarea"
            className="form-control"
            id="nomUser"
            placeholder="Votre text"
            ref={texteAreaElement}
          />
          <label htmlFor="nomUser">text</label>
        </div>

        <button className="mt-3 btn btn-primary mb-3" type="submit">
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Mailto;
