// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyBd-51ygA9aTmIKQOAPU-hMfnvdTf__lTE",
  authDomain: "authroles-7db2b.firebaseapp.com",
  projectId: "authroles-7db2b",
  storageBucket: "authroles-7db2b.appspot.com",
  messagingSenderId: "174924795557",
  appId: "1:174924795557:web:18b489358314fbb0e8074c"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
