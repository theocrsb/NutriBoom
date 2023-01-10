import React, {
  useRef,
  useState,
  SyntheticEvent,
  useContext,
  useEffect,
} from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { AuthContext } from "../contexts/Auth-context";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import AboutUs from "../pages/AboutUs";
import jwt_decode from "jwt-decode";
import { PayloadToken } from "../pages/Main";

const Navbar = () => {
  const navigate = useNavigate();
  const [tokenRole, setTokenRole] = useState<string>();
  const { savedToken } = useContext(AuthContext);
  const {valideTimeToken}=useContext(AuthContext)
  const{tokenFunction}= useContext(AuthContext)
  console.log("voici le resultat pour savedToken", savedToken);
  console.log("TOKEN ROLE DANS NAVBAR", tokenRole);
// tokenFunction(savedToken)
// console.log(tokenFunction(savedToken))
  

  useEffect(() => {
    
    if (savedToken) {
      const decoded: PayloadToken = jwt_decode(savedToken);
      console.log("le payload", decoded.role);
      setTokenRole(decoded.role);
      if(valideTimeToken === "token expiré"){
        window.location.reload()
      }
    }
  });

  const tokenVerify = (e: SyntheticEvent) => {
    
    console.log("valide time token verify",valideTimeToken)
    if (!localStorage.getItem("accesstoken")) {
      window.location.reload();
    }
  };
  const handleClickDecoBtn = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let monToken = localStorage.getItem("accesstoken");
    console.log("----------etat local storage avant deco", monToken);
    localStorage.removeItem("accesstoken");
    monToken = localStorage.getItem("accesstoken");
    console.log("----------etat local storage apres deco", monToken);
    navigate("/");
    window.location.reload();

    // setTimeout(() => {

    // }, 2500);
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
                <HashLink to="/welcome/#imc" className="nav-link buttonStyle ">
                  <strong data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    {" "}
                    Calculateur{" "}
                  </strong>
                </HashLink>
              </li>

              {(!savedToken && (
                <>
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
                </>
              )) || (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="moncompte"
                      className="nav-link buttonStyle"
                      onClick={tokenVerify}
                    >
                      <strong
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                      >
                        {" "}
                        Mon compte{" "}
                      </strong>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="main"
                      className="nav-link buttonStyle "
                      onClick={tokenVerify}
                    >
                      <strong
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                      >
                        Journal de bord{" "}
                      </strong>
                    </NavLink>
                  </li>
                  {tokenRole === "admin" && (
                    <li className="nav-item dropdown">
                      <NavLink
                        to="/"
                        className="nav-link buttonStyle  dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={tokenVerify}
                      >
                        <strong
                        // data-bs-toggle="collapse"
                        // data-bs-target="#navbarNav"
                        >
                          {" "}
                          Admin{" "}
                        </strong>
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li>
                          {/* <a className="dropdown-item" href="#">
                            Action
                          </a> */}
                          <NavLink
                            to="/adminFoods"
                            className="nav-link buttonStyle "
                            onClick={tokenVerify}
                          >
                            <strong> Gestion des aliments </strong>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/adminUsers"
                            className="nav-link buttonStyle "
                            onClick={tokenVerify}
                          >
                            <strong> Gestion des utilisateurs</strong>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/adminMessages"
                            className="nav-link buttonStyle "
                            onClick={tokenVerify}
                          >
                            <strong> Gestion des messages </strong>
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  )}
                  <input
                    type="button"
                    value="Déconnexion"
                    id="decoBtn"
                    className="btn btn-danger btn-sm m-1"
                    onClick={handleClickDecoBtn}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
