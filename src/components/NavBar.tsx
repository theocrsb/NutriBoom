import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import AboutUs from "../pages/AboutUs";

const Navbar = () => {
  const [navShow, setNavShow] = useState<boolean>(false);
  // fonction crée pour la fermeture de la navbar lorsqu'on clique sur un des onglets avec modification des classe via un ternaire au du code jsx  "non terminé a poursuive ulterieurement"
  const handleClickbtn = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    // if (navShow) {
    //   setNavShow(false);
    // } else {
    //   setNavShow(true);
    // }
    console.log("classe de navbar", e.currentTarget.classList);
    console.log("navshow", navShow);
  };
  const handleClick = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    // let classValue = e.currentTarget.classList.value;
    // if (classValue === "collapse navbar-collapse") {
    //   setNavShow(true);
    // } else if (classValue === "collapse navbar-collapse show") {
    //   setNavShow(false);
    // } else {
    //   return;
    // }
    console.log("classe de navbar", e.currentTarget.classList);
    console.log("navshow", navShow);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-transparent p-0">
        <div className="container-fluid p-0">
          <NavLink to="welcome" className="navbar-brand p-0 m-0">
            <div className="bg-logo">
              <div className="container-logo">
                {/* <img
                className="logo"
                src={process.env.PUBLIC_URL + `/assets/nutriboom.png`}
                alt="logo"
              /> */}
              </div>
            </div>
          </NavLink>
          <button
            // onClick={handleClickbtn}
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                {/* <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a> */}
                <NavLink
                  to="welcome"
                  className="nav-link buttonStyle navbar-collapse"
                  // onClick={handleClick}
                >
                  <strong>Accueil</strong>
                </NavLink>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="#">
                  Features
                </a> */}
                <NavLink to="main" className="nav-link buttonStyle ">
                  Profil
                </NavLink>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="#">
                  Pricing
                </a> */}
                <NavLink to="suscribe" className="nav-link buttonStyle ">
                  Inscription
                </NavLink>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link disabled">Disabled</a> */}
                <NavLink to="Dashboard" className="nav-link buttonStyle ">
                  Calculateur
                </NavLink>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link disabled">Disabled</a> */}
                <NavLink to="Dashboard" className="nav-link buttonStyle ">
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
