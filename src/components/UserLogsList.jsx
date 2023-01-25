import React from 'react'

import { Link } from 'react-router-dom'

//importamos estilos desde bootstrap
import { Button, Container, Stack, Form, Table } from 'react-bootstrap';

//importamos la funcion getAllUserLogs
import getAllUserLogs from '../functions/getAllUserLogs';
//importamos la funcion de filtrar datos para busqueda de usuarios usertLogsFilter
import userLogsFilter from '../functions/userLogsFilter';
//Importamos la libreria para poder descargar los reportes en formato de tabla 
import ReactHtmlTableToExcel from 'react-html-table-to-excel';



function UserLogsList({ user }) {

    //creamos el estado para poder guardar los Logs
    const [userLogs, setUserLogs] = React.useState([]);

    //guardar los usuarios de la base de datos en el estado users
    function updateStateUserLogs(){
        getAllUserLogs().then((userLogs) => {
            setUserLogs(userLogs);
        });
    }

    //al iniciar el componente llamamos a la funcion de actualizar el estado con los datos de la base de datos para mostrar en la tabla los usuarios de la base de datos
    React.useEffect(() => {
        updateStateUserLogs();
    }, []);

    //funcion para manejar el input de buscar y definir que esta buscando la persona
    async function searchFormHandler(e) {
        e.preventDefault();

        const search = e.target.search.value;
        const newDocs = await userLogsFilter(search)
        setUserLogs(newDocs);
    }


  return (
    <Container fluid>

        <Stack direction='horizontal' className='justify-content-between'>

            <p style={{ fontSize: 24}}> 
                Admin UserLogs, { user.email }
            </p>

            <Link to={`/`} className="btn btn-primary"> Go Back to Restaurant List </Link>

        </Stack>

        <div>
            <ReactHtmlTableToExcel 
                id="downloadButton"
                className="btn btn-success"
                table="userLogsList"
                filename="UserLogsList"
                sheet="User Logs"
                buttonText="Download User Logs"
            />
        </div>

        <Form onSubmit={ searchFormHandler }>
            <Stack direction='horizontal'>

                <Form.Group controlId='search' className='w-75 m-3'>
                    <Form.Control type='text' placeholder='Search email, Action or Date'/>
                </Form.Group>

                <Button variant='dark' type='submit'>
                Search
                </Button>

                <Button 
                    variant='light' 
                    onClick={() => {
                        const input = document.getElementById("search");
                        input.value = "";
                        updateStateUserLogs();
                    }}>
                Reset 
                </Button>
            </Stack>
        </Form>
        
        <hr />

        <Table id='userLogsList'>
            
            <thead>
                <tr>
                <th>#</th>
                <th>Email</th>
                <th>Action</th>
                <th>Date</th>
                <th>Current Time</th>
                </tr>
            </thead>

            <tbody>

                { userLogs && userLogs.map((userLog,index) => (
                    <tr key={ index }>
                        <td>{ index + 1 }</td>
                        <td>{userLog.email}</td>
                        <td>{userLog.action}</td>
                        <td>{userLog.date}</td>
                        <td>{userLog.current_Time}</td>
                    </tr>
                ))}

            </tbody>
        </Table>


    </Container>
  )
}

export default UserLogsList