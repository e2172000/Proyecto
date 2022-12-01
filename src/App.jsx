import React, { useState } from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom";

//importamos estilos desde bootstrap
import { Container } from "react-bootstrap";

//importamos las pantallas del login y del home
import Home from "./screens/Home";
import View from "./screens/View";
import AdminView from "./components/AdminView";
import UserView from "./components/UserView";



//inicializamos auth y firestore



function App() {




  //recibimos la informacion del rol del usuario desde la base de datos
 

  return (
    <div>
    <BrowserRouter>
        <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<View />} path="/login" />
            <Route element={<AdminView />} path="/admin" />
            <Route element={<UserView />} path="/user" />
            <Route element={<h1>Not found!</h1>} />
        </Routes>
    </BrowserRouter>
</div>
  )
}

export default App;
