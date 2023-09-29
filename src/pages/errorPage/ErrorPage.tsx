import './ErrorPage.css';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className='error-page'>
      <div className='error-page-title'>Error 404</div>
      <div className='error-page-subtitle'>Page not found</div>
      <Link to='/'>Return to Home</Link>
    </div>
  );
}

export default ErrorPage;