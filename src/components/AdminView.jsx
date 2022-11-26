import React from 'react';

//importamos estilos desde bootstrap
import { Container, Stack, Button, Form, Table } from "react-bootstrap"

//importamos la funcion de getAllRestaurants
import getAllRestaurants from '../functions/getAllRestaurants';
//importamos la funcion para eliminar restaurantes deleteRestaurantAdmin
import deleteRestaurantAdmin from '../functions/deleteRestaurantAdmin';

//Modal para agregar restaurantes
import AddModal from './AddModal';


function AdminView({ user }) {

  //creamos 8n estado para el modal para agregar nuevos restaurantes
  const [isAddModal, setIsAddModal] = React.useState(false);

  //creamos el estado para poder guardar los productos
  const [restaurants, setRestaurants] = React.useState([]);
  
  //guardar los restaurantes de la base de datos en el estado
  function updateStateProducts(){
    getAllRestaurants().then((restaurants) => {
      setRestaurants(restaurants);
    });
  }

  //cambiamos el estado de addModal a true para que se muestre y poder agregar productos
  function addRestaurantAdmin(){
    setIsAddModal(true);
  }

//al iniciar el componente llamamos a la funcion de actualizar el estado con los datos de la base de datos
  React.useEffect(() => {
    updateStateProducts();
  }, []);

  return (
    <Container fluid>

      <AddModal 
        isAddModal={isAddModal}
        setIsAddModal={setIsAddModal}
        updateStateProducts={ updateStateProducts }
      />


      <Stack>
        <p style={{ fontSize: 24}}> 
          Hola Admin, { user.email }
        </p>
      </Stack>

      <hr />

    <Form>
      <Stack direction='horizontal'>

        <Form.Group controlId='search' className='w-75 m-3'>
          <Form.Control type='text' placeholder='Search'/>
        </Form.Group>

        <Button variant='dark' type='submit'>
          Search
        </Button>

        <Button variant='light'>
          Reset 
        </Button>

      </Stack>
    </Form>

    <hr />

    <Table>

      <thead>
        <tr>
          <th>#</th>
          <th>Restaurant Name</th>
          <th>Address</th>
          <th>Restaurant Link</th>
          <th>Images</th>
          <th>Breakfast</th>
          <th>Lunch</th>
          <th>Dinner</th>
          <th>Menu Hours</th>
          <th>Options</th>
        </tr>
      </thead>

      <tbody>

        { restaurants && restaurants.map((restaurant, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{restaurant.name}</td>
            <td>{restaurant.address}</td>
            <td>{restaurant.link}</td>
            <td>{restaurant.image}</td>
            <td>{restaurant.breakfast}</td>
            <td>{restaurant.lunch}</td>
            <td>{restaurant.dinner}</td>
            <td>{restaurant.hours}</td>
            <td>
              <Button variant='dark'>Edit</Button>
              <Button variant='danger' onClick={ () => { 
                deleteRestaurantAdmin(restaurant).then(
                  (confirmacion) => {
                    updateStateProducts();
                  });
              }}>Delete</Button>
            </td>

          </tr>
        ))}
      </tbody>
    </Table>
        <Button onClick={ addRestaurantAdmin }>Add Restaurant</Button>

    </Container>
  )
}

export default AdminView