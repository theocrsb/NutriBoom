import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import AboutUs from "../pages/AboutUs";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-transparent p-0">
        <div className="container-fluid p-0">
          {/* <a className="navbar-brand" href="#">
            Navbar
          </a> */}
          <NavLink to="Home" className="navbar-brand p-0 m-0">
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
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon m-10"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                {/* <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a> */}
                <NavLink to="welcome" className="nav-link buttonStyle">
                  <strong>Accueil</strong>
                </NavLink>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="#">
                  Features
                </a> */}
                <NavLink to="main" className="nav-link buttonStyle ">
                  <strong>Profil</strong>
                </NavLink>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="#">
                  Pricing
                </a> */}
                <NavLink to="subscribe" className="nav-link buttonStyle ">
                  <strong>Inscription</strong>
                </NavLink>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link disabled">Disabled</a> */}
                <NavLink to="Dashboard" className="nav-link buttonStyle ">
                  <strong>Calculateur</strong>
                </NavLink>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link disabled">Disabled</a> */}
                <NavLink to="Dashboard" className="nav-link buttonStyle ">
                  <strong>About Us</strong>
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
