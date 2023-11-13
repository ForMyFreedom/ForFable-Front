import './ErrorPage.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { LanguageContext } from '../../contexts/LanguageContext';

function ErrorPage() {
  const [lang] = useContext(LanguageContext);

  return (
    <div className='error-page'>
      <div className='error-page-title'>{lang.Error404}</div>
      <div className='error-page-subtitle'>{lang.PageNotFound}</div>
      <Link to='/'>{lang.ReturnHome}</Link>
    </div>
  );
}

export default ErrorPage;