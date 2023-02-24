import React from 'react'
import './Modal.css'

//importamos estilos desde bootstrap
import { Modal, Stack, Form } from "react-bootstrap";

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
        const status = document.getElementById("status").value;
        const unique_id = uuid();

        //enviar la informacion a firebase dentro de un objeto para que la reciba addRestaurant
        const infoRestaurant = { name, address, link, image, breakfast, lunch, hours, status, unique_id}
        //con la informacion almacenada en un objeto podemos correr la funcion de addRestaurant
        addRestaurant(infoRestaurant, user.email);
        //actualizamos el estado de los datos de  la bd para que al agregar un restaurante desde el modal se actualize y lo muestre en pantalla 
        updateStateProducts();
        //cerrar el modal
        setIsAddModal(false);
    }

    //Creamos estados para verificar que los campos esten llenos en la validacion
    const [imageValid, setImageValid] = React.useState(false)
    const [breakfastValid, setBreakfastValid] = React.useState(false)
    const [lunchValid, setLunchValid] = React.useState(false)
    const [hoursValid, setHoursValid] = React.useState(false)
    const [statusValid, setStatusValid] = React.useState(false)
    
    const [error, setError] = React.useState('')

    //validamos que los campos contengan texto
    function validationText2() {
  
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const link = document.getElementById("link").value;
        setError('')

        if ((name.length>0) && (address.length>0) && (link.length>0)){
            return true
        } else {
            return false
        }
    }
    //Validamos que los campos seleccionables no esten vacios
    function validationSelect() {
        setError('')
        if ((imageValid) && (breakfastValid) && (lunchValid) && (hoursValid)){
           return true
        } else {
            return false
        }
    }

    function validationStatus() {
        setError('')
        if ((statusValid)){
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
        <Modal.Title className='modal-title'>Add new Restaurant</Modal.Title>
    </Modal.Header>

    <Modal.Body className='modal-body'>

        <Form>
            <Stack className='body'>
                <Form.Label>Restaurant Name:</Form.Label>
                <Form.Control id="name" placeholder="Restaurant Name" type="text" className="mb-1"/>

                <Form.Label>Restaurant Address:</Form.Label>
                <Form.Control id="address" placeholder="Restaurant Address" type="text" className="mb-1"/>

                <Form.Label>Restaurant Link:</Form.Label>
                <Form.Control id="link" placeholder="Restaurant Link" type="text" className="mb-1"/>

                <Form.Label>Image Status:</Form.Label> 
                <Form.Control id='image' className="mb-1" as='select' onChange={ (e) => {
                            setImageValid(true)
                            }}>
                            <option key = 'blankChoice' hidden value> Image Status </option>
                            <option value= "Added">Added</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                    </Form.Control>

                    <Form.Label>Breakfast Menu:</Form.Label>
                    <Form.Control id='breakfast' className="mb-1" as='select' onChange={ (e) => {
                        setBreakfastValid(true)
                        }}>
                        <option key = 'blankChoice' hidden value> Breakfast Menu </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Control>

                    <Form.Label>Lunch Menu:</Form.Label> 
                    <Form.Control id='lunch' className="mb-1" as='select' onChange={ (e) => {
                        setLunchValid(true)
                        }}>
                        <option key = 'blankChoice' hidden value> Lunch Menu </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Control>

                    <Form.Label>Hours Configuration:</Form.Label>
                    <Form.Control id='hours' className="mb-1" as='select' onChange={ (e) => {
                        setHoursValid(true)
                        }}>
                        <option key = 'blankChoice' hidden value> Hours Menu </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Control>

                    <Form.Label>Menu Status:</Form.Label> 
                    <Form.Control id='status' className="mb-1" as='select' 
                    onChange={ (e) =>{
                        setStatusValid(true)
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
    <section className='section'>
    <Modal.Footer className='modal-footer'>

 
      <div className='error'> {error} </div>

        <button className='edit-modal' variant="primary"
            onClick={ () => {
                if ((validationText2()) && (validationSelect()) && (validationStatus())){
                    setUpdate(true)
                    setImageValid(false)
                    setBreakfastValid(false)
                    setLunchValid(false)
                    setHoursValid(false)
                    setStatusValid(false)
                    addRestaurantModal()
                    setError('')
                }else{
                    setError('Must Complete All Files')
            }}}
        >
            Add
        </button>


        <button className='cancel' variant="secondary" onClick={() => {
            setError('')
            setIsAddModal(false)}}>
            Cancel
        </button>

    </Modal.Footer>
    </section>

    </Modal>
  )
}

export default AddModal;
