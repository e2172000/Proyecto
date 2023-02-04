import React from 'react'
import './UserView.css'
import logo_vistas from '../images/logo_vistas.png';

//importamos estilos desde bootstrap
import { Nav, Navbar, Container, Stack, Form, Table } from "react-bootstrap"

//importamos la funcion de getAllRestaurants
import getAllRestaurants from '../functions/getAllRestaurants';

//Importamos la libreria para poder descargar los reportes en formato de tabla 
import ReactHtmlTableToExcel from 'react-html-table-to-excel';

import StatusModal from './StatusModal';

//importamos la funcion writeUserLog para escribir logs al cerrar sesion
import writeUserLog from '../functions/writeUserLog';

//importamos desde firebase
import firebaseApp from '../firebase/credenciales';
import { getAuth, signOut } from "firebase/auth";

//inicializamos auth
const auth = getAuth(firebaseApp);


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
    setRestaurants();
    setIsStatusModal()
    setEditStatus();
    setUpdate();
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><img src={logo_vistas} alt="logo" width='20%' /></Navbar.Brand>
          <Nav >
            <button className='button-exit' onClick={() => {
            writeUserLog("Sign Out", user.email);
            signOut(auth);
            }}>Sign Out</button>
          </Nav>
      </Container>
      </Navbar>
    
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
        <p className='saludos'> 
          {`Hi! Welcome   ${user.email}`  }
        </p>
      </Stack>

      <div className='userView'>
            <ReactHtmlTableToExcel 
                id="downloadButton"
                className="button-user"
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

    <Table id='restaurantList' striped bordered hover variant='dark'>

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
              <button className='status' variant='dark' 
                onClick={() =>  {
                  setEditStatus({ ...restaurant });
                  setIsStatusModal(true);
                  }
                }>
              Change Status</button>
            </td>

          </tr>
        ))}
      </tbody>
    </Table>


    </Container>
    </>
  )
}

export default UserView