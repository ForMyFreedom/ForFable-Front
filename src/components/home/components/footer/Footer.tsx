import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() { // @ lang here
  return (
    <footer className='footer'>
      <div className='footer-group'>
        <div className='footer-group-title'>Placeholder</div>
        <div className='footer-group-options'>
          <Link className='footer-option' to='#'>Placeholder 1</Link>
          <Link className='footer-option' to='#'>Placeholder 2</Link>
          <Link className='footer-option' to='#'>Placeholder 3</Link>
        </div>
      </div>
      <div className='footer-group'>
        <div className='footer-group-title'>Semper Fabula Studio</div>
        <div className='footer-group-options'>
          <Link className='footer-option' to='/help#about'>Sobre nós</Link>
          <Link className='footer-option' to='/help#contact'>Contato</Link>
        </div>
      </div>
      <div className='footer-group'>
        <div className='footer-group-title'>Divulgar</div>
        <div className='footer-group-options'>
          <Link className='footer-option' to='#'>Facebook</Link>
          <Link className='footer-option' to='#'>Twitter</Link>
          <Link className='footer-option' to='#'>Instagram</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer