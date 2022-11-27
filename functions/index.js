//acceso a las funciones de firebase
const functions = require("firebase-functions");
//acceso a los servicios de firebase como administrador
const admin = require("firebase-admin");
//inicializamos la aplicacion
admin.initializeApp();

//declaramos el servicio de firestore
const db = admin.firestore();

//funcion para registrar cuando se ha creado un producto, cuando un restaurante es creado se agrega una entrada a logs
exports.createRestaurant = functions.firestore.document
("restaurantes/{restaurantId}").onCreate((snap) => {
    const restaurant = snap.data();

    db.collection("logs").add({
        action: "create",
        date: new Date().toISOString(),
        restaurant: restaurant,
    });
});

exports.deleteRestaurant = functions.firestore.document
("restaurantes/{restaurantId}").onDelete((snap) => {
    const restaurant = snap.data();

    db.collection("logs").add({
        action: "delete",
        date: new Date().toISOString(),
        restaurant: restaurant,
    });
});   


exports.updateRestaurant = functions.firestore.document
("restaurantes/{restaurantId}").onUpdate((change) => {
    const prevRestaurant = change.before.data();
    const updatedRestaurant = change.after.data();

    db.collection("logs").add({
        action: "update",
        date: new Date().toISOString(),
        prevRestaurant,
        updatedRestaurant,
    });
});
