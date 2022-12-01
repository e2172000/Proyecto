import React, { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"

//importamos estilos desde bootstrap
import { Container } from "react-bootstrap";

//importamos las vistas para administrador y usuario
import CreateUser from "./components/CreateUser";


//importamos las pantallas del login y del home
import Home from "./screens/Home";
import Login from "./screens/Login";

//importamos desde firebase
import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";


//inicializamos auth y firestore
const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);


function App() {

  const [user, setUser] = useState(null);


  //recibimos la informacion del rol del usuario desde la base de datos
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


console.log(user)

  return (
    <>
   

    <div>
    <BrowserRouter>
        <Routes>
          
        {user ? 
           <Route element={<Home  user={user}/>} path="/" /> :
          <>
            <Route path="/" element={<Login />}/>
            <Route element={<Home  user={user}/>} path="/" />
          </>   
        }

          <Route element={<CreateUser />} path="admin/create" />
              

          <Route element={<h1>Not found!</h1>} />
        </Routes>
    </BrowserRouter>
</div>
    </>
  )
}

export default App;
