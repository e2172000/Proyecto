import React, { useState } from "react";

import Home from "./screens/Home";
import Login from "./screens/Login";

import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);

function App() {

  const [user, setUser] = useState(null);

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

  return (
    <>
    <React.StrictMode>
      {user ? <Home  user={user} /> : <Login />} 
    </React.StrictMode>
    </>
  )
}

export default App;
