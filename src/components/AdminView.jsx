import React from 'react';
import './AdminView.css';

//importamos estilos desde bootstrap
import { Container, Stack, Form, Table } from "react-bootstrap"

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
import NavAdmin from './NavAdmin';


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
        setUpdate= { setUpdate }
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
              <NavAdmin user={user}/>
      <Stack>
        <p className='saludos'> 
          {`Hi! Welcome   ${user.email}`  }
        </p>
      </Stack>

      <div className="adminView">
      
        <button className="add button-admin" onClick={ addRestaurantAdmin }>Add Restaurant</button>

      <ReactHtmlTableToExcel 
        id="downloadButton"
        className="button-admin"
        table="restaurantList"
        filename="RestaurantList"
        sheet="San Marcos"
        buttonText="Download Restaurant List"
        />

      </div>

      <hr/>

      <Form  >
        <Stack direction='horizontal' >

          <Form.Group controlId='search' className='w-75 m-3'>
            <Form.Control type='text' placeholder='Search...'
            onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>

        </Stack>
    </Form>

    <hr />

    <Table id='restaurantList' striped bordered hover variant='dark'>

      <thead>
        <tr >
          <th>#</th>
          <th >Restaurant Name</th>
          <th >Address</th>
          <th >Restaurant Link</th>
          <th >Images</th>
          <th >Breakfast</th>
          <th >Lunch</th>
          <th >Menu Hours</th>
          <th >Status</th>
          <th >Options</th>
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
            <td>{restaurant.status}</td>

            <td>

              <button className='edit' variant='dark' 
                onClick={() =>  {
                  setEditRestaurant({ ...restaurant });
                  setIsEditModal(true);
                  }
                }>
              Edit</button>

              <button className='delete' onClick={ () => { 
                deleteRestaurantAdmin({...restaurant}, user.email).then(
                  (confirmacion) => {
                    updateStateProducts();
                  });
              }}>Delete</button>

            </td>

          </tr>
        ))}
      </tbody>
    </Table>
        

    </Container>
  )
}

export default AdminView