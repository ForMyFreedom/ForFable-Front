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
import { ServicesContext } from 'src/contexts/ServicesContext';

interface NavbarProps {
}

const Home: React.FC<NavbarProps> = () => {
  const [userData,] = useContext(UserContext)
  const [, setConstants] = useContext(ConstantsContext)
  const { ConstantsService } = useContext(ServicesContext)

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await ConstantsService.show()
      if(response.state == 'Sucess'){
        setConstants(response.data)
      }
    }
    
    fetchUserData()
  }, [setConstants, ConstantsService])


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
