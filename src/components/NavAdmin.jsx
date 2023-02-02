import React from 'react';
import './NavAdmin.css';

import {Link} from 'react-router-dom'

//importamos estilos desde bootstrap
import {  Nav, NavItem } from "react-bootstrap"

function NavAdmin (addRestaurantAdmin) {

return (
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
     ) 
  }
   export default NavAdmin
