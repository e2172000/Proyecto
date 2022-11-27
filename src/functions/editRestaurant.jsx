//importamos desde firebase
import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

//importamos la funcion writeLog para escribir logs al agragar restaurantes
import writeLog from "./writelog";

//inicializamos auth y firestore
const firestore = getFirestore(firebaseApp);

//llame a la funcion editRes y no editRestaurant por que con esta ultima daba error
function editRes (infoRestaurant, autor) {

    const collectionRef = collection(firestore, "restaurantes");
    const docuRef = doc(collectionRef, infoRestaurant.name);
    setDoc(docuRef, infoRestaurant);

    //creamos un log con la accion=crear, la informacion del restaurante=infoRestaurant y el autor= autor
    writeLog("edit", infoRestaurant, autor);
}

export default editRes;