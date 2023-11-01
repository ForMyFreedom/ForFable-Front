import { UserContext } from '../../contexts/UserContext';
import { UserInsert, UsersUsecase } from '../../for-fable-domain';
import { LoginUsecase } from '../../for-fable-domain/usecases/LoginUsecase';
import './Register.css'
import { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

interface LoginProps {
  userService: UsersUsecase
  loginService: LoginUsecase
}

const Register: React.FC<LoginProps> = ({ userService, loginService }) => {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [, setUser] = useContext(UserContext)
  const [registerUser, setRegisterUser] = useState<UserInsert>(
    { name: '', email: '', imageUrl: window.env.APP_ICON, birthDate: '', password: '', repeatPassword: '' }
  )
  
  const register = async () => {
    const response = await userService.storeUser(registerUser)
    if (response.error && typeof response.error === 'object') {
      for (const key of Object.keys(response.error)) {
        toast.error(response.error[key as keyof typeof response.error][0], { className: 'capitalize' })
      }
    } else {
      toast.success('Usuário criado com sucesso')
      if (response.data) {
        const logged = await loginService.loginByCredential(registerUser.email, registerUser.password)
        if(logged.data){
          setUser(logged.data)
          localStorage.setItem('user', JSON.stringify(logged.data))
        }
      }
      navigate('/')
    }
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setRegisterUser({...registerUser, imageUrl: imageUrl})
      };
    }
  };

  return (
    <div className="register">
      <div className="register-card">
        <h2>Register</h2>
        <div className="register-grid">
          <div className="col">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username"
              onChange={(event)=>setRegisterUser({...registerUser, name: event.target.value})} 
            />
          </div>
          <div className="col">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email"
              onChange={(event)=>setRegisterUser({...registerUser, email: event.target.value})} 
            />
          </div>
          <div className="col">
            <label htmlFor="birthdate">Birthdate:</label>
            <input type="date" id="birthdate" name="birthdate"
              onChange={(event)=>setRegisterUser({...registerUser, birthDate: event.target.value})} 
            />
          </div>
          <div className="col">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password"
              onChange={(event)=>setRegisterUser({...registerUser, password: event.target.value})} 
            />
          </div>  
          <div className='col align-itens-center'>
            <div className="image-portrait--register">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                hidden
                onChange={handleFileInputChange}
              />
              <img
                src={registerUser.imageUrl}
                alt="Imagem de Registro"
                onClick={() => fileInputRef.current?.click()}
              />
            </div>
          </div>
          <div className="col">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password"
              onChange={(event)=>setRegisterUser({...registerUser, repeatPassword: event.target.value})} 
            />
          </div>
        </div>
        <div className="button-container">
          <Link type='button' to="/login">Cancelar</Link>
          <button onClick={register}>Registrar</button>
        </div>
      </div>
    </div>
  );
}

export default Register;