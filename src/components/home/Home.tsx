import './Home.css'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { UserContext } from '../../contexts/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NavbarProps { }

const Home: React.FC<NavbarProps> = () => {
  const [userData, _setUserData] = useContext(UserContext)

  return (
    <div className='App'>
      <Navbar userData={userData}/>
      <div className='outlet'>
        <ToastContainer/>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
}

export default Home
