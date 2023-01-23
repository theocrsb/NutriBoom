import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './Admin.css';
import { Activity } from './Main';

import { BsTrashFill } from 'react-icons/bs';
import { ImEye, ImEyeMinus, ImEyePlus } from 'react-icons/im';
let convertValue: boolean;
let allActivity: Activity[] = [];
const AdminActivity = () => {
  // Ajout du navigate
  const navigate = useNavigate();
  const [updateModerate, setUpdateModerate] = useState<boolean>();
  const [clickedIndexInvisible, setClickedIndexInvisible] = useState<number[]>(
    []
  );
  const [clickedIndexVisible, setClickedIndexVisible] = useState<number[]>([]);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [validateState, setValidateState] = useState<string>();
  const [Activity, setActivity] = useState<Activity[]>([]);
  // const booleanFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   console.log(
  //     "--------------setValidateState(e.currentTarget.value)",
  //     e.currentTarget.value
  //   );
  //   setValidateState(e.currentTarget.value);
  // };

  useEffect(() => {
    axios
      .get('http://api-nutriboom.dev-formation.fr/api/activity', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
        },
      })
      .then((res) => {
        console.log('mes activites', res.data);
        // allActivity = res.data;
        setActivity(res.data);
        console.log('mes  activités dans le state', Activity);
      })
      .catch((error) => {
        console.log('something went wrong', error);
      });
  }, []);

  // const ModerateFunction = (e: React.SyntheticEvent<HTMLSelectElement>) => {
  //   if (e.currentTarget.value) {
  //     if (e.currentTarget.value === "true") {
  //       convertValue = true;
  //     } else if (e.currentTarget.value === "false") {
  //       convertValue = false;
  //     }
  //   }
  //   console.log(
  //     "value moderate fonction -------------------",
  //     e.currentTarget.value
  //   );
  //   setUpdateModerate(e.currentTarget.value);
  // };
  const fonctionTest = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(
      'voici le resultat du test valeur du state update moderate',
      updateModerate
    );
  };
  const handleCheck = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log('handlecheckValue', e.currentTarget.value);
    setValidateState(e.currentTarget.value);
  };
  // axios
  //   .patch(
  //     `http://api-nutriboom.dev-formation.fr/api/activity`,
  //     {
  //       validate: patchState,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
  //       },
  //     }
  //   )
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);

  //     if (error.response.data.statusCode === 401) {
  //       localStorage.removeItem("accesstoken");
  //       navigate("/connexion");
  //     }
  //   });
  const handleDeleteli = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    if (window.confirm('Veux-tu vraiment supprimer cette activité?')) {
      axios
        .delete(
          `http://api-nutriboom.dev-formation.fr/api/activity/${e.currentTarget.value}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
            },
          }
        )
        .then((response) => {
          window.location.reload();
          // navigate('/main');
        })
        .catch((error) => {
          console.log('tu ne peux pas poster', error);
          if (error.response.data.statusCode === 401) {
            localStorage.removeItem('accesstoken');
            navigate('/connexion');
          }
        });
    }
  };
  // console.log("------------Activity", Activity);
  // let mesActivitésFilter: any = [];
  // if (Activity) {
  //   for (let i = 0; i < Activity.length; i++) {
  //     if (Activity[i].validate.toString() === validateState) {
  //       mesActivitésFilter.push(Activity[i]);
  //       console.log("+++++++++++++++++validateState boucle", validateState);
  //       console.log(
  //         "+++++++++++++++++Activity[i]",
  //         Activity[i].validate.toString()
  //       );
  //       console.log(
  //         "-----------------mesActivitésFilter après boucle",
  //         mesActivitésFilter
  //       );
  //     }
  //   }
  // }

  const updateFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.value);

    console.log('cliké');
    console.log("id de l'activité a patch", e.currentTarget.value);

    axios
      .patch(
        `http://api-nutriboom.dev-formation.fr/api/activity/${e.currentTarget.value}`,
        {
          // id: e.currentTarget.value,
          // updateActivity: { validate: validateState },
          validate: updateModerate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
          },
        }
      )
      .then((response) => {
        console.log('___________________response', response);
        console.log(
          '___________________response.data.validate',
          response.data.validate
        );

        // setTimeout(() => {
        //   navigate("/main");
        // }, 1000);
        alert('Modifications sauvegardées !');
        console.log('-----------------sauvegarde');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        console.log(
          "id de l'activité à patch dans le catch",
          e.currentTarget.value
        );
        alert(`${error.response.data.message}`);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem('accesstoken');
          navigate('/connexion');
        }
      });
  };
  let mesActivityFilter = [];
  if (Activity) {
    for (let i = 0; i < Activity.length; i++) {
      if (Activity[i].validate.toString() === validateState) {
        mesActivityFilter.push(Activity[i]);
      }
    }
  }

  return (
    <div className='container-food'>
      {/* <select
        name="food"
        id="foodAdmin"
        className="htmlForm-label select"
        // value={weightState}
        onChange={booleanFunction}
      >
        <option key={uuidv4()} value="">
          Sélectionner une valeur
        </option>
        <option key={uuidv4()} value="true">
          true
        </option>
        <option key={uuidv4()} value="false">
          false
        </option>
      </select> */}
      <section className='container-admin'>
        <div className='triFood'>
          <h2>Gestion des activités à afficher</h2>
          <br />
          <div className='checkbox-container'>
            <div className='checkbox'>
              <input
                className='form-check-input'
                type='radio'
                id='trueRadio'
                name='select'
                value='true'
                onClick={handleCheck}
              />
              <label className='form-check-label' htmlFor='true'>
                Affiché
              </label>
            </div>

            <div className='checkbox'>
              <input
                className='form-check-input'
                type='radio'
                id='falseRadio'
                name='select'
                value='false'
                onClick={handleCheck}
              />
              <label className='form-check-label' htmlFor='false'>
                Masqué
              </label>
            </div>
            <div className='checkbox'>
              <input
                className='form-check-input'
                type='radio'
                id='allRadio'
                name='select'
                value='all'
                defaultChecked
                onInput={handleCheck}
              />
              <label className='form-check-label' htmlFor='all'>
                Tous
              </label>
            </div>
          </div>
        </div>
        <ul className='list-food'>
          {validateState === 'true' || validateState === 'false'
            ? //  mesFoods
              //     .filter((food) =>
              //       food.validate.toString().includes(validateState)
              //     )
              mesActivityFilter.map((activityfiltered, i) => (
                <li key={i}>
                  <div className='container text-center'>
                    <div className='row test-li'>
                      <div className='col'>
                        {activityfiltered.validate === true ? (
                          <p className='text'>
                            <span style={{ color: 'green' }}>visible</span>
                          </p>
                        ) : (
                          <p className='text'>
                            <span style={{ color: 'red' }}> invisible</span>
                          </p>
                        )}
                      </div>
                      <div className='col'>
                        {activityfiltered.name}, {activityfiltered.conso_cal_1h}
                        kcal/h
                      </div>
                      <div className='col'>
                        {' '}
                        <select
                          name='food'
                          id='foodAdmin'
                          className=' htmlForm-label select'
                          defaultValue=''
                          onInput={(
                            e: React.SyntheticEvent<HTMLSelectElement>
                          ) => {
                            let convertValue;
                            if (e.currentTarget.value) {
                              if (e.currentTarget.value === 'true') {
                                convertValue = true;
                              } else if (e.currentTarget.value === 'false') {
                                convertValue = false;
                              }
                            }
                            console.log(
                              'value moderate fonction -------------------',
                              e.currentTarget.value
                            );
                            console.log('index', i);
                            if (clickedIndexVisible && clickedIndexInvisible) {
                              if (convertValue) {
                                let newtab1 = clickedIndexInvisible.filter(
                                  (element) => element !== i
                                );
                                console.log('newtab 1', newtab1);

                                setClickedIndexInvisible(newtab1);
                                setClickedIndexVisible([
                                  ...clickedIndexVisible,
                                  i,
                                ]);
                              } else {
                                let newtab2 = clickedIndexVisible.filter(
                                  (element) => element !== i
                                );
                                console.log('newtab 2', newtab2);

                                setClickedIndexInvisible([
                                  ...clickedIndexInvisible,
                                  i,
                                ]);
                                setClickedIndexVisible(newtab2);
                              }
                            }
                            setUpdateModerate(convertValue);
                            setClickedIndex(i);
                            console.log(
                              'tableau verife avec decalage ',
                              clickedIndexInvisible,
                              clickedIndexVisible
                            );
                          }}
                        >
                          <option
                            // key={i + 2}
                            value=''
                            disabled
                          >
                            Sélectionner un choix
                          </option>
                          <option key={i + 1} value='true'>
                            Affiché
                          </option>

                          <option key={i + 2} value='false'>
                            Masqué
                          </option>
                        </select>
                      </div>
                      <div className='col btn-gestion'>
                        {' '}
                        <button
                          className='buttonValidate'
                          onClick={handleDeleteli}
                          value={activityfiltered.id}
                        >
                          <BsTrashFill className='trash' />
                        </button>
                        {/* <button style={{ color: "red" }} onClick={fonctionTest}>
                        test update
                      </button> */}
                        {updateModerate === false || updateModerate === true ? (
                          clickedIndexVisible.find(
                            (element) => element === i
                          ) === i ||
                          clickedIndexInvisible.find(
                            (element) => element === i
                          ) === i ? (
                            clickedIndexVisible.find(
                              (element) => element === i
                            ) === i ? (
                              <button
                                key={i + 5}
                                className='buttonValidate'
                                value={activityfiltered.id}
                                onClick={updateFunction}
                              >
                                <ImEyePlus className='iconVisible' />
                              </button>
                            ) : clickedIndexInvisible.find(
                                (element) => element === i
                              ) === i ? (
                              <button
                                key={i + 6}
                                className='buttonValidate'
                                value={activityfiltered.id}
                                onClick={updateFunction}
                              >
                                <ImEyeMinus className='iconInvisible' />
                              </button>
                            ) : (
                              <button
                                key={i + 7}
                                className='buttonValidate'
                                value={activityfiltered.id}
                                disabled
                                onClick={updateFunction}
                              >
                                <ImEye className='iconNeutre' />
                              </button>
                            )
                          ) : (
                            <button
                              key={i + 7}
                              className='buttonValidate'
                              value={activityfiltered.id}
                              disabled
                              onClick={updateFunction}
                            >
                              <ImEye className='iconNeutre' />
                            </button>
                          )
                        ) : (
                          <button
                            key={i + 7}
                            className='buttonValidate'
                            value={activityfiltered.id}
                            disabled
                            onClick={updateFunction}
                          >
                            <ImEye className='iconNeutre' />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))
            : Activity.map((activite, i) => (
                <li key={i}>
                  <div className='container text-center'>
                    <div className='row test-li'>
                      <div className='col'>
                        {' '}
                        {activite.validate === true ? (
                          <p className='text'>
                            {' '}
                            <span style={{ color: 'green' }}>visible</span>
                          </p>
                        ) : (
                          <p className='text'>
                            {' '}
                            <span style={{ color: 'red' }}>invisible</span>
                          </p>
                        )}
                      </div>
                      <div className='col'>
                        {activite.name},{activite.conso_cal_1h} kcal/h
                      </div>
                      <div className='col'>
                        {' '}
                        <select
                          name='food'
                          id='foodAdmin'
                          className=' htmlForm-label select'
                          defaultValue=''
                          onInput={(
                            e: React.SyntheticEvent<HTMLSelectElement>
                          ) => {
                            let convertValue;
                            if (e.currentTarget.value) {
                              if (e.currentTarget.value === 'true') {
                                convertValue = true;
                              } else if (e.currentTarget.value === 'false') {
                                convertValue = false;
                              }
                            }
                            console.log(
                              'value moderate fonction -------------------',
                              e.currentTarget.value
                            );
                            console.log('index', i);
                            if (clickedIndexVisible && clickedIndexInvisible) {
                              if (convertValue) {
                                let newtab1 = clickedIndexInvisible.filter(
                                  (element) => element !== i
                                );
                                console.log('newtab 1', newtab1);

                                setClickedIndexInvisible(newtab1);
                                setClickedIndexVisible([
                                  ...clickedIndexVisible,
                                  i,
                                ]);
                              } else {
                                let newtab2 = clickedIndexVisible.filter(
                                  (element) => element !== i
                                );
                                console.log('newtab 2', newtab2);

                                setClickedIndexInvisible([
                                  ...clickedIndexInvisible,
                                  i,
                                ]);
                                setClickedIndexVisible(newtab2);
                              }
                            }
                            setUpdateModerate(convertValue);
                            setClickedIndex(i);
                            console.log(
                              'tableau verife avec decalage ',
                              clickedIndexInvisible,
                              clickedIndexVisible
                            );
                          }}
                        >
                          <option
                            // key={i + 2}
                            value=''
                            disabled
                          >
                            Sélectionner un choix
                          </option>
                          <option key={i + 1} value='true'>
                            Affiché
                          </option>

                          <option key={i + 2} value='false'>
                            Masqué
                          </option>
                        </select>
                      </div>
                      <div className='col btn-gestion'>
                        {' '}
                        <button
                          className='buttonValidate'
                          onClick={handleDeleteli}
                          value={activite.id}
                        >
                          <BsTrashFill className='trash' />
                        </button>
                        {/* <button style={{ color: "red" }} onClick={fonctionTest}>
                        test update
                      </button> */}
                        {updateModerate === false || updateModerate === true ? (
                          clickedIndexVisible.find(
                            (element) => element === i
                          ) === i ||
                          clickedIndexInvisible.find(
                            (element) => element === i
                          ) === i ? (
                            clickedIndexVisible.find(
                              (element) => element === i
                            ) === i ? (
                              <button
                                key={i + 5}
                                className='buttonValidate'
                                value={activite.id}
                                onClick={updateFunction}
                              >
                                <ImEyePlus className='iconVisible' />
                              </button>
                            ) : clickedIndexInvisible.find(
                                (element) => element === i
                              ) === i ? (
                              <button
                                key={i + 6}
                                className='buttonValidate'
                                value={activite.id}
                                onClick={updateFunction}
                              >
                                <ImEyeMinus className='iconInvisible' />
                              </button>
                            ) : (
                              <button
                                key={i + 7}
                                className='buttonValidate'
                                value={activite.id}
                                disabled
                                onClick={updateFunction}
                              >
                                <ImEye className='iconNeutre' />
                              </button>
                            )
                          ) : (
                            <button
                              key={i + 7}
                              className='buttonValidate'
                              value={activite.id}
                              disabled
                              onClick={updateFunction}
                            >
                              <ImEye className='iconNeutre' />
                            </button>
                          )
                        ) : (
                          <button
                            key={i + 7}
                            className='buttonValidate'
                            value={activite.id}
                            disabled
                            onClick={updateFunction}
                          >
                            <ImEye className='iconNeutre' />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
        </ul>
      </section>
    </div>
  );
};
export default AdminActivity;
