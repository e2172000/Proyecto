import React from 'react';
import logo_vistas from '../images/logo_vistas.png';
import './home.css';

//importamos estilos desde bootstrap
import { Container, Navbar, Nav } from "react-bootstrap";

//importamos las vistas para administrador y usuario
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

//importamos la funcion writeUserLog para escribir logs al cerrar sesion
import writeUserLog from '../functions/writeUserLog';

//importamos desde firebase
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";

//inicializamos auth
const auth = getAuth(firebaseApp);


function Home( {user} ) {
  return (
    <div className='home'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><img src={logo_vistas} alt="logo" width='20%' /></Navbar.Brand>
          <Nav >
            <button className='button' onClick={() => {
              writeUserLog("Sign Out", user.email);
              signOut(auth);
            }}>Sign Out</button>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid>
      
      { user.rol === "admin" ? <AdminView user={ user }/> : <UserView user={ user }/> }

      </Container>
  </div>
  )
}

export default Home