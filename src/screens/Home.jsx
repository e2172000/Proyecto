import React from 'react'

import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);


function Home( {user} ) {
  return (
    <div>
      Home Develop

      { user.rol === "admin" ? <AdminView/> : <UserView/> }

      <button onClick={() => signOut(auth)}>Cerrar Sesion</button>



    </div>
  )
}

export default Home