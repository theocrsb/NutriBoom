import { Link } from "react-router-dom";
import "./Page404.css";
const Page404 = () => {
  return (
    <div className="container-404">
      <h1> OOPS! Page non trouvée ...</h1>
      <img
        src={process.env.PUBLIC_URL + `/assets/carotte triste.png`}
        alt="carotte triste"
        className="carotteBlaze"
      />
      <h3>URL incorrecte </h3>
      <Link to="/">Retour a l'acceuil</Link>
    </div>
  );
};

export default Page404;
