import AlimentAddButton from '../components/AlimentAddButton';
import './Add.css';
import SearchBar from '../components/SearchBar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { table } from 'console';
interface Food {
  id: number;
  name: string;
  nombre_caloriescategorie: number;
  lipides: number;
  glucides: number;
  proteines: number;
}

const AddDinner = () => {
  const [listFoods, setListFoods] = useState<Food[]>([]);
  const [quantity, setQuantity] = useState<number>();
  const [message, setMessage] = useState<string>();
  const [listBis, setListBis] = useState<Food[]>([]);
  const [selection, setSelection] = useState<string>();
  const [selectionId, setSelectionId] = useState<string>();
  const navigate = useNavigate();

  //  -------------------PROPS---------------------//
  const eatenfoodSubmitFunction = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/api/meals`,
        {
          //name en fixe
          name: 'Aliment consommé :',
          //quantité qui viendra de l'input
          quantity: quantity,
          //toujours 3 car dinner
          type: 3,
          //food qui viendra de l'input
          food: selectionId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
          },
        }
      )
      .then((response) => {
        console.log('response', response);
        setMessage('Aliment consommé pendant le dinner ajouté avec succès');
        setTimeout(() => {
          navigate('/main');
        }, 2500);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });
  };

  const quantityFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(undefined);
    let quantite = Number(e.currentTarget.value);
    setQuantity(quantite);
  };

  const searchBarFunction = (e: string) => {
    console.log('props passé dans le parent', e);

    console.log('props passé dans le parent et le state', e);

    let listExo = listFoods.filter((food) =>
      food.name
        .toLocaleLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .includes(
          e
            .toLocaleLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
        )
    );
    setListBis(listExo);
  };
  //  --------------------PROPS--------------------//

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/foods`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
        },
      })
      .then((response) => {
        console.log('liste des foods', response.data);
        setListFoods(response.data);
      })
      .catch((error) => {
        console.log('something went wrong', error);
      });
  }, []);

  const buttonFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    setSelectionId(e.currentTarget.value);
    setSelection(e.currentTarget.name);
    console.log(e.currentTarget.name);
  };

  return (
    <div>
      <h1 className='exerciceText'>
        Sélectionne chaque aliments que tu as consommés pendant ton dinner !
      </h1>
      <p className='exerciceText'>
        Tu peux grâce à la barre de recherche trouver un aliment, et l'ajouter à
        ton tableau de bord grâce au bouton!
      </p>
      <div className='searchbarPosition'>
        <SearchBar searchProps={searchBarFunction} />
      </div>
      <div className='list'>
        {selection && (
          <li className='listeRecherche'>
            <span className='text'>{selection}</span>
            <div className='formulaire'>
              <form
                className='form overflow-auto'
                onSubmit={eatenfoodSubmitFunction}
              >
                <label htmlFor='quantity' className='htmlForm-label' />
                <input
                  className='quantity'
                  type='number'
                  id='quantity'
                  placeholder='Grammes'
                  onChange={quantityFunction}
                />
                <span className='buttonValidate'>
                  <AlimentAddButton />
                </span>
              </form>
            </div>
          </li>
        )}
        <p className='exerciceText'>Suggestions</p>
        <div className='scroller'>
          {listBis.map((liste, index) => (
            <button
              key={index}
              className='listeRechercheBis'
              value={liste.id}
              onClick={buttonFunction}
              name={liste.name}
            >
              {liste.name}
            </button>
          ))}
        </div>
        <p className='exerciceText'>{message}</p>
      </div>
    </div>
  );
};
export default AddDinner;
