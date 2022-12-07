import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Welcome from './pages/Welcome';
import Suscribe from './pages/Suscribe';
import AboutUs from './pages/AboutUs';
import Main from './pages/Main';
import Footer from "./components/Footer";
import Connexion from './pages/Connexion';


const App = ()=>{
 
  return(
    <div>
      <BrowserRouter>
      <NavBar/>
      <Routes>
      <Route path = "/" element = {<Welcome/>}/>
      <Route path = "/welcome" element = {<Welcome/>}/>
      <Route path = "/suscribe" element = {<Suscribe/>}/>
      <Route path = "/aboutus" element = {<AboutUs/>}/>
      <Route path = "/main" element = {<Main/>}/>
      <Route path = "/connexion" element = {<Connexion/>}/>
      </Routes>
      </BrowserRouter>
       <Footer/>
    </div>
  )
}
export default App;
