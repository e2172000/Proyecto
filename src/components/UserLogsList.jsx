import React from 'react';
import './UserLogsList.css';


//importamos estilos desde bootstrap
import { Container, Stack, Form, Table } from 'react-bootstrap';

//importamos la funcion getAllUserLogs
import getAllUserLogs from '../functions/getAllUserLogs';
//Importamos la libreria para poder descargar los reportes en formato de tabla 
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import NavAdmin from './NavAdmin';
import Footer from './Footer';

 

function UserLogsList({ user }) {

    //creamos el estado para poder guardar los Logs
    const [userLogs, setUserLogs] = React.useState([]);
    //estado para recibir la informacion por la cual se quiere filtrar
    const [search, setSearch] = React.useState('');

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


  return (
    <Container fluid>

        <NavAdmin user={user}/>

            <Stack>
                <p className='saludos'> 
                    {user.email} 
                </p>
            </Stack>

        <hr></hr>

        <p className='title-log'> Users Logs </p>

        <hr></hr>

        <div className='download'>
            <ReactHtmlTableToExcel 
                id="downloadButton"
                className="button-logs"
                table="userLogsList"
                filename="UserLogsList"
                sheet="User Logs"
                buttonText="Download User Logs"
            />
        </div>

        <Form.Group controlId='search' className='w-75 m-3'>
            <Form.Control type='text' placeholder='Search...'
                onChange={(e) => setSearch(e.target.value)}
            />
        </Form.Group>
        
        <hr />

        <Table id='userLogsList' striped bordered hover variant='dark'>
            
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

                { userLogs && userLogs.filter((usuario) =>{
                    return Object.keys(usuario).some(key => {
                        return usuario[key].toString().toLowerCase().includes(search)})
                }).map((userLog,index) => (
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

        <Footer/>
    </Container>
  )
}

export default UserLogsList