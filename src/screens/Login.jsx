import React, { useState } from 'react';

//importamos estilos desde bootstrap
import { Container, Form, Button } from "react-bootstrap";

//importamos la funcion de loginEmailPassword
import loginEmailPassword from '../functions/loginEmailPassword';

//importamos desde firebase
import firebaseApp from "../firebase/credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

//inicializamos auth y firestore
const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);



function Login() {

  const [isRegistrando, setIsRegistrando] = useState(false);

  async function registrarUsuario (email, password, rol) {

    //creamos al usuario y recibimos su informacion
    const infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(infoUsuario.user.uid);

    //con la informacion la pasamos a la base de datos 
    const docuRef =  doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol});

  }


  function submitHandler (e)  {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;


    console.log("submit", email, password, rol);

    if (isRegistrando) {
      //registrar
      registrarUsuario(email, password, rol);
    } else {
      //login
      //signInWithEmailAndPassword(auth, email, password); declarando la funcion aqui directamente, en caso de usarla hay que volverla a importar en firebase/auth.

      //llamando  a la funcion de loginEmailPassword
      loginEmailPassword(email, password);

    }

  }
 
  return (
    <Container>

      <h1>{ isRegistrando ? "Sign Up // Registrar" : "Login // Iniciar Sesion"}</h1>

      <Form onSubmit={ submitHandler }>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder='Enter email'/>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder='Password'/>
        </Form.Group>

        <Form.Group controlId='rol'>
        <Form.Label>Select your Rol</Form.Label>
          <Form.Select>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Form.Select>
        </Form.Group>

        <Button
          variant='primary'
          type="submit"
          //value={ isRegistrando ? "Registrar" : "Iniciar Sesion" } Colocamos el value fuera al implementar bootstrap
          >
            { isRegistrando ? "Sign Up" : "Login" } 
        </Button>

      </Form>

      <br/>
    
      <Button onClick={() => setIsRegistrando(!isRegistrando)}>
        {isRegistrando ? "Login" : "Sign Up"}
      </Button>

    </Container>
  )
}

export default Login