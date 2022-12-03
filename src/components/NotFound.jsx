import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Container >
        <h1>Page Not Found</h1>
        <h2>Please go back</h2>
        <Link to={`/`} className="btn btn-primary"> Back </Link>
    </Container>
  )
}

export default NotFound