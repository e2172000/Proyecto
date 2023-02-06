import React from 'react';
import './NavAdmin.css';
import logo_vistas from '../images/logo_vistas.png';

import {Link} from 'react-router-dom'

//importamos estilos desde bootstrap
import {  Nav, NavItem, Navbar, Container } from "react-bootstrap"

//importamos la funcion writeUserLog para escribir logs al cerrar sesion
import writeUserLog from '../functions/writeUserLog';

//importamos desde firebase
import firebaseApp from '../firebase/credenciales';
import { getAuth, signOut } from "firebase/auth";

//inicializamos auth
const auth = getAuth(firebaseApp);

function NavAdmin ( {user} ) {

return (
  <>
  <Navbar bg="dark" variant="dark">
  <Container>
    <Navbar.Brand><img src={logo_vistas} alt="logo" width='20%' /></Navbar.Brand>
    <Nav >
      <button className='button-exit' onClick={() => {
        writeUserLog("Sign Out", user.email);
        signOut(auth);
      }}><Link to={`/`} className="link"> Sing Out</Link></button>
    </Nav>
  </Container>
</Navbar>
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <NavItem>
        < Link to={`/`} className="menu"> Home </Link>
        </NavItem>
        <Nav.Item>
          <Link to={`/admin/create`} className="menu" user={user}> Create New User </Link>
      </Nav.Item>
      <Nav.Item>
          <Link to={`/admin/UserList`} className="menu"> User List </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={`/admin/restaurantLogsList`} className="menu"> Restaurant Logs </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={`/admin/userLogsList`} className="menu"> Users Logs </Link>
      </Nav.Item>
      </Nav>
      </>
     ) 
  }
   export default NavAdmin
