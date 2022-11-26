//importamos estilos desde bootstrap
import { Modal, Stack, Form, Button } from "react-bootstrap";

//importamos la funcion de addRestaurant para usarla desde el modal
import addRestaurant from "../functions/addRestaurant";


function AddModal({ isAddModal, setIsAddModal, updateStateProducts }) {
    //creamos la funcion para agragar nuevos restaurantes desde el modal
    function addRestaurantModal() {

        //obtener la informacion del formulario del modal
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const link = document.getElementById("link").value;
        const image = document.getElementById("image").value;
        const breakfast = document.getElementById("breakfast").value;
        const lunch = document.getElementById("lunch").value;
        const dinner = document.getElementById("dinner").value;
        const hours = document.getElementById("hours").value;

        //enviar la informacion a firebase dentro de un objeto para que la reciba addRestaurant
        const infoRestaurant = { name, address, link, image, breakfast, lunch, dinner, hours}
        //con la informacion almacenada en un objeto podemos correr la funcion de addRestaurant
        addRestaurant(infoRestaurant);
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
                <Form.Control id="image" placeholder="Images Status" type="text" className="mb-1"/>
                <Form.Control id="breakfast" placeholder="Breakfast" type="text" className="mb-1"/>
                <Form.Control id="lunch" placeholder="Lunch" type="text" className="mb-1"/>
                <Form.Control id="dinner" placeholder="Dinner" type="text" className="mb-1"/>
                <Form.Control id="hours" placeholder="Speial Hours Config" type="text" className="mb-1"/>
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
