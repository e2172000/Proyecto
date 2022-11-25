//importamos desde firebase
import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

//inicializamos auth y firestore
const firestore = getFirestore(firebaseApp);

function addRestaurant(infoRestaurant) {

    const collectionRef = collection(firestore, "restaurantes");
    const docuRef = doc(collectionRef, infoRestaurant.name);
    setDoc(docuRef, infoRestaurant);
}

export default addRestaurant;