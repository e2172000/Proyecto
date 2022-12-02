import React from 'react'

import {Link} from 'react-router-dom'

//importamos estilos desde bootstrap
import { Container, Form, Button } from "react-bootstrap";

//importamos desde firebase
import firebaseApp from "../firebase/credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

//inicializamos auth y firestore
const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);


function CreateUser( {user} ) {

  //const [isRegistrando, setIsRegistrando] = useState(false);

  async function registrarUsuario (email, password, rol) {

    //creamos al usuario y recibimos su informacion
    const infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(infoUsuario.user.uid);

    //con la informacion la pasamos a la base de datos 
    const docuRef =  doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol, password: password});

  }


  function submitHandler (e)  {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;


    console.log("submit", email, password, rol);

    
      //registrar
      registrarUsuario(email, password, rol);
    
    }

  

  return (
    <Container>

      <h1> Create New User </h1>
      <Link to={`/`} className="btn btn-primary"> Back </Link>
    
      <h1> Create New User </h1>

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
        <Form.Label>Select User Rol</Form.Label>
          <Form.Select>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>

        <br/>

        <Button
          variant='primary'
          type="submit"
          //value={ isRegistrando ? "Registrar" : "Iniciar Sesion" } Colocamos el value fuera al implementar bootstrap
          >
           Create User
        </Button>

      </Form>

      
      </Container>
  )
}

export default CreateUser