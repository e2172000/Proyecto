import React from 'react'
import './CreateUser.css'

//importamos estilos desde bootstrap
import { Container, Form, Stack } from "react-bootstrap";

//importamos la funcion writeUserLog para escribir logs al crear un nuevo usuario
import writeUserLog from '../functions/writeUserLog';

//importamos desde firebase
import firebaseApp from "../firebase/credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import NavAdmin from './NavAdmin';
import Footer from './Footer';

//inicializamos auth y firestore
const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);


function CreateUser( {user} ) {

  const [error, setError] = React.useState('')

  async function registrarUsuario (email, password, rol) {

    setError('')

    //creamos al usuario y recibimos su informacion
    const infoUsuario = await createUserWithEmailAndPassword(auth, email, password)
      .then((usuarioFirebase) => {
        return usuarioFirebase;
      })
      .catch((e) => {
        if (e.message === "Firebase: Error (auth/invalid-email).") {
          setError("Invalid Email, Please Check it and Try Again.")
        } else if (e.message === "Firebase: Error (auth/email-already-in-use).") {
          setError("Email Already in Use, Please Check it and Try Again.")
        } else if (e.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
          setError("Password Should Be at Least 6 Characters, Please Check it and Try Again.")
        }
        //setError(e.message)
        return e.message
      });

    console.log(infoUsuario.user.uid);

    //con la informacion la pasamos a la base de datos 
    const docuRef =  doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { email: email, rol: rol, password: password});

    writeUserLog("User Created", email)

  }

  console.log(user)

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
    <>

    <NavAdmin user={user}/>
    <Stack>
        <p className='saludos'> 
          {user.email} 
        </p>
      </Stack>
    <Container >

      <hr></hr>
    
      <p className='title-create'> Create New User </p>

      <hr></hr>

      <Form onSubmit={ submitHandler } className='addUser'>

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

        <div className='error'> {error} </div>

        <button
          className='button-create'
          variant='primary'
          type="submit"
          //value={ isRegistrando ? "Registrar" : "Iniciar Sesion" } Colocamos el value fuera al implementar bootstrap
          >
           Create User
        </button>

      </Form>

      <br/>
      <br/>

      <Footer/>
      
      </Container>
      </>
  )
}

export default CreateUser