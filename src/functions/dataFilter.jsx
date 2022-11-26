import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

//funcion que recibe el string e la busqueda para tratar de buscarlo en firebase
async function dataFilter(searchString) {

    const docusFiltrado = [];

    //creamos una referencia a la coleccion
    const collectionRef = collection(firestore, "restaurantes");
    const queryName = query(collectionRef, 
        where("name", "==", searchString)
        );
    const queryAddress = query(collectionRef, 
        where("address", "==", searchString)
        );
    //creamos un array para recibir la informacion cifrada
    const arraySnapshots = await Promise.all([
        getDocs(queryName),
        getDocs(queryAddress),
    ]);

    //empujamos en docusFiltrado la informacion ya legible
    arraySnapshots.forEach((snapshot) => {
        snapshot.forEach((doc) => {
            docusFiltrado.push(doc.data());
        });
    });

    console.log(docusFiltrado);
    return docusFiltrado;




}

export default dataFilter;
