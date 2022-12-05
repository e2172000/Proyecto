//importamos firebase
import firebaseApp from "../firebase/credenciales";
import { getFirestore, deleteDoc, collection, doc } from "firebase/firestore";

////importamos la funcion writeLog para escribir logs al eliminar restaurantes
import writeLog from "./writelog";

//inicializamos firestore
const firestore = getFirestore(firebaseApp);


//creamos la funcion para eliminar un restaurante primero haciendo referancia a la coleccion de restaurantes y luego al producto que queremos eliminar
export default async function deleteRestaurantAdmin(restaurant, user) {
    const collectionRef = collection(firestore, "restaurantes");
    const docuRef = doc(collectionRef, restaurant.unique_id);
    const deleted = await deleteDoc(docuRef);

    //escribimos un log al eliminar un producto
    writeLog("delete restaurant", restaurant.name, user);

    return deleted;
}