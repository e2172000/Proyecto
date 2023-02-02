import React from 'react';
import './NavAdmin.css';
import logo_vistas from '../images/logo_vistas.png';

import {Link} from 'react-router-dom'

//importamos estilos desde bootstrap
import {  Nav, NavItem, Navbar, Container } from "react-bootstrap"

//importamos la funcion writeUserLog para escribir logs al cerrar sesion
import writeUserLog from '../functions/writeUserLog';

//importamos desde firebase
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";

//inicializamos auth
const auth = getAuth(firebaseApp);

function NavAdmin (user) {

return (
  <>
  <Navbar bg="dark" variant="dark">
  <Container>
    <Navbar.Brand><img src={logo_vistas} alt="logo" width='20%' /></Navbar.Brand>
    <Nav >
      <button className='button-exit' onClick={() => {
        writeUserLog("Sign Out", user.email);
        signOut(auth);
      }}>Sign Out</button>
    </Nav>
  </Container>
</Navbar>
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <NavItem>
        <button className="menu"><Link to={`/`} className="link"> Home </Link></button>
        </NavItem>
        <Nav.Item>
          <button className="menu"><Link to={`/admin/create`} className="link"> Create New User </Link></button>
      </Nav.Item>
      <Nav.Item>
          <button className="menu"><Link to={`/admin/UserList`} className="link"> User List </Link></button>
      </Nav.Item>
      <Nav.Item>
        <button className="menu"><Link to={`/admin/restaurantLogsList`} className="link"> Restaurant Logs </Link></button>
      </Nav.Item>
      <Nav.Item>
        <button className="menu"><Link to={`/admin/userLogsList`} className="link"> Users Logs </Link></button>
      </Nav.Item>
      </Nav>
      </>
     ) 
  }
   export default NavAdmin
