import React from 'react';
import './home.css';


//importamos las vistas para administrador y usuario
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import Footer from '../components/Footer';

function Home( {user} ) {
  return (
    <div className='home'>

      <div >
      
      { user.rol === "admin" ? <AdminView user={ user }/> : <UserView user={ user }/> }

      <br/>
      <br/>

      <Footer/>

      </div>
  </div>
  )
}

export default Home