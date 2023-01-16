import { Link } from "react-router-dom";
import "./Page404.css";
const Page404 = () => {
  return (
    <div className="page-404">
      <section className="container-404">
        <div className="img-end">
          <img
            src={process.env.PUBLIC_URL + `./assets/carotteTriste.png`}
            alt="carotte triste"
            className="carotteLogoTriste"
          />
        </div>
        <div className=" text-404">
          <h1 className="text404"> BadaBOOM... </h1>
          <h2 className="text404">
            La page que vous cherchez est introuvable{" "}
          </h2>
          <Link className="text404" to="/">
            Retour à la page d'accueil
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page404;
