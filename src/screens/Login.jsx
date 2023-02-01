import React from 'react';
import './login.css';
import logo from '../images/logo.png'

//importamos estilos desde bootstrap
import { Form } from "react-bootstrap";

//importamos la funcion de loginEmailPassword
import loginEmailPassword from '../functions/loginEmailPassword';



function Login() {

  async function submitHandler (e)  {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    console.log("submit", email, password);

    //llamando  a la funcion de loginEmailPassword
    const result = await loginEmailPassword(email, password);

    if (result.length>0){
        alert(result)
    }
  }
 
  return (
    <div className='login'>
      
    <div className='encabezado'>
        <img src={logo} alt="logo" width='100%' />
        <h1 className='title'> Welcome</h1>
    </div>

    <Form onSubmit={ submitHandler } >

      <Form.Group controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder='Enter email'/>
      </Form.Group>

      <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder='Password'/>
      </Form.Group>

  <br/>

  <button className='button'
    type="submit"
    //value={ isRegistrando ? "Registrar" : "Iniciar Sesion" } Colocamos el value fuera al implementar bootstrap
    >
      Login
  </button>

</Form>

    </div>
  )
}

export default Login