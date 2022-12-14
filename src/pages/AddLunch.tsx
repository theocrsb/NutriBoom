import AlimentAddButton from '../components/AlimentAddButton';
import './Add.css';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AddLunch = () => {
  const [alimentInput, setAlimentInput] = useState<string>();

  const breakfastSubmitFunction = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('props dans le breakfast');
  };

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

  // const BreakFood = () => {
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

  const [tabAliment, setTabAliment] = useState<Food[]>([]);

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
                  {x.name}

                  {/* <span className="text"> Petit-déjeuner</span> */}
                  <div className='formulaire'>
                    <form className='form' onSubmit={breakfastSubmitFunction}>
                      <label htmlFor='quantity' className='htmlForm-label' />
                      <input
                        className='quantity'
                        type='text'
                        id='quantity'
                        placeholder='quantité en gr'
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
