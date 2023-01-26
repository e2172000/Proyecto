import React from 'react';

import {Link} from 'react-router-dom'

//importamos estilos desde bootstrap
import { Container, Stack, Button, Form, Table } from "react-bootstrap"

//importamos la funcion de getAllRestaurants
import getAllRestaurants from '../functions/getAllRestaurants';
//importamos la funcion para eliminar restaurantes deleteRestaurantAdmin
import deleteRestaurantAdmin from '../functions/deleteRestaurantAdmin';

//Importamos la libreria para poder descargar los reportes en formato de tabla 
import ReactHtmlTableToExcel from 'react-html-table-to-excel';

//Modal para agregar restaurantes
import AddModal from './AddModal';
//Modal para editar restaurantes
import EditModal from './EditModal';


function AdminView({ user }) {

  //Estado paraactualizar los productos luego de editar 
  const [update, setUpdate] = React.useState();

  //creamos un estado para mostrar el modal para agregar nuevos restaurantes
  const [isAddModal, setIsAddModal] = React.useState(false);

  //creamos un estado para mostrar el modal para editar restaurantes
  const [isEditModal, setIsEditModal] = React.useState(false);

  //creamos el estado para poder guardar los restaurantes
  const [restaurants, setRestaurants] = React.useState([]);

  //estado para recibir la informacion del restaurante a editar 
  const [editRestaurant, setEditRestaurant] = React.useState({});
  //estado para recibir la informacion por la cual se quiere filtrar
  const [search, setSearch] = React.useState('');
  
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
    setUpdate();
  }, [])

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
          setUpdate= { setUpdate }
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

      <ReactHtmlTableToExcel 
      id="downloadButton"
      className="btn btn-success"
      table="restaurantList"
      filename="RestaurantList"
      sheet="San Marcos"
      buttonText="Download Restaurant List"
      />

      </div>

      <hr />

      <Form >
        <Stack direction='horizontal'>

          <Form.Group controlId='search' className='w-75 m-3'>
            <Form.Control type='text' placeholder='Search...'
            onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>

        </Stack>
    </Form>

    <hr />

    <Table id='restaurantList'>

      <thead>
        <tr>
          <th>#</th>
          <th>Restaurant Name</th>
          <th>Address</th>
          <th>Restaurant Link</th>
          <th>Images</th>
          <th>Breakfast</th>
          <th>Lunch</th>
          <th>Menu Hours</th>
          <th>Options</th>
        </tr>
      </thead>

      <tbody>

        { restaurants && restaurants.filter((restaurant) =>{
          return Object.keys(restaurant).some(key => {
            return restaurant[key].toString().toLowerCase().includes(search)})
        }).map((restaurant, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{restaurant.name}</td>
            <td>{restaurant.address}</td>
            <td>{restaurant.link}</td>
            <td>{restaurant.image}</td>
            <td>{restaurant.breakfast}</td>
            <td>{restaurant.lunch}</td>
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