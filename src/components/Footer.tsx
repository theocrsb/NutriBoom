import "./Footer.css";
import { Link } from "react-router-dom";
import image from "../nutriboom.png";

const Footer = () => {
  return (
    <div className=" text-center footer carotteFond">
      <div className="row container-footer">
        <div className="footer-img">
          <img className="logoFooter" src={image} alt="logo" />
        </div>
        <div className=" footer-p">
          <Link className="aPropos" to="/aboutus">
            {" "}
            <p>À propos</p>
          </Link>
          <Link className="aPropos" to="/Tuto">
            <p>Tutoriel</p>
          </Link>

          {/* <Link className="aPropos" to="/ajout">
            <p>Soumets tes aliments / activités </p>
          </Link> */}
          <Link className="aPropos" to="/mailTo">
            <p>Contacte-nous</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
