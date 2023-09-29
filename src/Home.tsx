import './Home.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer';

function Home() {
  return (
    <div className='App'>
      <Navbar/>
      <div className='outlet'>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
}

export default Home
