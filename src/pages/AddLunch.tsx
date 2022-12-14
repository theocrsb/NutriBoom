import AlimentAddButton from '../components/AlimentAddButton';
import './Add.css';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLunch = () => {
  const [alimentInput, setAlimentInput] = useState<string>('');
  const [tabAliment, setTabAliment] = useState<Food[]>([]);
  const [quantity, setQuantity] = useState<number>();
  const [message, setMessage] = useState<string>();
  const [idFood, setIdFood] = useState<string>();
  const navigate = useNavigate();

  const searchBarFunction = (e: string) => {
    console.log('props passé dans le parent', e);
    setAlimentInput(e);
    console.log('props passé dans le parent et le state', e);
  };

  interface Food {
    id: number;
    name: string;
    nombre_caloriescategorie: number;
    lipides: number;
    glucides: number;
    proteines: number;
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/foods', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTabAliment(response.data);
      });
  }, []);

  const lunchSubmitFunction = (e: React.FormEvent) => {
    e.preventDefault();

    // post sur la bdd
    axios
      .post(
        `http://localhost:8080/api/meals`,
        {
          //name en fixe
          name: 'Aliment consommé pendant le déjeuner',
          //quantité qui viendra de l'input
          quantity: quantity,
          //toujours 2 car déjeuner
          type: 2,
          //food qui viendra de l'input
          food: 61,
          //   activity: activity?.id,
          //   time: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        // console.log('super, exercice ajouté');
        // setMessage('Exercice ajouté avec succès');
        setTimeout(() => {
          navigate('/main');
        }, 2500);
      })
      .catch((error) => {
        console.log(error);
        // console.log('tu ne peux pas poster', error);
        // if (!quantity) {
        //   setMessage(error.response.data.message);
        // }
      });
  };

  const quantityFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(undefined);
    let quantite = Number(e.currentTarget.value);
    console.log(quantite);
    setQuantity(quantite);
  };

  return (
    <div>
      <div className='searchbarPosition'>
        <SearchBar searchProps={searchBarFunction} />
      </div>
      <div className='list'>
        <div>
          <ul>
            {tabAliment
              .filter((x) => {
                if (alimentInput)
                  return x.name
                    .toLocaleLowerCase()
                    .normalize('NFD')
                    .replace(/\p{Diacritic}/gu, '')
                    .includes(
                      alimentInput
                        .toLocaleLowerCase()
                        .normalize('NFD')
                        .replace(/\p{Diacritic}/gu, '')
                    );
              })

              .map((x, id) => (
                <li key={id} className='listeRecherche'>
                  {x.name}, id :{x.id}
                  {/* <span className="text"> Petit-déjeuner</span> */}
                  <div className='formulaire'>
                    <form className='form' onSubmit={lunchSubmitFunction}>
                      <label htmlFor='quantity' className='htmlForm-label' />
                      <input
                        className='quantity'
                        type='text'
                        id='quantity'
                        placeholder='quantité en gr'
                        onChange={quantityFunction}
                      />

                      <span className='buttonValidate'>
                        <AlimentAddButton />
                      </span>
                    </form>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default AddLunch;
