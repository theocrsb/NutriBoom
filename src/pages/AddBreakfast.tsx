import AlimentAddButton from '../components/AlimentAddButton';
import './Add.css';
import SearchBar from '../components/SearchBar';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validate } from 'uuid';

interface Food {
  id: number;
  name: string;
  nombre_caloriescategorie: number;
  lipides: number;
  glucides: number;
  proteines: number;
  validate: boolean;
}

const AddBreackFast = () => {
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
    // if (quantity) {
    //   console.log(
    //     "je rentre dans la condition du quantity",
    //     quantity.toString()
    //   );
    //   console.log("quantity to string", quantity.toString().charCodeAt(0));

    //   if (quantity.toString().charCodeAt(0) === 45) {
    //     alert("merci de rentrer une valeur positive pour la quantité");
    //   }
    //   return;
    // }
    axios
      .post(
        `http://api-nutriboom.dev-formation.fr/api/meals`,
        {
          //name en fixe
          name: 'Aliment consommé :',
          //quantité qui viendra de l'input
          quantity: quantity ? Math.abs(quantity) : quantity,
          //toujours 1 car petit déjeuner
          type: 1,
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
        setMessage(
          'Aliment consommé pendant le petit déjeuner ajouté avec succès'
        );

        navigate('/main');
      })
      .catch((error) => {
        console.log(error);
        // si erreur input
        if (error.response.data.statusCode === 400) {
          setMessage("N'oublie pas de saisir une quantité !");
        } else {
          setMessage(error.response.data.message);
        }

        if (error.response.data.statusCode === 401) {
          localStorage.removeItem('accesstoken');
          navigate('/connexion');
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

    console.log('props passé dans le parent et le state', e);

    let listExo = listFoods
      .filter((food) =>
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
      )
      .filter((validateAdmin) => validateAdmin.validate === true);
    setListBis(listExo);
  };
  //  --------------------PROPS--------------------//

  useEffect(() => {
    axios
      .get(`http://api-nutriboom.dev-formation.fr/api/foods`, {
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
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem('accesstoken');
          navigate('/connexion');
        }
      });
  }, []);

  const buttonFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    setSelectionId(e.currentTarget.value);
    setSelection(e.currentTarget.name);
    console.log(e.currentTarget.name);
  };

  return (
    <div className=' addfood-page'>
      <div className='container-addfood'>
        <div className='text-container'>
          <section className='text-section'>
            <h1 className='exerciceText'> Aliment petit déjeuner </h1>
            {/* <p className='exerciceTextPetit'>
            Sélectionne chaque aliment que tu as consommé pendant ton petit
            déjeuner ! à l'aide de la barre de recherche !
          </p> */}

            {/* lien pour soummettre aliment/activité */}
            <Link className='link-add' to='/ajout'>
              <p className='text-info'>
                Tu ne trouves pas ton aliment ? <br />
                <br />
                <span className='click-add'>Clique ici pour l'ajouter !</span>
              </p>
            </Link>
          </section>
        </div>
        <div className='searchbarPosition'>
          <SearchBar searchProps={searchBarFunction} />
        </div>
        <div className='list'>
          {selection && (
            <li className='listeRecherche'>
              <span className='li-text'>{selection}</span>
              <div className='formulaire'>
                <form className='form' onSubmit={eatenfoodSubmitFunction}>
                  <label htmlFor='quantity' className='htmlForm-label' />
                  <input
                    className='quantity'
                    type='number'
                    id='quantity'
                    placeholder='gr'
                    onChange={quantityFunction}
                  />

                  <AlimentAddButton />
                </form>
              </div>
            </li>
          )}
          <p className='exerciceText'>Suggestions</p>
          {/* <p> Clique sur ton aliment et valide avec le +</p> */}
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
    </div>
  );
};
export default AddBreackFast;
