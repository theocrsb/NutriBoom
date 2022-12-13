import React, { useRef, useState, SyntheticEvent, useContext } from "react";
import { NavLink } from "react-router-dom";
// import { HashLink as NavLink } from "react-router-hash-link";
import { AuthContext } from "../contexts/Auth-context";
import "./Navbar.css";
import AboutUs from "../pages/AboutUs";

const Navbar = () => {
  const { savedToken } = useContext(AuthContext);

  const tokenVerify = (e: SyntheticEvent) => {
    if (savedToken === null) {
      e.preventDefault();
    }
  };
  // let isConnected = true;
  // let isAdmin = true;
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
              <li className="nav-item">
                <NavLink to="/welcome/#imc" className="nav-link buttonStyle ">
                  <strong data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    {" "}
                    Calculateur{" "}
                  </strong>
                </NavLink>
              </li>

              {/* {!isConnected && ( */}
              <li className="nav-item">
                <NavLink to="suscribe" className="nav-link buttonStyle ">
                  <strong data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    Inscription
                  </strong>
                </NavLink>
              </li>
              {/* )} */}
              {/* {!isConnected && ( */}
              <li className="nav-item">
                <NavLink to="connexion" className="nav-link buttonStyle ">
                  <strong data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    {" "}
                    Connexion{" "}
                  </strong>
                </NavLink>
              </li>
              {/* )} */}
              {/* {isConnected && ( */}
              <li className="nav-item">
                <NavLink to="/moncompte" className="nav-link buttonStyle ">
                  <strong data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    {" "}
                    Mon compte{" "}
                  </strong>
                </NavLink>
              </li>
              {/* )} */}
              {/* {isConnected && ( */}
              <li className="nav-item">
                <NavLink to="main" className="nav-link buttonStyle ">
                  <strong data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    Journal de bord{" "}
                  </strong>
                </NavLink>
              </li>
              {/* )} */}

              {/* {!isConnected && (
              <li className="nav-item">
                <NavLink to="/aboutus" className="nav-link buttonStyle ">
                  <strong data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    {" "}
                    Nous{" "}
                  </strong>
                </NavLink>
              </li>
              )} */}
              {/* {isAdmin && ( */}
              <li className="nav-item">
                <NavLink to="/admin" className="nav-link buttonStyle ">
                  <strong data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    {" "}
                    Admin{" "}
                  </strong>
                </NavLink>
              </li>
              {/* )} */}
              <input
                type="button"
                value="déconnexion"
                className="btn btn-danger btn-sm m-1"
              />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
