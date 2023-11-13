import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './Navbar.css'
import { UserWithToken } from 'ForFable-Domain';
import { LanguageContext } from '../../../../contexts/LanguageContext';
import { ALL_LANGUAGES } from '../../../../contracts/i18n/all-langs';

interface NavbarProps {
  userData: UserWithToken | null;
}

const Navbar: React.FC<NavbarProps> = ({ userData }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [lang, setLanguage] = useContext(LanguageContext)
    const [languageModal, setLanguageModal] = useState(false);

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
              <Link onClick={unset} className='regular-option' to="/search">{lang.Search}</Link>
              <Link onClick={unset} className='regular-option' to="/users">{lang.Others}</Link>
              {userData ?
              <Link onClick={unset} className='regular-option' to={`/user/${userData?.user.id}`}>{lang.User}</Link>
              :
              <Link onClick={unset} className='regular-option' to="/login">{lang.Login}</Link>
              }
              {languageModal ?
                <div className='modal-container--navbar'>
                  <li className='language-modal--navbar' onClick={()=>(setLanguageModal(!languageModal))}>
                    {ALL_LANGUAGES.map((language, index) => {
                      return (
                        <div key={index} onClick={()=>(setLanguage(language))}>{language.LANGUAGE_CODE}</div>
                      )
                    }
                    )}
                  </li>
                </div>
                :
                <div className='language-selector--navbar' onClick={()=>(setLanguageModal(!languageModal))}>{lang.LANGUAGE_CODE}</div>
              }
            </div>
          </div>
        </nav>
    );
}

export default Navbar