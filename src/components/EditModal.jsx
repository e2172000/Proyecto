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
        const hours = document.getElementById("hours").value;
        const status = document.getElementById("status").value;
        const unique_id = restaurantState.unique_id;

        //enviar la informacion a firebase dentro de un objeto para que la reciba editRes
        const infoRestaurant = { name, address, link, image, breakfast, lunch, hours, status,unique_id};
        //con la informacion almacenada en un objeto podemos correr la funcion de editRestaurant
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

    //validamos que los campos contengan texto
    function validationText() {
  
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const link = document.getElementById("link").value;

        if ((name.length>0) && (address.length>0) && (link.length>0)){
            return true
        } else {
            return false
        }
    }
    

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
                    <Form.Label>Restaurant Name:</Form.Label>  
                    <Form.Control 
                        id="name" 
                        placeholder="Restaurant Name" 
                        type="text" 
                        className="mb-1"
                        value={ restaurantState?.name }
                        onChange={ (e) => {
                            setRestaurantState({
                                ...restaurantState, 
                                name: e.target.value
                            })
                        }}
                    />
                    <Form.Label>Restaurant Address:</Form.Label> 
                    <Form.Control 
                        id="address" 
                        placeholder="Restaurant Address" 
                        type="text" 
                        className="mb-1"
                        value={ restaurantState?.address }
                        onChange={ (e) => {
                            setRestaurantState({
                                ...restaurantState, 
                                address: e.target.value
                            })
                        }}
                    />
                    <Form.Label>Restaurant Link:</Form.Label> 
                    <Form.Control 
                        id="link" 
                        placeholder="Restaurant Link" 
                        type="text" 
                        className="mb-1"
                        value={ restaurantState?.link }
                        onChange={ (e) => {
                            setRestaurantState({
                                ...restaurantState, 
                                link: e.target.value
                            })
                        }}
                    />
                    <Form.Label>Image Status:</Form.Label> 
                    <Form.Control id='image' className="mb-1" as='select' value={restaurantState?.image} 
                    onChange={ (e) => {
                            setRestaurantState({...restaurantState, image: e.target.value})
                            }}>
                            <option key = 'blankChoice' hidden value> Image Status </option>
                            <option value= "Added">Added</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                    </Form.Control>

                    <Form.Label>Breakfast Menu:</Form.Label>                
                    <Form.Control id='breakfast' className="mb-1" as='select' value={restaurantState?.breakfast}
                    onChange={ (e) => {
                        setRestaurantState({...restaurantState, breakfast: e.target.value})
                        }}>
                        <option key = 'blankChoice' hidden value> Breakfast Menu </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Control>

                    <Form.Label>Lunch Menu:</Form.Label> 
                    <Form.Control id='lunch' className="mb-1" as='select' value={restaurantState?.lunch}
                    onChange={ (e) => {
                        setRestaurantState({...restaurantState, lunch: e.target.value})
                        }}>
                        <option key = 'blankChoice' hidden value> Lunch Menu </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Control>

                    <Form.Label>Hours Configuration:</Form.Label> 
                    <Form.Control id='hours' className="mb-1" as='select' value={restaurantState?.hours}
                    onChange={ (e) => {
                        setRestaurantState({...restaurantState, hours: e.target.value})
                        }}>
                        <option key = 'blankChoice' hidden value> Hours Menu </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Control>

                    <Form.Label>Menu Status:</Form.Label> 
                    <Form.Control id='status' className="mb-1" as='select' value={restaurantState?.status} 
                    onChange={ (e) =>{
                        setRestaurantState({...restaurantState, status: e.target.value})
                        }}>
                        <option key = 'blankChoice' hidden value> Menu Status </option>
                        <option value="Assigned">Assigned</option>
                        <option value="Completed">Completed</option>
                        <option value="On-Going">On-Going</option>
                        <option value="On-Hold">On-Hold</option>
                    </Form.Control>

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
                onClick={ () => {
                    if ((validationText())){
                        setUpdate(true)
                    editRestaurantModal();
                    updateStateProducts();
                    }else{
                        alert('Must Complete All Files')
                }}}
            >
                Edit
            </Button>

        </Modal.Footer>

    </Modal>
  )
}

export default EditModal;
