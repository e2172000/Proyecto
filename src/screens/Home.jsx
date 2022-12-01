import React, { useState} from 'react';
import {Link} from 'react-router-dom'
import { Container, Form, Button, Stack } from "react-bootstrap";

//importamos las vistas para administrador y usuario
import Admin from "../components/AdminView";
import User from "../components/UserView";
import View from "./View"

//importamos la funcion de loginEmailPassword
import loginEmailPassword from '../functions/loginEmailPassword';

//importamos desde firebase
import firebaseApp from "../firebase/credenciales";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc  } from "firebase/firestore";
import Login from './Login';


//inicializamos auth
const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);


function Home() {

  const [user, setUser] = useState(null);
  const [rolUsuario, setRolUsuario] = useState(null)

  async function getRoll(uid) {

    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;

  }


function setUserFirebase(usuarioFirebase) {
   //recibimos el rol del usuario, su uid y su email y lo definimos
   getRoll(usuarioFirebase.uid).then((rol) => {
    const userData = {
      uid: usuarioFirebase.uid,
      email: usuarioFirebase.email,
      rol: rol,
    };
    //guardamos la informacion en el usuario
    setUser(userData);
    console.log(':userData final', userData);
  });
}

  //se detecta el inicio de sesion
  onAuthStateChanged(auth, (usuarioFirebase) => {

    //comprobamos la informacion
    if(usuarioFirebase) {
     //funcion
      if(!user) {
        setUserFirebase(usuarioFirebase);
      }
      
    } else {
      setUser(null);
    }
  });

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
    e.preventDefault()

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;
    setRolUsuario(rol)

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

  if (rolUsuario){
    // eslint-disable-next-line no-lone-blocks
    { rolUsuario === "admin" ? <Admin user={ user }/> : <User user={ user }/> }
  } else{
    return (
      <div >
        <Login />
  
  
      </div>
    )
  }
}

export default Home