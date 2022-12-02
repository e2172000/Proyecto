import React from 'react'

import {Link} from 'react-router-dom'


function CreateUser( {user} ) {


  return (
    <div>
        <h1> Aqui va el Add user</h1>
        <Link to={`/`} style={{ textDecoration: 'none' }}> Regresar al menu </Link>
    </div>
  )
}

export default CreateUser