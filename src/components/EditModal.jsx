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
    setUpdate
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
        const unique_id = restaurantState.unique_id;

        //enviar la informacion a firebase dentro de un objeto para que la reciba editRes
        const infoRestaurant = { name, address, link, image, breakfast, lunch, dinner, hours,unique_id};
        //con la informacion almacenada en un objeto podemos correr la funcion de addRestaurant
        editRes(infoRestaurant, user.email);
        //regresar el estado a null para que este vacio en caso de querer volver a editar 
        setEditRestaurant(null);
        //actualizamos el estado de los datos de  la bd para que al agregar un restaurante desde el modal se actualize y lo muestre en pantalla 
        updateStateProducts();
        //cerrar el modal
        setIsEditModal(false);
        setUpdate(true);
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

                <Form.Select id="image" className="mb-1">
                    <option key = 'blankChoice' hidden value> Image Status </option>
                    <option value= "Added"
	                    onChange={ (e) => 
		                    setRestaurantState({
                                ...restaurantState, 
                                image: e.target.value
                            })
	                }>Added</option>

                    <option value= "Yes"
	                    onChange={ (e) => 
		                    setRestaurantState({
                                ...restaurantState, 
                                image: e.target.value
                            })
	                }>Yes</option>

                    <option value= "No"
	                    onChange={ (e) => 
		                    setRestaurantState({
                                ...restaurantState, 
                                image: e.target.value
                            })
	                }>No</option>
                </Form.Select>

                <Form.Select id="breakfast" className="mb-1">
                    <option key = 'blankChoice' hidden value> Breakfast Menu </option>
                    <option value= "Yes"
	                    onChange={ (e) => 
		                    setRestaurantState({
                                ...restaurantState, 
                                breakfast: e.target.value
                            })
	                }>Yes</option>

                    <option value= "No"
	                    onChange={ (e) => 
		                    setRestaurantState({
                                ...restaurantState, 
                                breakfast: e.target.value
                            })
	                }>No</option>
                </Form.Select>

                <Form.Select id="lunch" className="mb-1">
                    <option key = 'blankChoice' hidden value> Lunch Menu </option>
                    <option value= "Yes"
	                    onChange={ (e) => 
		                    setRestaurantState({
                                ...restaurantState, 
                                lunch: e.target.value
                            })
	                }>Yes</option>

                    <option value= "No"
	                    onChange={ (e) => 
		                    setRestaurantState({
                                ...restaurantState, 
                                lunch: e.target.value
                            })
	                }>No</option>
                </Form.Select>

                <Form.Select id="dinner" className="mb-1">
                    <option key = 'blankChoice' hidden value> Dinner Menu </option>
                    <option value= "Yes"
	                    onChange={ (e) => 
		                    setRestaurantState({
                                ...restaurantState, 
                                dinner: e.target.value
                            })
	                }>Yes</option>

                    <option value= "No"
	                    onChange={ (e) => 
		                    setRestaurantState({
                                ...restaurantState, 
                                dinner: e.target.value
                            })
	                }>No</option>
                </Form.Select>

                <Form.Select id="hours" className="mb-1">
                    <option key = 'blankChoice' hidden value> Hours Configuration </option>
                    <option value= "Yes"
	                    onChange={ (e) => 
		                    setRestaurantState({
                                ...restaurantState, 
                                hours: e.target.value
                            })
	                }>Yes</option>

                    <option value= "No"
	                    onChange={ (e) => 
		                    setRestaurantState({
                                ...restaurantState, 
                                hours: e.target.value
                            })
	                }>No</option>
                </Form.Select>
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
