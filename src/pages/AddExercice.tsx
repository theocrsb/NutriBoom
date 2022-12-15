import AlimentAddButton from '../components/AlimentAddButton';
import './Add.css';
import SearchBar from '../components/SearchBar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { table } from 'console';

export interface Activity {
  id: number;
  name: string;
  conso_cal_h: number;
}
const AddExercice = () => {
  const [exerciceInput, setExerciceInput] = useState<string>();
  const [listExercices, setListExercices] = useState<Activity[]>([]);
  const [activity, setActivity] = useState<Activity | undefined>();
  const [quantity, setQuantity] = useState<number>();
  const [message, setMessage] = useState<string>();
  const navigate = useNavigate();

  //  -------------------PROPS---------------------//
  const exerciceSubmitFunction = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('props dans les exercices', e);
    console.log('activite selectionnee', activity?.name);
    console.log('objet activite', activity);
    console.log('la quantité', quantity);

    axios
      .post(
        `http://localhost:8080/api/exercices`,
        {
          activity: activity?.id,
          time: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
          },
        }
      )
      .then((response) => {
        console.log('super, exercice ajouté');
        setMessage('Exercice ajouté avec succès');
        setTimeout(() => {
          navigate('/main');
        }, 2500);
      })
      .catch((error) => {
        console.log('tu ne peux pas poster', error);
        if (!quantity) {
          setMessage(error.response.data.message);
        }
      });
  };

  const quantityFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(undefined);
    let quantite = Number(e.currentTarget.value);
    setQuantity(quantite);
  };

  const searchBarFunction = (e: string) => {
    console.log('props passé dans le parent', e);
    setExerciceInput(e);
    console.log('props passé dans le parent et le state', e);
    if (!e) {
      setActivity(undefined);
    } else {
      let listExo = listExercices.filter((exo) =>
        exo.name.toLowerCase().includes(e)
      );
      setActivity(listExo[0]);
    }
  };
  //  --------------------PROPS--------------------//

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/activity`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
        },
      })
      .then((response) => {
        console.log('liste des exercices', response.data);
        setListExercices(response.data);
      })
      .catch((error) => {
        console.log('something went wrong', error);
      });
  }, []);

  return (
    <div>
      <h1 className='exerciceText'>
        Sélectionne l'exercice que tu as réalisé aujourd'hui!
      </h1>
      <p className='exerciceText'>
        Tu peux grâce à la barre de recherche trouver ton activité, et l'ajouter
        à ton tableau de bord grâce au bouton!
      </p>
      <div className='searchbarPosition'>
        <SearchBar searchProps={searchBarFunction} />
      </div>
      <div className='list'>
        {activity?.name && (
          <li className='listeRecherche'>
            <span className='text'>{activity?.name}</span>
            <div className='formulaire'>
              <form className='form' onSubmit={exerciceSubmitFunction}>
                <label htmlFor='quantity' className='htmlForm-label' />
                <input
                  className='quantity'
                  type='number'
                  id='quantity'
                  placeholder='temps en min'
                  onChange={quantityFunction}
                />
                <span className='buttonValidate'>
                  <AlimentAddButton />
                </span>
              </form>
            </div>
          </li>
        )}
        <p className='exerciceText'>{message}</p>
      </div>
    </div>
  );
};
export default AddExercice;
