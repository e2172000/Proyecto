import React from 'react'
import './RestaurantLogsList.css'

//importamos estilos desde bootstrap
import { Container, Stack, Form, Table } from 'react-bootstrap';

//importamos la funcion getAllRestaurantLogs
import getAllRestaurantLogs from '../functions/getAllRestaurantLogs';
//Importamos la libreria para poder descargar los reportes en formato de tabla 
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import NavAdmin from './NavAdmin';
import Footer from './Footer';




function RestaurantLogsList({ user }) {

    //creamos el estado para poder guardar los Logs
    const [restaurantLogs, setRestauranLogs] = React.useState([]);
    //estado para recibir la informacion por la cual se quiere filtrar
    const [search, setSearch] = React.useState('');

    //guardar los usuarios de la base de datos en el estado users
    function updateStateRestaurantLogs(){
        getAllRestaurantLogs().then((restaurantLogs) => {
            setRestauranLogs(restaurantLogs);
        });
    }

    //al iniciar el componente llamamos a la funcion de actualizar el estado con los datos de la base de datos para mostrar en la tabla los usuarios de la base de datos
    React.useEffect(() => {
        updateStateRestaurantLogs();
    }, []);

    
  return (
    <Container fluid>

        <NavAdmin user={user}/>

        <Stack>
        <p className='saludos'> 
          {user.email} 
        </p>
      </Stack>

         <hr></hr>
    
      <p className='title-log'> Restaurants Logs </p>

      <hr></hr>

        <div className='download'>
            <ReactHtmlTableToExcel 
                id="downloadButton"
                className="button-logs"
                table="restaurantLogsList"
                filename="RestaurantLogsList"
                sheet="Restaurant Logs"
                buttonText="Download Restaurant Logs"
            />
        </div>

        <Form.Group controlId='search' className='w-75 m-3'>
            <Form.Control type='text' placeholder='Search...'
                onChange={(e) => setSearch(e.target.value)}
            />
        </Form.Group>
        
        <hr />

        <Table id="restaurantLogsList" striped bordered hover variant='dark'>
            
            <thead>
                <tr>
                <th>#</th>
                <th>Autor</th>
                <th>Action</th>
                <th>Restaurant</th>
                <th>Date</th>
                <th>Current Time</th>
                </tr>
            </thead>

            <tbody>

                { restaurantLogs && restaurantLogs.filter((usuario) =>{
                    return Object.keys(usuario).some(key => {
                        return usuario[key].toString().toLowerCase().includes(search)})
                }).map((restaurantLog,index) => (
                    <tr key={ index }>
                        <td>{ index + 1 }</td>
                        <td>{restaurantLog.autor}</td>
                        <td>{restaurantLog.action}</td>
                        <td>{restaurantLog.restaurant}</td>
                        <td>{restaurantLog.date}</td>
                        <td>{restaurantLog.current_Time}</td>
                    </tr>
                ))}

            </tbody>
        </Table>

        <Footer/>

    </Container>
  )
}

export default RestaurantLogsList