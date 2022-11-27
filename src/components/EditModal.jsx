import React from 'react'

//importamos estilos desde bootstrap
import { Modal, Stack, Form, Button } from "react-bootstrap";

//importamos la funcion de addRestaurant para usarla desde el modal
import editRes from '../functions/editRestaurant';


function EditModal({ 
    isEditModal, 
    setIsEditModal, 
    updateStateProducts, 
    editRestaurant,
    setEditRestaurant,
    user,
    }) {
    //creamos la funcion para editar restaurantes desde el modal
    function editRestaurantModal() {

        //obtener la informacion del formulario del modal
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const link = document.getElementById("link").value;
        const image = document.getElementById("image").value;
        const breakfast = document.getElementById("breakfast").value;
        const lunch = document.getElementById("lunch").value;
        const dinner = document.getElementById("dinner").value;
        const hours = document.getElementById("hours").value;

        //enviar la informacion a firebase dentro de un objeto para que la reciba editRes
        const infoRestaurant = { name, address, link, image, breakfast, lunch, dinner, hours};
        //con la informacion almacenada en un objeto podemos correr la funcion de addRestaurant
        editRes(infoRestaurant, user.email);
        //regresar el estado a null para que este vacio en caso de querer volver a editar 
        setEditRestaurant(null);
        //actualizamos el estado de los datos de  la bd para que al agregar un restaurante desde el modal se actualize y lo muestre en pantalla 
        updateStateProducts();
        //cerrar el modal
        setIsEditModal(false);
    }

    //creamos un estado para poder modificar el valor de cada uno de los campos 
    const [restaurantState, setRestaurantState] = React.useState({
        ...editRestaurant,
    });

  return (
    <Modal 
    show={isEditModal}
    onHide={() => {
        setIsEditModal(false)  
        setEditRestaurant(null);
        }}>

    <Modal.Header>
        <Modal.Title>Edit Restaurant</Modal.Title>
    </Modal.Header>

    <Modal.Body>

        <Form>
            <Stack>
                <Form.Control 
                    id="name" 
                    placeholder="Restaurant Name" 
                    type="text" 
                    className="mb-1"
                    value={ restaurantState?.name }
                    onChange={ (e) => 
                        setRestaurantState({
                            ...restaurantState, 
                            name: e.target.value
                        })
                    }
                />
                <Form.Control 
                    id="address" 
                    placeholder="Restaurant Address" 
                    type="text" 
                    className="mb-1"
                    value={ restaurantState?.address }
                    onChange={ (e) => 
                        setRestaurantState({
                            ...restaurantState, 
                            address: e.target.value
                        })
                    }
                />
                <Form.Control 
                    id="link" 
                    placeholder="Restaurant Link" 
                    type="text" 
                    className="mb-1"
                    value={ restaurantState?.link }
                    onChange={ (e) => 
                        setRestaurantState({
                            ...restaurantState, 
                            link: e.target.value
                        })
                    }
                />

                <Form.Control 
                    id="image" 
                    placeholder="Image Status" 
                    type="text" 
                    className="mb-1"
                    value={ restaurantState?.image }
                    onChange={ (e) => 
                        setRestaurantState({
                            ...restaurantState, 
                            image: e.target.value
                        })
                    }
                />

                <Form.Control 
                    id="breakfast" 
                    placeholder="Breakfast" 
                    type="text" 
                    className="mb-1"
                    value={ restaurantState?.breakfast }
                    onChange={ (e) => 
                        setRestaurantState({
                            ...restaurantState, 
                            breakfast: e.target.value
                        })
                    }
                />
                <Form.Control 
                    id="lunch" 
                    placeholder="Lunch" 
                    type="text" 
                    className="mb-1"
                    value={ restaurantState?.lunch }
                    onChange={ (e) => 
                        setRestaurantState({
                            ...restaurantState, 
                            lunch: e.target.value
                        })
                    }
                />
                <Form.Control 
                    id="dinner" 
                    placeholder="Dinner" 
                    type="text" 
                    className="mb-1"
                    value={ restaurantState?.dinner }
                    onChange={ (e) => 
                        setRestaurantState({
                            ...restaurantState, 
                            dinner: e.target.value
                        })
                    }
                />
                <Form.Control 
                id="hours" 
                placeholder="Speial Hours Config" 
                type="text" 
                className="mb-1"
                value={ restaurantState?.hours }
                    onChange={ (e) => 
                        setRestaurantState({
                            ...restaurantState, 
                            hours: e.target.value
                        })
                    }
                />
            </Stack>
        </Form>

    </Modal.Body>

    <Modal.Footer>

        <Button variant="secondary" onClick={() => {
            setIsEditModal(false)
            setEditRestaurant(null);
            }}>
            Cancel
        </Button>

        <Button variant="primary"
            onClick={ editRestaurantModal }
        >
            Edit
        </Button>

    </Modal.Footer>

    </Modal>
  )
}

export default EditModal;
