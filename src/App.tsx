import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { AuthContext } from "./contexts/Auth-context";
import { useContext } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Suscribe from "./pages/Suscribe";
import AboutUs from "./pages/AboutUs";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import Connexion from "./pages/Connexion";
import AddBreakfast from "./pages/AddBreakfast";
import AddLunch from "./pages/AddLunch";
import AddDinner from "./pages/AddDinner";
import AddSnack from "./pages/AddSnack";
import AddExercice from "./pages/AddExercice";
import UpdateProfil from "./pages/UpdateProfil";
import DeleteAccount from "./pages/DeleteAccount";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import Page404 from "./pages/Page404";
import InscriptionOk from "./pages/InscriptionOk";
import { User } from "./pages/Main";
import axios from "axios";
let result: any;
const App = () => {
  let recupUser;
  let recupAllUser;
  const { savedToken } = useContext(AuthContext);
  const allUsers = (e: string) => {
    // recupAllUser = allUserTransfert;
    console.log(
      "verification de la bonne reception du user connecté via le props",
      e
    );
  };

  console.log("verification de recupAllUser apres fonction", recupAllUser);

  const userConnect = (e: User | undefined) => {
    // recupUser = userTransfert;
    console.log(
      "verification de la bonne reception du user connecté via le props",
      e
    );
  };
  console.log("verification de recupUser apres fonction", recupUser);
  allUsers(result);

  return (
    <div>
      <BrowserRouter>
        <div id="#hautNavBar">
          <NavBar />
          {/* div mise en place pour test la bonne reception du token  */}
          {/* <div style={{ color: "white" }}>Saved : {savedToken}</div> */}
        </div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/suscribe" element={<Suscribe />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route
            path="/main"
            element={
              savedToken !== null ? (
                <Main userTransfert={userConnect} allUserTransfert={allUsers} />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          />
          <Route path="/connexion" element={<Connexion />} />
          <Route
            path="/petitdejeuner"
            element={
              savedToken !== null ? (
                <AddBreakfast />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          ></Route>
          <Route
            path="/dejeuner"
            element={
              savedToken !== null ? <AddLunch /> : <Navigate to="/connexion" />
            }
          ></Route>
          <Route
            path="/diner"
            element={
              savedToken !== null ? <AddDinner /> : <Navigate to="/connexion" />
            }
          ></Route>
          <Route
            path="/collation"
            element={
              savedToken !== null ? <AddSnack /> : <Navigate to="/connexion" />
            }
          ></Route>
          <Route
            path="/exercices"
            element={
              savedToken !== null ? (
                <AddExercice />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          ></Route>
          <Route
            path="/modifierprofil"
            element={
              savedToken !== null ? (
                <UpdateProfil />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          ></Route>
          <Route
            path="/supprimercompte"
            element={
              savedToken !== null ? (
                <DeleteAccount />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          ></Route>
          <Route
            path="/moncompte"
            element={
              savedToken !== null ? <Account /> : <Navigate to="/connexion" />
            }
          ></Route>
          <Route
            path="/admin"
            element={
              savedToken !== null ? <Admin /> : <Navigate to="/connexion" />
            }
          ></Route>
          <Route path="/*" element={<Page404 />}></Route>
          <Route path="/inscriptionok" element={<InscriptionOk />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
export default App;
