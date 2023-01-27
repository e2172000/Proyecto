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
    } catch (e) {
       const err = (`${e.message}`)
       return err
    }

}

export default loginEmailPassword;