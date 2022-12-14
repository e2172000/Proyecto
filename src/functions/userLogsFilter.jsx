import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

//funcion que recibe el string e la busqueda para tratar de buscarlo en firebase
async function userLogsFilter(searchString) {

    const docusFiltrado = [];

    //creamos una referencia a la coleccion
    const collectionRef = collection(firestore, "userLogs");
    const queryEmail = query(collectionRef, 
        where("email", "==", searchString)
        );
    const queryAction = query(collectionRef, 
        where("action", "==", searchString)
        );
    const queryDate = query(collectionRef, 
        where("date", "==", searchString)
        );
    //creamos un array para recibir la informacion cifrada
    const arraySnapshots = await Promise.all([
        getDocs(queryEmail),
        getDocs(queryAction),
        getDocs(queryDate),
    ]);

    //empujamos en docusFiltrado la informacion ya legible
    arraySnapshots.forEach((snapshot) => {
        snapshot.forEach((doc) => {
            docusFiltrado.push(doc.data());
        });
    });

    //console.log(docusFiltrado);
    return docusFiltrado;




}

export default userLogsFilter;
