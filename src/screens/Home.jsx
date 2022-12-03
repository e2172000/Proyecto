import React from 'react';

//importamos estilos desde bootstrap
import { Button, Container, Stack } from "react-bootstrap";

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
    <Container fluid>
      <Stack direction='horizontal' className='justify-content-between'>
        <p style={{ fontSize: 24}}>
          Home Develop
        </p>
        <Button onClick={() => {
          writeUserLog("Sign Out", user.email);
          signOut(auth);
          }}>Sign Out</Button>
      </Stack>
      
      { user.rol === "admin" ? <AdminView user={ user }/> : <UserView user={ user }/> }

    </Container>
  )
}

export default Home