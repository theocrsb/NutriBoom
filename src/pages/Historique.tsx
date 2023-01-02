import React from 'react';
import './Historique.css';

const Historique = () => {
  const today = new Date();
  const jAjd = today.getDay();
  const mAjd = today.getMonth();
  const aAjd = today.getFullYear();
  const dateAjd = `${jAjd}/${mAjd}/${aAjd}`;
  console.log('dateAjd', dateAjd);
  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    alert(e.currentTarget.value);
  };
  return (
    <div>
      <div className='d-flex flex-wrap justify-content-center'>
        <h1 className='textColor w-100'>Historique</h1>
        <input
          className='w-25 mb-5'
          type='date'
          id='start'
          name='trip-start'
          //   value=''
          min='2022-01-01'
          max='2999-12-31'
          onChange={handleChange}
        />
      </div>
      <div className='card' style={{ width: '18rem' }}>
        <div className='card-body'>
          <h5 className='card-title text-center'>Card title</h5>
          <p className='card-text'>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item text-center'>Cras justo odio</li>
          <li className='list-group-item text-center'>
            Dapibus ac facilisis in
          </li>
          <li className='list-group-item text-center'>Vestibulum at eros</li>
        </ul>
      </div>
    </div>
  );
};

export default Historique;
