import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login">
      <div className="login-card">
        <div className="login-form">
          <form>
            <label htmlFor="username">Username:</label><br/>
            <input type="text" id="username" name="username"/><br/>
            <label htmlFor="password">Password:</label><br/>
            <input type="password" id="password" name="password"/><br/>
            <input type="submit" value="Entrar" />
            <div className="button-container">
              <Link className='forgot-password' type='button' to="/password-change">Esqueci minha senha</Link>
              <Link type='button' to="/register">Registre-se</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;