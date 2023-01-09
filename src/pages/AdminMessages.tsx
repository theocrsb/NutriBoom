import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

interface Message {
  id: number;
  name: string;
  mail: string;
  texteArea: string;
  createdAt: Date;
}

const AdminMessage = () => {
  const [messages, SetMessage] = useState<Message[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/mailto', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
        },
      })
      .then((response) => {
        // console.log(response);
        SetMessage(response.data);
      });
  }, []);
  console.log('messages', messages);
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    if (window.confirm('Veux-tu vraiment supprimer ce message ?')) {
      axios
        .delete(`http://localhost:8080/api/mailto/${e.currentTarget.value}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
          },
        })
        .then((response) => {
          console.log(response);
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
  return (
    <div>
      <div
        className='d-flex justify-content-center p-3'
        style={{ color: 'white' }}
      >
        <h2>Voici la liste des messages</h2>{' '}
      </div>
      {/* On map pour avoir autant de carte que de message */}
      {messages.map((x) => (
        <div key={x.id} className='list-group p-4'>
          <div className='list-group-item list-group-item-action flex-column align-items-start'>
            <div className='d-flex w-100 justify-content-between'>
              <h5 className='mb-1'>{x.mail}</h5>
              <small className='text-muted'>
                {new Date(x.createdAt).toLocaleDateString('fr')}
              </small>
            </div>
            <p className='mb-1'>{x.texteArea}</p>
            <div className='d-flex justify-content-between'>
              <small className='text-muted'>{x.name}</small>
              <div className=''>
                <button
                  style={{ color: 'white' }}
                  value={x.id}
                  className='buttonDeleteAliment'
                  onClick={handleDelete}
                >
                  <span className=''>❌</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMessage;
