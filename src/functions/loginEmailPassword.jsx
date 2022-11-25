import firebaseApp from "../firebase/credenciales";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseApp);

async function loginEmailPassword(email, password) {
    try{
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }

}

export default loginEmailPassword;