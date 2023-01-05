import axios from 'axios';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SoumettezNous = () => {
  const nomElement = useRef<HTMLInputElement>(null);
  const calorieElement = useRef<HTMLInputElement>(null);
  const lipidesElement = useRef<HTMLInputElement>(null);
  const glucidesElement = useRef<HTMLInputElement>(null);
  const proteinesElement = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>('');

  const navigate = useNavigate();

  const activiteeElement = useRef<HTMLInputElement>(null);

  const consoKalElement = useRef<HTMLInputElement>(null);

  const handleSubmitForm1 = (e: FormEvent) => {
    e.preventDefault();
    console.log('button form clicked');
    console.log(nomElement.current?.value);
    console.log(calorieElement.current?.value);
    console.log(lipidesElement.current?.value);
    console.log(glucidesElement.current?.value);
    console.log(proteinesElement.current?.value);


    
    axios
      .post(
        `http://localhost:8080/api/foods`,
        {
          name: nomElement.current?.value,
          nombre_calories: calorieElement.current?.value,
          lipides: lipidesElement.current?.value,
          glucides: glucidesElement.current?.value,
          proteines: proteinesElement.current?.value,
          validate: false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
          },
        }
      )
      .then((response) => {
        console.log('response', response);
        setMessage(
          'Aliment ajouté avec succès. Merci d attendre la validation d un administeur'
        );
        setTimeout(() => {
          navigate('/main');
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem('accesstoken');
          navigate('/connexion');
        }
      });
  };

  const handleSubmitForm2 = (e: FormEvent) => {
    e.preventDefault();
    console.log("button form clicked");
    console.log(activiteeElement?.current?.value);
    console.log(consoKalElement?.current?.value);
    

    axios
      .post(
        `http://localhost:8080/api/exercices`,
        {
          name: activiteeElement?.current?.value,
          calorieElement: consoKalElement?.current?.value,
          validate: false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        setMessage(
          "Activité ajouté avec succès. Merci d attendre la validation d un administeur"
        );
        setTimeout(() => {
          navigate("/main");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem("accesstoken");
          navigate("/connexion");
        }
      });
  };


  return (
    <div className='App'>
      <h2>Soumettez nous un aliment</h2>

      {/*<form onSubmit={(e) =>{handleSubmitForm(e)}}>*/}
      <form className='w-50 m-auto' onSubmit={handleSubmitForm1}>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='nameAliment'
            placeholder="nom de l'aliment"
            ref={nomElement}
            required
          />
          <label htmlFor='nameAliment'>nom de l'aliment</label>
        </div>

        <div className='form-floating mb-2'>
          <input
            type='number'
            className='form-control'
            id='calorieAliment'
            placeholder='Calories'
            ref={calorieElement}
            required
          />
          <label htmlFor='calorieAliment'>Calories</label>
        </div>

        <div className='form-floating mb-2'>
          <input
            type='number'
            className='form-control'
            id='lipidesAliment'
            placeholder='Lipides'
            ref={lipidesElement}
            required
          />
          <label htmlFor='lipidesAliment'>Lipides</label>
        </div>

        <div className='form-floating mb-2'>
          <input
            type='number'
            className='form-control'
            id='glucidesAliment'
            placeholder='Glucides'
            ref={glucidesElement}
            required
          />
          <label htmlFor='ProteinesAliment'>Glucides</label>
        </div>

        <div className='form-floating mb-2'>
          <input
            type='number'
            className='form-control'
            id='ProteinesAliment'
            placeholder='Proteines'
            ref={proteinesElement}
            required
          />
          <label htmlFor='glucidesAliment'>Proteines</label>
        </div>

        <button className='mt-3 btn btn-success' type='submit'>
          soumettre un aliment
        </button>
      </form>
      <h2>Soumettre une activitee</h2>
      <form className='w-50 m-auto' onSubmit={handleSubmitForm2}>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='nameAliment'
            placeholder="nom de l' aliment"
            ref={activiteeElement}
          />
          <label htmlFor='nameAliment'>nom de l' activitee</label>
        </div>
        <div className='form-floating mb-2'>
          <input
            type='text'
            className='form-control'
            id='calorieAliment'
            placeholder='Calorie consomée/h'
            ref={consoKalElement}
          />
          <label htmlFor='calorieAliment'>Calorie consomée/h</label>
        </div>
        <button className='mt-3 btn btn-success mb-3' type='submit'>
          soumettre un aliment
        </button>
      </form>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SoumettezNous;
