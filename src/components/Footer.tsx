import './Footer.css';
import { Link } from 'react-router-dom';
import image from '../nutriboom.png';

const Footer = () => {
  return (
    <div className='footer-component'>
      <div className='footer'>
        <img className='logoFooter' src={image} alt='logo' />
        <div className='textFooter'>
          <Link className='aPropos' to='/aboutus'>
            <p>A propos</p>
          </Link>
          <Link className="aPropos" to="/mailTo">
            <p>Contactez-nous</p>
          </Link>

          <Link className='aPropos' to='/ajout'>
            <p>Soumettez vos aliments</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
