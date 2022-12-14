import { createContext, useState, ReactElement } from "react";

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

  let recupToken;
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
