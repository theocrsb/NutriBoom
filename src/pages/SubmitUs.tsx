import axios from 'axios';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

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
        }, 0);
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
    console.log('button form clicked');
    console.log(activiteeElement?.current?.value);
    console.log(consoKalElement?.current?.value);

    axios
      .post(
        `http://localhost:8080/api/activity`,
        {
          // on recupere les inputs
          name: activiteeElement?.current?.value,
          conso_cal_1h: consoKalElement?.current?.value,
          // on rentre en brut pour ne pas afficher dans le front directement
          // attente validation Admin
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
          'Activité ajouté avec succès. Merci d attendre la validation d un administeur'
        );
        setTimeout(() => {
          navigate('/main');
        }, 0);
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

  return (
    <div className='App'>
      <h2>Soumettez nous un aliment</h2>

      {/*<form onSubmit={(e) =>{handleSubmitForm(e)}}>*/}
      <form className='w-50 m-auto ' onSubmit={handleSubmitForm1}>
        <div className='form-floating mb-3 d-flex justify-content-center'>
          <input
            type='text'
            className='form-control'
            id='nameAliment'
            // placeholder="nom de l'aliment"
            ref={nomElement}
            required
          />
          <label htmlFor='nameAliment' style={{ color: 'white' }}>
            Nom de l'aliment
          </label>
        </div>

        <div className='form-floating mb-3 d-flex justify-content-center'>
          <input
            type='number'
            className='form-control'
            id='calorieAliment'
            // placeholder='Nombre de calories'
            ref={calorieElement}
            required
          />
          <label htmlFor='calorieAliment' style={{ color: 'white' }}>
            Nombre de calories
          </label>
        </div>

        <div className='form-floating mb-3 d-flex justify-content-center'>
          <input
            type='number'
            className='form-control'
            id='lipidesAliment'
            // placeholder='Nombre de lipides'
            ref={lipidesElement}
            required
          />
          <label htmlFor='lipidesAliment' style={{ color: 'white' }}>
            Nombre de lipides
          </label>
        </div>

        <div className='form-floating mb-3 d-flex justify-content-center'>
          <input
            type='number'
            className='form-control'
            id='glucidesAliment'
            // placeholder='Glucides'
            ref={glucidesElement}
            required
          />
          <label htmlFor='ProteinesAliment' style={{ color: 'white' }}>
            Nombre de glucides
          </label>
        </div>

        <div className='form-floating mb-3 d-flex justify-content-center'>
          <input
            type='number'
            className='form-control'
            id='ProteinesAliment'
            // placeholder='Proteines'
            ref={proteinesElement}
            required
          />
          <label htmlFor='glucidesAliment' style={{ color: 'white' }}>
            Nombre de proteines
          </label>
        </div>
        <div className='form-floating mb-3 d-flex justify-content-center'>
          <button
            className='mt-3 btn btn-success btn inscription '
            style={{ margin: '0' }}
            type='submit'
          >
            soumettre un aliment
          </button>
        </div>

        {/* Soummettre activitée */}
      </form>
      <h2>Soumettre une activité</h2>
      <form className='w-50 m-auto' onSubmit={handleSubmitForm2}>
        <div className='form-floating mb-3 d-flex justify-content-center'>
          <input
            type='text'
            className='form-control'
            id='nameAliment'
            // placeholder="nom de l' aliment"
            ref={activiteeElement}
          />
          <label style={{ color: 'white' }} htmlFor='nameAliment'>
            Nom de l'activité
          </label>
        </div>
        <div className='form-floating mb-3 d-flex justify-content-center'>
          <input
            type='number'
            className='form-control'
            id='calorieAliment'
            // placeholder='Calorie consomée/h'
            ref={consoKalElement}
          />
          <label style={{ color: 'white' }} htmlFor='calorieAliment'>
            Calories consomées / heures
          </label>
        </div>
        <div className='d-flex justify-content-center'>
          <button
            className='mt-3 btn btn-success btn inscription '
            style={{ margin: '0' }}
            type='submit'
          >
            soumettre une activité
          </button>
        </div>
      </form>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SoumettezNous;
