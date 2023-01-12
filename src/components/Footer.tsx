import './Footer.css';
import { Link } from 'react-router-dom';
import image from '../nutriboom.png';

const Footer = () => {
  return (
    <div className='footer-component'>
      <div className='footer'>
        <img className='logoFooter' src={image} alt='logo' />
        <div className='textFooter'>
          <p>À propos</p>
          <Link className='aPropos' to='/aboutus'></Link>
          <Link className='aPropos' to='/Tuto'>
            <p>Tutoriel</p>
          </Link>

          {/* <Link className="aPropos" to="/ajout">
            <p>Soumets tes aliments / activités </p>
          </Link> */}
          <Link className='aPropos' to='/mailTo'>
            <p>Contacte-nous</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
