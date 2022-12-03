import firebaseApp from "../firebase/credenciales";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

//importamos la funcion writeUserLog para escribir logs al iniciar sesion
import writeUserLog from "./writeUserLog";

const auth = getAuth(firebaseApp);

async function loginEmailPassword(email, password) {
    try{
        const result = await signInWithEmailAndPassword(auth, email, password);

        //escribimos un log con el inicio de sesion
        writeUserLog("Log in", email);

        return result;
    } catch (error) {
        console.log(error);
        return error;
    }

}

export default loginEmailPassword;