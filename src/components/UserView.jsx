import React from 'react'

//importamos estilos desde bootstrap
import { Container, Stack, Form, Table, Button } from "react-bootstrap"

//importamos la funcion de getAllRestaurants
import getAllRestaurants from '../functions/getAllRestaurants';

//Importamos la libreria para poder descargar los reportes en formato de tabla 
import ReactHtmlTableToExcel from 'react-html-table-to-excel';

import StatusModal from './StatusModal';




function UserView( {user} ) {

  //Estado paraactualizar los productos luego de editar 
  const [update, setUpdate] = React.useState();
  //creamos un estado para mostrar el modal para cambiar el estado del restaurante
  const [isStatusModal, setIsStatusModal] = React.useState(false);
  //estado para recibir la informacion del restaurante a editar 
  const [editStatus, setEditStatus] = React.useState({});
  //creamos el estado para poder guardar los restaurantes
  const [restaurants, setRestaurants] = React.useState([]);
  //estado para recibir la informacion por la cual se quiere filtrar
  const [search, setSearch] = React.useState('');

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

      { editStatus && (
        <StatusModal
          isStatusModal={ isStatusModal }
          setIsStatusModal={ setIsStatusModal }
          updateStateProducts={ updateStateProducts }
          editStatus={ editStatus }
          setEditStatus= { setEditStatus }
          user= {user}
          setUpdate= { setUpdate }
        />
      )}

      <Stack>
        <p style={{ fontSize: 24}}> 
          Hola user, { user.email }
        </p>
      </Stack>

      <div>
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

      <Form.Group controlId='search' className='w-75 m-3'>
            <Form.Control type='text' placeholder='Search...'
                onChange={(e) => setSearch(e.target.value)}
            />
        </Form.Group>

    <hr />

    <Table id='restaurantList' striped bordered hover>

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
          <th >Status</th>
          <th >Options</th>
        </tr>
      </thead>

      <tbody>

        { restaurants && restaurants.filter((usuario) =>{
            return Object.keys(usuario).some(key => {
                return usuario[key].toString().toLowerCase().includes(search)})
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
              <Button variant='dark' 
                onClick={() =>  {
                  setEditStatus({ ...restaurant });
                  setIsStatusModal(true);
                  }
                }>
              Change Status</Button>
            </td>

          </tr>
        ))}
      </tbody>
    </Table>


    </Container>
  )
}

export default UserView