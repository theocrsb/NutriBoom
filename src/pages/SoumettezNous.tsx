import { FormEvent, useRef } from "react";



const SoumettezNous = () => {
  const nomElement = useRef<HTMLInputElement>(null);
  const calorieElement = useRef<HTMLInputElement>(null);
  const lipidesElement = useRef<HTMLInputElement>(null);
  const glucidesElement = useRef<HTMLInputElement>(null);

  const activiteeElement = useRef<HTMLInputElement>(null);
  const consoKalElement = useRef<HTMLInputElement>(null);

  const handleSubmitForm1 = (e: FormEvent) => {
    e.preventDefault();
    console.log("button form clicked");
    console.log(nomElement.current?.value);
    console.log(calorieElement.current?.value);
    console.log(lipidesElement.current?.value);
    console.log(glucidesElement.current?.value);
  };
 const handleSubmitForm2 = (e: FormEvent) => {
    e.preventDefault();
    console.log(activiteeElement.current?.value);
    console.log(consoKalElement.current?.value);
  };

  return (
    <div className="App">
      <h2>Soumettez nous un aliment</h2>

      {/*<form onSubmit={(e) =>{handleSubmitForm(e)}}>*/}
      <form className="w-50 m-auto" onSubmit={handleSubmitForm1}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="nameAliment"
            placeholder="nom de l' aliment"
            ref={nomElement}
          />
          <label htmlFor="nameAliment">nom de l' aliment</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="calorieAliment"
            placeholder="Calorie"
            ref={calorieElement}
          />
          <label htmlFor="calorieAliment">Calorie</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="lipidesAliment"
            placeholder="Lipides"
            ref={lipidesElement}
          />
          <label htmlFor="lipidesAliment">Lipides</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="glucidesAliment"
            placeholder="glucides"
            ref={glucidesElement}
          />
          <label htmlFor="glucidesAliment">Glucides</label>
        </div>

        <button className="mt-3 btn btn-success" type="submit">
          soumettre un aliment
        </button>
      </form>
      <h2>Soumettre une activitee</h2>
      <form className="w-50 m-auto" onSubmit={handleSubmitForm2}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="nameAliment"
            placeholder="nom de l' aliment"
            ref={activiteeElement}
          />
          <label htmlFor="nameAliment">nom de l' activitee</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="calorieAliment"
            placeholder="Calorie consomée/h"
            ref={consoKalElement}
          />
          <label htmlFor="calorieAliment">Calorie consomée/h</label>
        </div>
        <button className="mt-3 btn btn-success mb-3" type="submit">
          soumettre un aliment
        </button>
      </form>
    </div>
  );
};

export default SoumettezNous;
