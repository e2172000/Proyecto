import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

//la funcion para escribir logs recibe el tipo de accion y el restaurante en el que ocurrio
export default function writeLog(action, restaurant, autor) {

    const collectionRef = collection(firestore, "logs");
    //pasamos la referencia a la coleccion de logs y el nombre de el documento que queremos, en este caso utilizamos la fecha
    const docuRef = doc(collectionRef, new Date().toISOString());
    //creamos la informacion que queremos escribir en logs
    const data = {
        action,
        date: new Date().toISOString(),
        restaurant,
        autor,
    };
    //guardamos la informacion definida en data en la referencia creada anteriormente docuRef
    setDoc(docuRef, data);


}
