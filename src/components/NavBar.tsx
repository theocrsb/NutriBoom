import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import "./Navbar.css";
import AboutUs from "../pages/AboutUs";

const Navbar = () => {
  let isConnected = true;
  let isAdmin = true
  return (
    <div id="hautNavBar">
      <nav className="navbar navbar-expand-md bg-transparent p-0">
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
                <NavLink
                  to="welcome"
                  className="nav-link buttonStyle navbar-collapse"
                >
                  <strong data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    Accueil
                  </strong>
                </NavLink>
              </li>
              {isConnected && (
                <li className="nav-item">
                  <NavLink to="main" className="nav-link buttonStyle ">
                    <strong
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNav"
                    >
                      Profil{" "}
                    </strong>
                  </NavLink>
                </li>
              )}
              {!isConnected && (
                <li className="nav-item">
                  <NavLink to="suscribe" className="nav-link buttonStyle ">
                    <strong
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNav"
                    >
                      Inscription
                    </strong>
                  </NavLink>
                </li>
              )}
              {!isConnected && (
                <li className="nav-item">
                  <NavLink to="connexion" className="nav-link buttonStyle ">
                    <strong
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNav"
                    >
                      {" "}
                      Connexion{" "}
                    </strong>
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <Link to="/welcome/#imc" className="nav-link buttonStyle ">
                  <strong data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    {" "}
                    Calculateur{" "}
                  </strong>
                </Link>
              </li>
              {isConnected && (
                <li className="nav-item">
                  <Link to="/moncompte" className="nav-link buttonStyle ">
                    <strong
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNav"
                    >
                      {" "}
                      Mon compte{" "}
                    </strong>
                  </Link>
                </li>
              )}
              {!isConnected && (
                <li className="nav-item">
                  <Link to="/aboutus" className="nav-link buttonStyle ">
                    <strong
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNav"
                    >
                      {" "}
                      Nous{" "}
                    </strong>
                  </Link>
                </li>
              )}
              {isAdmin && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link buttonStyle ">
                    <strong
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNav"
                    >
                      {" "}
                      Admin{" "}
                    </strong>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
