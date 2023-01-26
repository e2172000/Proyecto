//importamos estilos desde bootstrap
import { Modal, Stack, Form, Button } from "react-bootstrap";

//importamos la funcion de addRestaurant para usarla desde el modal
import addRestaurant from "../functions/addRestaurant";

//importamos el generador de ids
import { v4 as uuid } from 'uuid';



function AddModal({ isAddModal, setIsAddModal, updateStateProducts, user }) {
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

                <Form.Select id="image" className="mb-1">
                    <option key = 'blankChoice' hidden value> Image Status </option>
                    <option value="Added">Added</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </Form.Select>

                <Form.Select id="breakfast" className="mb-1">
                    <option key = 'blankChoice' hidden value> Breakfast Menu </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </Form.Select>

                <Form.Select id="lunch" className="mb-1">
                    <option key = 'blankChoice' hidden value> Lunch Menu </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </Form.Select>

                <Form.Select id="hours" className="mb-1">
                    <option key = 'blankChoice' hidden value> Hours Configuration </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </Form.Select>
        
            </Stack>
        </Form>

    </Modal.Body>

    <Modal.Footer>

        <Button variant="secondary" onClick={() => setIsAddModal(false)}>
            Cancel
        </Button>

        <Button variant="primary"
            onClick={ addRestaurantModal }
        >
            Add
        </Button>

    </Modal.Footer>

    </Modal>
  )
}

export default AddModal;
