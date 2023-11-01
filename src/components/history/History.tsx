import { GenresController, PromptsController } from '../../../ForFable-Domain';
import './History.css';
import { Link } from 'react-router-dom';

interface HistoryProps {
  genresServices: GenresController
  promptServices: PromptsController
}

const History: React.FC<HistoryProps> = () => {
  return (
    <div className="login">
      <div className="login-card">
        <div className="login-form">
            <label htmlFor="username">Username:</label><br/>
            <label htmlFor="password">Password:</label><br/>
            <div className="button-container">
              <Link className='forgot-password' type='button' to="/password-change">Esqueci minha senha</Link>
              <Link type='button' to="/register">Registre-se</Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default History;