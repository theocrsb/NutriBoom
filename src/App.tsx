import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AuthContext } from "./contexts/Auth-context";
import { useContext, useEffect } from "react";
import NavBar from "./components/NavBar";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
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
import Admin from "./pages/AdminUsers";
import Page404 from "./pages/Page404";
import InscriptionOk from "./pages/InscriptionOk";
import SoumettezNous from "./pages/SoumettezNous";
import { UserContext, UserContextProvider } from "./contexts/User-Context";
import AdminFoods from "./pages/AdminFoods";
import AdminUsers from "./pages/AdminUsers";
import AdminMessage from "./pages/AdminMessages";
import AdminMessages from "./pages/AdminMessages";

const App = () => {
  const { savedToken } = useContext(AuthContext);
  const { userCo } = useContext(UserContext);
  console.log("save token dans app -----------", savedToken);
  console.log(
    "localStorage.getItem -----------",
    localStorage.getItem("accesstoken")
  );
  // if (localStorage.getItem('accesstoken') == null) {
  //   window.location.reload();
  // }
  return (
    <div>
      <BrowserRouter>
        <div id="#hautNavBar">
          <NavBar />
          {/* div mise en place pour test la bonne reception du token  */}
          {/* <div style={{ color: "white" }}>Saved : {savedToken}</div> */}
          {/*  div mise en place pour verifier la bonne reception du user connecté */}
          {/* <h1 style={{ color: "white" }}>UserMail : {userCo?.email}</h1> */}
        </div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/suscribe" element={<Suscribe />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route
            path="/main"
            element={
              savedToken !== null ? <Main /> : <Navigate to="/connexion" />
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
          <Route
            path="/admin/foods"
            element={
              savedToken !== null ? (
                <AdminFoods />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          ></Route>
          <Route
            path="/admin/users"
            element={
              savedToken !== null ? (
                <AdminUsers />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          ></Route>
          <Route
            path="/admin/messages"
            element={
              savedToken !== null ? (
                <AdminMessages />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          ></Route>
          <Route path="/*" element={<Page404 />}></Route>
          <Route path="/inscriptionok" element={<InscriptionOk />}></Route>
          <Route path="/ajout" element={<SoumettezNous />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
export default App;
