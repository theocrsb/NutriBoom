import axios from 'axios';
import React, { createContext, ReactElement, useEffect, useState } from 'react';
import useContext from 'react';
import { PayloadToken, User } from '../pages/Main';
import jwt_decode from 'jwt-decode';

// Mise en place d'un context afin de recuperer les données de l'utilisateur connecté sur l'ensemble des composants et page de l'APP

interface UserContextProps {
  children: ReactElement;
}
//  Interface avec le typage de la valeur qu'on va envoyer aux enfants du context

export interface UserContextInterface {
  userCo: User | undefined | null;
  onUserChange: (user: User | undefined | null) => void;
}
// Creation du context en l'initialisant avec une valeur  initial
export const UserContext = createContext<UserContextInterface>({
  userCo: null,
  onUserChange: (user: User | undefined | null) => {},
});
//  Mise en place de la  logique afin de recuperer les informations qui sera ensuite partager aux enfants par le provider
export const UserContextProvider = ({ children }: UserContextProps) => {
  // Recuperation de l'utilisateur connecté et stockage de celui-ci dans un useState
  let userCo: User | undefined | null;
  const [user, setUser] = useState<User | null | undefined>(
    userCo ? userCo : null
  );
  let recupToken = localStorage.getItem('accesstoken');
  const searchUser = () => {
    if (recupToken) {
      let tokenDecoded: PayloadToken = jwt_decode(recupToken);
      console.log(tokenDecoded.username);
      return tokenDecoded.id;
    }
  };
  let userSearchId: string | undefined = searchUser();
  //  mise en place du useEffect + requete get  afin de ne pas perdre l'utilisateur connecté lors d'une reactualisation de la page

  useEffect(() => {
    axios
      .get(`http://api-nutriboom.dev-formation.fr/api/users/${userSearchId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
        },
      })
      .then((response) => {
        console.log('response', response);
        setUser(response.data);
      })
      //si erreur token expiré -> on supprumer le token du localstorage pour gerer l'affichage
      .catch((error) => {
        console.log('error', error.response.data.statusCode);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem('accesstoken');
        }
      });
  }, []);
  console.log('verification de user', user);

  // mise en place de la fonction qui recupera l'utilisateur co dans la main de facon dynamique

  const handleUserChange = (user: User | null | undefined) => {
    setUser(user);
  };

  const userContextValue = {
    userCo: user,
    onUserChange: handleUserChange,
  };
  console.log("voici l'utilisateur connecté", userCo);

  // Dans le return nous declarons quelle sera la valeur retourné a nos enfants grace a notre provider via la synthaxe suivante
  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
