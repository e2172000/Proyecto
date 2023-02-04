import React from 'react'
import './Modal.css'

//importamos estilos desde bootstrap
import { Modal, Stack, Form } from "react-bootstrap";

//importamos la funcion de addRestaurant para usarla desde el modal
import editStat from '../functions/editStatus';


function StatusModal({ 
    isStatusModal, 
    setIsStatusModal, 
    updateStateProducts, 
    editStatus,
    setEditStatus,
    user,
    setUpdate,
    }) {
    //creamos la funcion para editar restaurantes desde el modal
    function editStatusModal() {

          //enviar la informacion a firebase dentro de un objeto para que la reciba editRes
          const infoRestaurant = {name: restaurantState?.name, address: restaurantState?.address, link: restaurantState?.link, image: restaurantState?.image, breakfast: restaurantState?.breakfast, lunch: restaurantState?.lunch, hours: restaurantState?.hours, status: restaurantState?.status,unique_id: restaurantState?.unique_id}         //con la informacion almacenada en un objeto podemos correr la funcion de editRestaurant
          editStat(infoRestaurant, user.email);
          //regresar el estado a null para que este vacio en caso de querer volver a editar 
          setEditStatus(null);
          //actualizamos el estado de los datos de  la bd para que al agregar un restaurante desde el modal se actualize y lo muestre en pantalla 
          updateStateProducts();
          //cerrar el modal
          setIsStatusModal(false);
          setUpdate(true);
        //regresar el estado a null para que este vacio en caso de querer volver a editar 
        setEditStatus(null);
        //actualizamos el estado de los datos de  la bd para que al agregar un restaurante desde el modal se actualize y lo muestre en pantalla 
        updateStateProducts();
        //cerrar el modal
        setEditStatus(false);
        setUpdate(true);
    }


    //creamos un estado para poder modificar el valor de cada uno de los campos 
    const [restaurantState, setRestaurantState] = React.useState({
        ...editStatus,
    });


  return (
    <>
    {isStatusModal && (
            <Modal 
            show={() =>
            {isStatusModal()}}
            onHide={() => {
                setIsStatusModal(false)  
                setEditStatus(null);
                }}>
    
            <Modal.Header className='modal-title'>
                <Modal.Title>Change Restaurant Status</Modal.Title>
            </Modal.Header>
    
            <Modal.Body className='modal-body'>
    
                <Form>
                    <Stack className='body'>
    
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
    
            <Modal.Footer className='modal-footer'>
    
                <button className='edit-modal' variant="primary"
                    onClick={ () => {
                        setUpdate(true)
                        editStatusModal(false);
                        updateStateProducts();  
                    }}
                >
                    Edit
                </button>

                <button className='cancel'  variant="secondary" onClick={() => {
                    setIsStatusModal(false)
                    setEditStatus(null);
                    }}>
                    Cancel
                </button>
    
            </Modal.Footer>
    
        </Modal>
        )
    }
    
    </>
  )
}

export default StatusModal;
