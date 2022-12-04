import nutriBoom from "../assets/nutriboom.png"
import '../App.css';
import {NavLink} from "react-router-dom"

const NavBar = ()=>{
    return (
        <div>
            <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
     <img className="logo" src={nutriBoom} alt="" />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse espaceOnglets " id="navbarNav">
      <ul className="navbar-nav liste ">
        <div className="espacement">
        <li className="nav-item">
        <NavLink className= "nav-link buttonStyle" to ="/welcome  ">
          Accueil
          </NavLink>
        </li>
        </div>
         <div className="espacement">
        <li className="nav-item">
          <a className="nav-link buttonStyle" href="#">Calculateur</a>
        </li>
        </div>
        <div className="espacement">
        <li className="nav-item">
          <NavLink className= "nav-link buttonStyle" to ="/aboutus">
            A propos
          </NavLink>
        </li>
        </div>
         <div className="espacement">
        <li className="nav-item">
           <NavLink className= "nav-link buttonStyle" to ="/suscribe">
            Inscription
           </NavLink>
        </li>
        </div>
         <div className="espacement">
        <li className="nav-item">
           <NavLink className= "nav-link buttonStyle" to ="/main">
            Tableau de bord
           </NavLink>
        </li>
        </div>
      </ul>
    </div>
  </div>
</nav>
        </div>
    )
    
}
export default NavBar;