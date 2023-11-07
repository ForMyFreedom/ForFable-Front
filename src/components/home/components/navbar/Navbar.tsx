import { useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './Navbar.css'
import { UserWithToken } from 'ForFable-Domain';

interface NavbarProps {
  userData: UserWithToken | null;
}

const Navbar: React.FC<NavbarProps> = ({ userData }) => {
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
              <Link onClick={unset} className='regular-option' to="/users">Persons</Link>
              {userData ?
              <Link onClick={unset} className='regular-option' to={`/user/${userData?.user.id}`}>User</Link>
              :
              <Link onClick={unset} className='regular-option' to="/login">Login</Link>
              }
            </div>
          </div>
        </nav>
    );
}

export default Navbar