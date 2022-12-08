import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Suscribe from "./pages/Suscribe";
import AboutUs from "./pages/AboutUs";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import Connexion from './pages/Connexion';
import AddBreakfast from './pages/AddBreakfast';
import AddLunch from './pages/AddLunch';
import AddDinner from './pages/AddDinner';
import AddSnack from './pages/AddSnack';
import AddExercice from './pages/AddExercice';
import UpdateProfil from './pages/UpdateProfil';
import DeleteAccount from './pages/DeleteAccount';
import Account from './pages/Account';

const App = ()=>{
 
  return(
    <div>
      <BrowserRouter>
      <div id="#hautNavBar">
      <NavBar/>
      </div>
      <Routes>
      <Route path = "/" element = {<Welcome/>}/>
      <Route path = "/welcome" element = {<Welcome/>}/>
      <Route path = "/suscribe" element = {<Suscribe/>}/>
      <Route path = "/aboutus" element = {<AboutUs/>}/>
      <Route path = "/main" element = {<Main/>}/>
      <Route path = "/connexion" element = {<Connexion/>}/>
      <Route path = "/petitdejeuner" element = {<AddBreakfast/>}></Route>
      <Route path = "/dejeuner" element = {<AddLunch/>}></Route>
      <Route path = "/diner" element = {<AddDinner/>}></Route>
      <Route path = "/collation" element = {<AddSnack/>}></Route>
      <Route path = "/exercices" element = {<AddExercice/>}></Route>
      <Route path = "/modifierprofil" element = {<UpdateProfil/>}></Route>
      <Route path = "/supprimercompte" element = {<DeleteAccount/>}></Route>
      <Route path = "/moncompte" element = {<Account/>}></Route>
      
      </Routes>
      </BrowserRouter>
       
    </div>
  );
};
export default App;
