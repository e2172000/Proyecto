import React from 'react'

//importamos estilos desde bootstrap
import { Modal, Stack, Form, Button } from "react-bootstrap";

//importamos la funcion de addRestaurant para usarla desde el modal
import addRestaurant from "../functions/addRestaurant";

//importamos el generador de ids
import { v4 as uuid } from 'uuid';



function AddModal({ isAddModal, setIsAddModal, updateStateProducts, user, setUpdate }) {
    //creamos la funcion para agragar nuevos restaurantes desde el modal
    function addRestaurantModal() {

        //obtener la informacion del formulario del modal
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const link = document.getElementById("link").value;
        const image = document.getElementById("image").value;
        const breakfast = document.getElementById("breakfast").value;
        const lunch = document.getElementById("lunch").value;
        const hours = document.getElementById("hours").value;
        const unique_id = uuid();

        //enviar la informacion a firebase dentro de un objeto para que la reciba addRestaurant
        const infoRestaurant = { name, address, link, image, breakfast, lunch, hours, unique_id}
        //con la informacion almacenada en un objeto podemos correr la funcion de addRestaurant
        addRestaurant(infoRestaurant, user.email);
        //actualizamos el estado de los datos de  la bd para que al agregar un restaurante desde el modal se actualize y lo muestre en pantalla 
        updateStateProducts();
        //cerrar el modal
        setIsAddModal(false);
    }

    //Creamos estados para verificar que los campos esten llenos en la validacion
    const [imageValid2, setImageValid2] = React.useState(false)
    const [breakfastValid2, setBreakfastValid2] = React.useState(false)
    const [lunchValid2, setLunchValid2] = React.useState(false)
    const [hoursValid2, setHoursValid2] = React.useState(false)

    //validamos que los campos contengan texto
    function validationText2() {
  
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const link = document.getElementById("link").value;

        if ((name.length>0) && (address.length>0) && (link.length>0)){
            return true
        } else {
            return false
        }
    }
    //Validamos que los campos seleccionables no esten vacios
    function validationSelect2() {
        if ((imageValid2) && (breakfastValid2) && (lunchValid2) && (hoursValid2)){
           return true
        } else {
            return false
        }
    }

  return (
    <Modal 
    show={isAddModal}
    onHide={() => setIsAddModal(false)  } >

    <Modal.Header>
        <Modal.Title>Add new Restaurant</Modal.Title>
    </Modal.Header>

    <Modal.Body>

        <Form>
            <Stack>

                <Form.Control id="name" placeholder="Restaurant Name" type="text" className="mb-1"/>
                <Form.Control id="address" placeholder="Restaurant Address" type="text" className="mb-1"/>
                <Form.Control id="link" placeholder="Restaurant Link" type="text" className="mb-1"/>

                <Form.Control id='image' className="mb-1" as='select' onChange={ (e) => {
                            setImageValid2(true)
                            }}>
                            <option key = 'blankChoice' hidden value> Image Status </option>
                            <option value= "Added">Added</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                    </Form.Control>

                    <Form.Control id='breakfast' className="mb-1" as='select' onChange={ (e) => {
                        setBreakfastValid2(true)
                        }}>
                        <option key = 'blankChoice' hidden value> Breakfast Menu </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Control>

                    <Form.Control id='lunch' className="mb-1" as='select' onChange={ (e) => {
                        setLunchValid2(true)
                        }}>
                        <option key = 'blankChoice' hidden value> Lunch Menu </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Control>

                    <Form.Control id='hours' className="mb-1" as='select' onChange={ (e) => {
                        setHoursValid2(true)
                        }}>
                        <option key = 'blankChoice' hidden value> Hours Menu </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Control>
        
            </Stack>
        </Form>

    </Modal.Body>

    <Modal.Footer>

        <Button variant="secondary" onClick={() => setIsAddModal(false)}>
            Cancel
        </Button>

        <Button variant="primary"
            onClick={ () => {
                if ((validationText2()) && (validationSelect2())){
                    setUpdate(true)
                    setImageValid2(false)
                    setBreakfastValid2(false)
                    setLunchValid2(false)
                    setHoursValid2(false)
                    addRestaurantModal()
                }else{
                    alert('Must Complete All Files')
            }}}
        >
            Add
        </Button>

    </Modal.Footer>

    </Modal>
  )
}

export default AddModal;
