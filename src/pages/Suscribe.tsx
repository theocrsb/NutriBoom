import './Suscribe.css';
import SuscribeButton from '../components/SuscribeButton';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/Auth-context';
import { useNavigate } from 'react-router-dom';

const Suscribe = () => {
  const [lastNameState, setLastNameState] = useState<string>();
  const [firstNameState, setFirstNameState] = useState<string>();
  const [passwordState, setPasswordState] = useState<string>();
  const [mailState, setMailState] = useState<string>();
  const [ageState, setAgeState] = useState<number>();
  const [weightState, setWeightState] = useState<number>();
  const [heightState, setHeightState] = useState<number>();
  const [ratioState, setRatioState] = useState<number>();
  const [sexState, setSexState] = useState<string>();
  const [champManquant, setChampManquant] = useState<string>();
  const navigate = useNavigate();

  const lastNameFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastNameState(e.currentTarget.value);
  };
  const firstNameFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNameState(e.currentTarget.value);
  };
  const mailFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMailState(e.currentTarget.value);
  };
  const passwordFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState(e.currentTarget.value);
  };
  const ageFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let valeurConvertieNombre = Number(e.currentTarget.value);
    setAgeState(valeurConvertieNombre);
  };
  const weightFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let valeurConvertieNombre = Number(e.currentTarget.value);
    setWeightState(valeurConvertieNombre);
  };
  const heightFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let valeurConvertieNombre = Number(e.currentTarget.value);
    setHeightState(valeurConvertieNombre);
  };
  const sexFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSexState(e.currentTarget.value);
  };

  const ratioFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let valeurConvertieNombre = Number(e.currentTarget.value);
    setRatioState(valeurConvertieNombre);
  };

  const submitFunction = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('cliké');

    axios
      .post(`http://localhost:8080/api/users`, {
        lastname: lastNameState,
        firstname: firstNameState,
        age: ageState,
        gender: sexState,
        weight: weightState,
        height: heightState,
        email: mailState,
        password: passwordState,
        ratio: ratioState,
      })
      .then((response) => {
        console.log('le console.log du response.data', response.data);
        let inscription = true;
        if (inscription) {
          return navigate('/inscriptionok');
        }
      })
      .catch((error) => {
        console.error('something went wrong', error);

        if (
          !lastNameState ||
          !firstNameState ||
          !ageState ||
          !sexState ||
          !weightState ||
          !heightState ||
          !mailState ||
          !passwordState ||
          !ratioState
        ) {
          setChampManquant('un des champs est oublié ou mal rempli');
        } else if (error.response.data.message) {
          setChampManquant(error.response.data.message);
        }
      });
  };

  useEffect(() => {
    console.log('lastName', lastNameState);
    console.log('firstName', firstNameState);
    console.log('mail', mailState);
    console.log('age dans useEffect', ageState);
    console.log('password', passwordState);
    console.log('weight', weightState);
    console.log('height', heightState);
    console.log('sex', sexState);
    console.log('ratio', ratioState);
  });

  // creation de tableau avec les valeurs des options de nos select via une boucle for
  let taille = 1.19;
  let tailleOptions = [];

  for (let i = 0; i < 111; i++) {
    taille += 0.01;
    let res = Math.round(taille * 100) / 100;
    tailleOptions.push(res);
    // tailleOptions.push(taille.toFixed(2));
  }
  // console.log(tailleOptions);
  let poids = 29;
  let poidsOptions = [];

  for (let i = 0; i < 121; i++) {
    poids++;
    poidsOptions.push(poids);
  }
  // console.log(poidsOptions);
  let age = 6;
  let ageOptions = [];

  for (let i = 0; i < 71; i++) {
    age++;
    ageOptions.push(age);
  }
  console.log(ageOptions);

  return (
    <div>
      <div className='suscribe'>
        <h1>Inscris toi gratuitement!</h1>
      </div>

      <form
        method='POST'
        className='suscribeForm carotteFond'
        onSubmit={submitFunction}
      >
        <div className='mb-3'>
          <label htmlFor='inputNom' className='htmlForm-label text-center' />{' '}
          <input
            type='nom'
            className='htmlForm-control text-center '
            id='inputNom'
            placeholder='nom'
            onChange={lastNameFunction}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='inputPrenom' className='htmlForm-label text-center' />
          <input
            type='prenom'
            className='htmlForm-control text-center'
            id='inputPrenom'
            placeholder='prenom'
            onChange={firstNameFunction}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='inputMail' className='htmlForm-label text-center ' />
          <input
            type='email'
            className='htmlForm-control text-center'
            id='exampleInputAge'
            placeholder='mail'
            onChange={mailFunction}
          />
        </div>
        <div className='mb-3'>
          <label
            htmlFor='inputPassword'
            className='htmlForm-label text-center'
          />
          <input
            type='password'
            className='htmlForm-control text-center'
            id='inputPassword'
            placeholder='mot de passe'
            onChange={passwordFunction}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='inputAge' className='htmlForm-label text-center' />
          {/* <input
            type="age"
            className="htmlForm-control text-center"
            id="inputAge"
            placeholder="âge"
          /> */}
          <select
            name='age'
            id='inputAge'
            className='htmlForm-label text-center select'
            onChange={ageFunction}
            value={ageState}
          >
            <option key={uuidv4()} value=''>
              Sélectionner votre age{' '}
            </option>
            {ageOptions.map((ageOption) => (
              <option key={uuidv4()} value={ageOption}>
                {ageOption} ans
              </option>
            ))}
          </select>
        </div>
        <div className='mb-3'>
          <label htmlFor='inputWeight' className='htmlForm-label' />
          {/* <input
            type="weight"
            className="htmlForm-control"
            id="inputWeight"
            placeholder="poids(kg)"
          /> */}
          <select
            name='weight'
            id='inputWeight'
            className='htmlForm-label select'
            value={weightState}
            onChange={weightFunction}
          >
            <option key={uuidv4()} value=''>
              Sélectionner votre poids
            </option>
            {poidsOptions.map((poidsOption) => (
              <option key={uuidv4()} value={poidsOption}>
                {poidsOption} Kg
              </option>
            ))}
          </select>
        </div>
        <div className='mb-3'>
          <label htmlFor='inputHeight' className='htmlForm-label' />
          {/* <input
            type="height"
            className="htmlForm-control"
            id="inputHeight"
            placeholder="taille(cm)"
          /> */}
          <select
            name='height'
            id='inputHeight'
            className='htmlForm-label select'
            value={heightState}
            onChange={heightFunction}
          >
            <option key={uuidv4()} value=''>
              Sélectionner votre taille
            </option>
            {tailleOptions.map((tailleOption) => (
              <option key={uuidv4()} value={tailleOption}>
                {tailleOption} M
              </option>
            ))}
          </select>
        </div>
        <div className='mb-3'>
          <label htmlFor='inputGender' className='htmlForm-label' />
          {/* <input
            type="gender"
            className="htmlForm-control"
            id="inputGender"
            placeholder="sexe"
          /> */}
          <select
            name='gender'
            id='inputGender'
            className='htmlForm-label text-center select'
            value={sexState}
            onChange={sexFunction}
          >
            <option key={uuidv4()} value=''>
              Sélectionner votre sexe
            </option>
            <option key={uuidv4()} value='femme'>
              femme
            </option>
            <option key={uuidv4()} value='homme'>
              homme
            </option>
          </select>
        </div>
        <div className='mb-3'>
          <label htmlFor='inputRation' className='htmlForm-label' />
          {/* <input
            type="gender"
            className="htmlForm-control"
            id="inputGender"
            placeholder="sexe"
          /> */}
          <select
            name='ratio'
            id='inputRatio'
            className='htmlForm-label text-center select'
            value={ratioState}
            onChange={ratioFunction}
          >
            <option key={uuidv4()} value=''>
              Sélectionner votre activité
            </option>
            <option key={uuidv4()} value='1.375'>
              sédentaire (travail de bureau et faible activité physique)
            </option>
            <option key={uuidv4()} value='1.56'>
              activité physique légère (entraînement 1 à 3 fois par semaine)
            </option>
            <option key={uuidv4()} value='1.64'>
              activité physique modérée (entraînement 4 à 6 fois par semaine)
            </option>
            <option key={uuidv4()} value='1.82'>
              activité physique intense (plus de 6 entraînements par semaine)
            </option>
          </select>
        </div>
        <span className='messageDynamique'>{champManquant}</span>
        <SuscribeButton />
      </form>
    </div>
  );
};
export default Suscribe;
