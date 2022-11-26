//importamos firebase
import firebaseApp from "../firebase/credenciales";
import { getFirestore, deleteDoc, collection, doc } from "firebase/firestore";

//inicializamos firestore
const firestore = getFirestore(firebaseApp);


//creamos la funcion para eliminar un restaurante primero haciendo referancia a la coleccion de restaurantes y luego al producto que queremos eliminar
export default async function deleteRestaurantAdmin(restaurant) {
    const collectionRef = collection(firestore, "restaurantes");
    const docuRef = doc(collectionRef, restaurant.name);
    const deleted = await deleteDoc(docuRef);
    return deleted;
}