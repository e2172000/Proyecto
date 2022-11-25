import React from 'react'

//importamos estilos desde bootstrap
import { Container, Stack, Button, Form, Table } from "react-bootstrap"

//importamos la funcion de getAllRestaurants
import getAllRestaurants from '../functions/getAllRestaurants';


function UserView( {user} ) {

  //creamos el estado para poder guardar los productos
  const [restaurants, setRestaurants] = React.useState([]);
    
  //guardar los restaurantes de la base de datos en el estado
  function updateStateProducts(){
    getAllRestaurants().then((restaurants) => {
      setRestaurants(restaurants);
    });
  }
  //al iniciar el componente llamamos a la funcion de actualizar el estado con los datos de la base de datos
  React.useEffect(() => {
    updateStateProducts();
  }, []);

  return (
    <Container fluid>
      <Stack>
        <p style={{ fontSize: 24}}> 
          Hola user, { user.email }
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
              <Button variant='danger'>Delete</Button>
            </td>

          </tr>
        ))}
      </tbody>
    </Table>


    </Container>
  )
}

export default UserView