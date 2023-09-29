import { useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './Navbar.css'

// React Function that returns the Navbar of my website
function Navbar() {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
      setShowOptions(!showOptions);
    };

    const unset = () => { setShowOptions(false); }
  
    return (
        <nav className="navbar">
          <Link className='home-option' to="/">
            <img className='for-fable-icon' src='/for-fable.svg' alt='icon' />
            ForFable
          </Link>
          <div className="group-regular-options-navbar">
            <button className="options-toggle" onClick={toggleOptions}>
                <i className="fa-solid fa-bars"></i>
            </button>
            <div id='nav-options' className={`list-regular-options ${showOptions ? 'show' : 'hidden'}`}>
              <Link onClick={unset} className='regular-option' to="/search">Search</Link>
              <Link onClick={unset} className='regular-option' to="/persons">Persons</Link>
              <Link onClick={unset} className='regular-option' to="/login">Login</Link>
              <Link onClick={unset} className='regular-option' to="/user">User</Link>
            </div>
          </div>
        </nav>
    );
}

export default Navbar