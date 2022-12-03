import React from 'react'

import { Link } from 'react-router-dom'

//importamos estilos desde bootstrap
import { Button, Container, Stack, Form, Table } from 'react-bootstrap';

//importamos la funcion getAllRestaurantLogs
import getAllRestaurantLogs from '../functions/getAllRestaurantLogs';
//importamos la funcion de filtrar datos para busqueda de usuarios restaurantLogsFilter
import restaurantLogsFilter from '../functions/restaurantLogsFilter';




function RestaurantLogsList({ user }) {

    //creamos el estado para poder guardar los Logs
    const [restaurantLogs, setRestauranLogs] = React.useState([]);

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

    //funcion para manejar el input de buscar y definir que esta buscando la persona
    async function searchFormHandler(e) {
        e.preventDefault();

        const search = e.target.search.value;
        const newDocs = await restaurantLogsFilter(search)
        setRestauranLogs(newDocs);
    }


  return (
    <Container fluid>

        <Stack direction='horizontal' className='justify-content-between'>

            <p style={{ fontSize: 24}}> 
                Admin RestaurantLogs, { user.email }
            </p>

            <Link to={`/`} className="btn btn-primary"> Go Back to Restaurant List </Link>

        </Stack>

        <Form onSubmit={ searchFormHandler }>
            <Stack direction='horizontal'>

                <Form.Group controlId='search' className='w-75 m-3'>
                    <Form.Control type='text' placeholder='Search Autor, Action or Date'/>
                </Form.Group>

                <Button variant='dark' type='submit'>
                Search
                </Button>

                <Button 
                    variant='light' 
                    onClick={() => {
                        const input = document.getElementById("search");
                        input.value = "";
                        updateStateRestaurantLogs();
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
                <th>Autor</th>
                <th>Action</th>
                <th>Date</th>
                <th>Current Time</th>
                </tr>
            </thead>

            <tbody>

                { restaurantLogs && restaurantLogs.map((restaurantLog,index) => (
                    <tr key={ index }>
                        <td>{ index + 1 }</td>
                        <td>{restaurantLog.autor}</td>
                        <td>{restaurantLog.action}</td>
                        <td>{restaurantLog.date}</td>
                        <td>{restaurantLog.current_Time}</td>
                    </tr>
                ))}

            </tbody>
        </Table>


    </Container>
  )
}

export default RestaurantLogsList