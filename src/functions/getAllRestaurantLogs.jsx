//importamos desde firebase
import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, getDocs } from "firebase/firestore";

//inicializamos firestore
const firestore = getFirestore(firebaseApp);

//se guarda la informacion en snapshot ya que esta viene cifrada, luego con restaurants.push(doc.data()); se vuele legible y la guardamos en la variable restaurants
export default async function getAllRestaurantLogs() {
    const restaurantLogs = [];
    const collectionRef = collection(firestore, "logs");
    const snapshot = await getDocs(collectionRef);
    snapshot.forEach((doc) => {
        restaurantLogs.push(doc.data());
    });
    return restaurantLogs;
}