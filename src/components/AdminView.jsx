import React from 'react';

import {Link} from 'react-router-dom'

//importamos estilos desde bootstrap
import { Container, Stack, Button, Form, Table } from "react-bootstrap"

//importamos la funcion de getAllRestaurants
import getAllRestaurants from '../functions/getAllRestaurants';
//importamos la funcion para eliminar restaurantes deleteRestaurantAdmin
import deleteRestaurantAdmin from '../functions/deleteRestaurantAdmin';
//importamos la funcion de filtrar datos para busqueda de restaurantes dataFilter
import dataFilter from '../functions/dataFilter';

//Modal para agregar restaurantes
import AddModal from './AddModal';
//Modal para editar restaurantes
import EditModal from './EditModal';


function AdminView({ user }) {

  //creamos un estado para mostrar el modal para agregar nuevos restaurantes
  const [isAddModal, setIsAddModal] = React.useState(false);

  //creamos un estado para mostrar el modal para editar restaurantes
  const [isEditModal, setIsEditModal] = React.useState(false);

  //creamos el estado para poder guardar los restaurantes
  const [restaurants, setRestaurants] = React.useState([]);

  //estado para recibir la informacion del restaurante a editar 
  const [editRestaurant, setEditRestaurant] = React.useState({});

  //funcion para manejar el input de buscar y definir que esta buscando la persona
  async function searchFormHandler(e) {
    e.preventDefault();

    const search = e.target.search.value;
    const newDocs = await dataFilter(search)
    setRestaurants(newDocs);
  }
  
  //cambiamos el estado de addModal a true para que se muestre y poder agregar productos
  function addRestaurantAdmin(){
    setIsAddModal(true);
  }

  //guardar los restaurantes de la base de datos en el estado restaurants
  function updateStateProducts(){
    getAllRestaurants().then((restaurants) => {
      setRestaurants(restaurants);
    });
  }

  //al iniciar el componente llamamos a la funcion de actualizar el estado con los datos de la base de datos para mostrar en la tabla los restaurantes de la base de datos
  React.useEffect(() => {
    updateStateProducts();
    setEditRestaurant();
  }, []);

  return (
    <Container fluid>

      <AddModal 
        isAddModal={ isAddModal }
        setIsAddModal={ setIsAddModal }
        updateStateProducts={ updateStateProducts }
        user={ user }
      />

      { editRestaurant && (
        <EditModal
          isEditModal={ isEditModal }
          setIsEditModal={ setIsEditModal }
          updateStateProducts={ updateStateProducts }
          editRestaurant={ editRestaurant }
          setEditRestaurant= { setEditRestaurant }
          user= {user}
        />
      )}
      
      <Stack>
        <p style={{ fontSize: 24}}> 
          Hola Admin, { user.email }
        </p>
      </Stack>

      <div className="btn-group" role="group" aria-label="Basic example">
      <Button onClick={ addRestaurantAdmin }>Add Restaurant</Button>

      <Link to={`/admin/create`} className="btn btn-primary"> Create New User </Link>
      <Link to={`/admin/UserList`} className="btn btn-info"> User List </Link>
      <Link to={`/admin/restaurantLogsList`} className="btn btn-info"> Restaurant Logs </Link>
      <Link to={`/admin/userLogsList`} className="btn btn-info"> Users Logs </Link>
      </div>

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

              <Button variant='dark' 
                onClick={() =>  {
                  setEditRestaurant({ ...restaurant });
                  setIsEditModal(true);
                  }
                }>
              Edit</Button>

              <Button variant='danger' onClick={ () => { 
                deleteRestaurantAdmin({...restaurant}, user.email).then(
                  (confirmacion) => {
                    updateStateProducts();
                  });
              }}>Delete</Button>

            </td>

          </tr>
        ))}
      </tbody>
    </Table>
        

    </Container>
  )
}

export default AdminView