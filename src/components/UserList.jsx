import React from 'react'

import { Link } from 'react-router-dom'

//importamos estilos desde bootstrap
import { Container, Stack, Form, Table } from 'react-bootstrap';

//importamos la funcion getAllUsers
import getAllUsers from '../functions/getAllUsers';
//Importamos la libreria para poder descargar los reportes en formato de tabla 
import ReactHtmlTableToExcel from 'react-html-table-to-excel';

function UserList({ user }) {

    //creamos el estado para poder guardar los usuarios
    const [usuarios, setUsuarios] = React.useState([]);
    //estado para recibir la informacion por la cual se quiere filtrar
    const [search, setSearch] = React.useState('');

    //guardar los usuarios de la base de datos en el estado users
    function updateStateUsers(){
        getAllUsers().then((usuarios) => {
            setUsuarios(usuarios);
        });
    }

    //al iniciar el componente llamamos a la funcion de actualizar el estado con los datos de la base de datos para mostrar en la tabla los usuarios de la base de datos
    React.useEffect(() => {
        updateStateUsers();
    }, []);
    

  return (
    <Container fluid>

        <Stack direction='horizontal' className='justify-content-between'>

            <p style={{ fontSize: 24}}> 
                Admin UserList, { user.email }
            </p>

            <Link to={`/`} className="btn btn-primary"> Go Back to Restaurant List </Link>

        </Stack>

        <div>
            <ReactHtmlTableToExcel 
                id="downloadButton"
                className="btn btn-success"
                table="userList"
                filename="UserList"
                sheet="San Marcos Users"
                buttonText="Download User List"
            />
        </div>

        <Form>
            <Stack direction='horizontal'>

                <Form.Group controlId='search' className='w-75 m-3'>
                    <Form.Control type='text' placeholder='Search...'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Form.Group>

                
            </Stack>
        </Form>
        
        <hr />

        <Table id="userList" striped bordered hover variant='dark'>
            
            <thead>
                <tr>
                <th>#</th>
                <th>User Email</th>
                <th>Rol</th>
                <th>Password</th>
                </tr>
            </thead>

            <tbody>

                { usuarios && usuarios.filter((usuario) =>{
                    return Object.keys(usuario).some(key => {
                        return usuario[key].toString().toLowerCase().includes(search)})
                }).map((usuario,index) => (
                    <tr key={ index }>
                        <td>{ index + 1 }</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.rol}</td>
                        <td>{usuario.password}</td>
                    </tr>
                ))}

            </tbody>
        </Table>


    </Container>
  )
}

export default UserList