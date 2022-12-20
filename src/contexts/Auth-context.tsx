import { createContext, useState, ReactElement } from "react";
import { PayloadToken } from "../pages/Main";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  children: ReactElement;
}

export interface AuthContextInterface {
  savedToken: string | null;
  onAuthChange: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  savedToken: null,
  onAuthChange: (token: string | null) => {},
});
export const AuthContextProvider = ({ children }: AuthContextProps) => {
  /**
   * Mise en place de la logique interne de notre context
   * Cela permet de mettre à dispo une fonction pour mettre
   * à jour l'état de connection de notre utilisateur
   * et d'accéder au token via notre context
   */

  // }
  // test sur le token
  // const dateToken = () => {
  //   if (recupToken) {
  //     let decoded: PayloadToken = jwt_decode(recupToken);
  //     console.log("token decoder", decoded.exp);
  //     return decoded.exp;
  //   }
  // };
  // let tokenDecoded: number | undefined = dateToken();
  // console.log(Date.now());
  // let aujourdhui = Date.now();
  // console.log(new Date(aujourdhui));
  // console.log(tokenDecoded);
  // console.log(new Date(tokenDecoded ? tokenDecoded : 0));
  // const d = new Date(0);
  // d.setUTCSeconds(tokenDecoded ? tokenDecoded : 0);

  // console.log(
  //   "resultat de la date apres utilisation de la methode setUTCSeconds",
  //   d.getDate()
  // );
  let recupToken: string | null;
  recupToken = localStorage.getItem("accesstoken");
  const [token, setToken] = useState<string | null>(
    recupToken ? recupToken : null
  );

  const handleAuthChange = (token: string | null) => {
    setToken(token);
  };

  const contextValue = {
    savedToken: token,
    onAuthChange: handleAuthChange,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
