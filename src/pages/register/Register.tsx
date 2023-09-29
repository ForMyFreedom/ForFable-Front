import './Register.css'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className="register">
      <div className="register-card">
        <h2>Register</h2>
        <div className="register-form">
          <form>
            <div className="row">
              <div className="col">
                <label htmlFor="username">Username:</label><br/>
                <input type="text" id="username" name="username"/><br/>
              </div>
              <div className="col">
                <label htmlFor="email">Email:</label><br/>
                <input type="email" id="email" name="email"/><br/>
              </div>
              <div className="col">
                <label htmlFor="birthdate">Birthdate:</label><br/>
                <input type="date" id="birthdate" name="birthdate"/><br/>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="password">Password:</label><br/>
                <input type="password" id="password" name="password"/><br/>
              </div>
              <div className="col">
                <label htmlFor="confirm-password">Confirm Password:</label><br/>
                <input type="password" id="confirm-password" name="confirm-password"/><br/>
              </div>
            </div>
            <div className="button-container">
              <Link type='button' to="/login">Cancel</Link>
              <input type="submit" value="Entrar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;