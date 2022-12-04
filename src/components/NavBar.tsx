import nutriBoom from "../assets/nutriboom.png"

const NavBar = ()=>{
    return (
        <div>
            <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
     <img className="logo" src={nutriBoom} alt="" />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse espaceOnglets" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Accueil</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Calculateur</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">A propos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link ">Inscription</a>
        </li>
        <li className="nav-item">
          <a className="nav-link ">Tableau de bord</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </div>
    )
}
export default NavBar;