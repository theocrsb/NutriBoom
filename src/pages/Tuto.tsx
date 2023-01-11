import { Link } from "react-router-dom";
import "./Tuto.css";

const Tuto = () => {
  return (
    <div>
      <h1>Comment utiliser NutriBoom</h1>
      <div className="video">
        <iframe
          width="840"
          height="472.5"
          src="https://www.youtube.com/embed/jIkOiEaSfHI"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      {/* <Link className="text404" to="/">
        Retour à la page d'accueil
      </Link> */}
    </div>
  );
};

export default Tuto;
