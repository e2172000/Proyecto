import React from 'react'

//importamos estilos desde bootstrap
import { Container, Stack, Button, Form, Table } from "react-bootstrap"

//importamos la funcion de getAllRestaurants
import getAllRestaurants from '../functions/getAllRestaurants';
//importamos la funcion de filtrar datos para busqueda dataFilter
import dataFilter from '../functions/dataFilter';



function UserView( {user} ) {

  //creamos el estado para poder guardar los restaurantes
  const [restaurants, setRestaurants] = React.useState([]);

  //funcion para manejar el input de buscar y definir que esta buscando la persona
  async function searchFormHandler(e) {
    e.preventDefault();

    const search = e.target.search.value;
    const newDocs = await dataFilter(search)
    setRestaurants(newDocs);
  }
    
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

    <Form onSubmit={ searchFormHandler }>
      <Stack direction='horizontal'>

        <Form.Group controlId='search' className='w-75 m-3'>
          <Form.Control type='text' placeholder='Search Restaurant Name'/>
        </Form.Group>

        <Button variant='dark' type='submit'>
          Search
        </Button>

        <Button 
        variant='light' 
        onClick={() => {
          const input = document.getElementById("search");
          input.value = "";
          updateStateProducts();
        }}>
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

          </tr>
        ))}
      </tbody>
    </Table>


    </Container>
  )
}

export default UserView