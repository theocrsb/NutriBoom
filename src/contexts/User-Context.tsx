import axios from "axios";
import React, { createContext, ReactElement, useEffect, useState } from "react";
import useContext from "react";
import { PayloadToken, User } from "../pages/Main";
import jwt_decode from "jwt-decode";

// Mise en place d'un context afin de recuperer les données de l'utilisateur connecté sur l'ensemble des composants et page de l'APP

interface UserContextProps {
  children: ReactElement;
}
//  Interface avec le typage de la valeur qu'on va envoyer aux enfants du context

export interface UserContextInterface {
  user: User | undefined | null;
}
// Creation du context en l'initialisant avec une valeur  initial
export const UserContext = createContext<UserContextInterface>({ user: null });
//  Mise en place de la  logique afin de recuperer les informations qui sera ensuite partager aux enfants par le provider
export const UserContextProvider = ({ children }: UserContextProps) => {
  // Recuperation de l'utilisateur connecté et stockage de celui-ci dans un useState
  const [user, setUser] = useState<User | null>();
  let recupToken = localStorage.getItem("accesstoken");
  const searchUser = () => {
    if (recupToken) {
      let tokenDecoded: PayloadToken = jwt_decode(recupToken);
      console.log(tokenDecoded.username);
      return tokenDecoded.id;
    }
  };
  let userSearchId: string | undefined = searchUser();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${userSearchId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((response) => {
        console.log("response", response);
        setUser(response.data);
      })
      //si erreur token expiré -> on supprumer le token du localstorage pour gerer l'affichage
      .catch((error) => {
        console.log("error", error.response.data.statusCode);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem("accesstoken");
        }
      });
  }, []);
  // Dans le return nous declarons quelle sera la valeur retourné a nos enfants grace a notre provider via la synthaxe suivante
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
