import './Home.css'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { UserContext } from '../../contexts/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConstantsContext } from '../../../src/contexts/ConstantsContext';
import { useEffect } from 'react';
import { ConstantsController } from '../../../ForFable-Domain';

interface NavbarProps {
  constantsService : ConstantsController
}

const Home: React.FC<NavbarProps> = ({ constantsService }) => {
  const [userData,] = useContext(UserContext)
  const [, setConstants] = useContext(ConstantsContext)

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await constantsService.show()
      if(response.state == 'Sucess'){
        setConstants(response.data)
      }
    }
    
    fetchUserData()
  }, [setConstants, constantsService])


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
