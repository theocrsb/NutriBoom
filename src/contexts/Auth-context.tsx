import { createContext, useState, useEffect, ReactElement } from "react";
import { PayloadToken } from "../pages/Main";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  children: ReactElement;
}

export interface AuthContextInterface {
  savedToken: string | null;
  onAuthChange: (token: string | null) => void;
  verifToken: boolean;
}

export const AuthContext = createContext<AuthContextInterface>({
  savedToken: null,
  verifToken: true,
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
  const current_time = Date.now()/1000

  const [token, setToken] = useState<string | null>(
    recupToken ? recupToken : null
  );

     const [tokenExpired, setTokenExpired] =useState<boolean>(true)
    const[test, setTest] =useState<JwtPayload>()

 
  const handleAuthChange = (token: string | null) => {
    setToken(token);
  };

 useEffect(() => {
  const current_time = Date.now() /1000
    if (recupToken) {
      const decoded: PayloadToken = jwt_decode(recupToken);
      console.log("Test token récupéré", decoded);
      if (decoded.exp < current_time){
        setTokenExpired(false)
      }else{
        setTokenExpired(true)
      }
    }
  });


  const expiredAuthChange = (tokenExpired:boolean)=>{  
  setTokenExpired(tokenExpired)
  }

  console.log("test token payload",token)
  console.log("test token expired",tokenExpired)
  console.log("jwt décodé",test)

 
  

  const contextValue = {
    savedToken: token,
    verifToken:tokenExpired,
    onAuthChange: handleAuthChange,
   
  };

  

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
