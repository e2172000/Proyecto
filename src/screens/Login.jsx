import React from 'react';

//importamos estilos desde bootstrap
import { Container, Form, Button } from "react-bootstrap";

//importamos la funcion de loginEmailPassword
import loginEmailPassword from '../functions/loginEmailPassword';



function Login() {

  function submitHandler (e)  {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    console.log("submit", email, password);

    //llamando  a la funcion de loginEmailPassword
    loginEmailPassword(email, password);

  }
 
  return (
    <Container>

      <h1> Login // Iniciar Sesion</h1>

      <Form onSubmit={ submitHandler }>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder='Enter email'/>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder='Password'/>
        </Form.Group>

        <br/>

        <Button
          variant='primary'
          type="submit"
          //value={ isRegistrando ? "Registrar" : "Iniciar Sesion" } Colocamos el value fuera al implementar bootstrap
          >
            Login
        </Button>

      </Form>

      
    
      

    </Container>
  )
}

export default Login