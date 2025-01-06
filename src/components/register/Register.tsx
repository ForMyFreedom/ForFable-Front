import { UserContext } from '../../contexts/UserContext';
import { UserInsert } from '../../../ForFable-Domain';
import './Register.css'
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { DateTime } from 'luxon';
import { LanguageContext } from '../../contexts/LanguageContext';
import { ServicesContext } from '../../contexts/ServicesContext';

interface LoginProps {
}

const Register: React.FC<LoginProps> = () => {
  const navigate = useNavigate()
  const [lang] = useContext(LanguageContext)
  const { UsersService, LoginService } = useContext(ServicesContext)

  const [, setUser] = useContext(UserContext)
  const [registerUser, setRegisterUser] = useState<UserInsert>(
    { name: '', email: '', birthDate: DateTime.now(), password: '', repeatPassword: '' }
  )
  
  const register = async () => {
    const response = await UsersService.storeUser(registerUser)
    if (response.state == 'Failure') {
      for(const key of Object.keys(response.data)){
        toast.error(response.data[key as keyof typeof response.data][0], { className: 'capitalize' })
      }
    } else {
      toast.success(lang.UserCreatedSuccessfully)
      if (response.state == 'Sucess') {
        const logged = await LoginService.loginByCredential(registerUser.email, registerUser.password)
        if(logged.state == 'Sucess'){
          setUser(logged.data)
          localStorage.setItem('user', JSON.stringify(logged.data))
        }
      }
      navigate('/sucessfully-registered')
    }
  }

  return (
    <div className="register">
      <div className="register-card">
        <h2>{lang.Register}</h2>
        <div className="register-grid">
          <div className="col">
            <label htmlFor="username">{lang.Username}:</label>
            <input type="text" id="username" name="username"
              onChange={(event)=>setRegisterUser({...registerUser, name: event.target.value})} 
            />
          </div>
          <div className="col">
            <label htmlFor="email">{lang.Email}:</label>
            <input type="email" id="email" name="email"
              onChange={(event)=>setRegisterUser({...registerUser, email: event.target.value})} 
            />
          </div>
          <div className="col">
            <label htmlFor="birthdate">{lang.Birthdate}:</label>
            <input type="date" id="birthdate" name="birthdate"
              onChange={(event)=>setRegisterUser({...registerUser, birthDate: DateTime.fromISO(event.target.value)})} 
            />
          </div>
          <div className="col">
            <label htmlFor="password">{lang.Password}:</label>
            <input type="password" id="password" name="password"
              onChange={(event)=>setRegisterUser({...registerUser, password: event.target.value})} 
            />
          </div>  
          <div className="col">
            <label htmlFor="confirm-password">{lang.ConfirmPassword}:</label>
            <input type="password" id="confirm-password" name="confirm-password"
              onChange={(event)=>setRegisterUser({...registerUser, repeatPassword: event.target.value})} 
            />
          </div>
        </div>
        <div className="button-container">
          <Link type='button' to="/login">{lang.Cancel}</Link>
          <button onClick={register}>{lang.Register}</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
