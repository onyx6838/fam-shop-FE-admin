import React from 'react'
import { Container } from 'react-bootstrap'

const AuthorizeDenied = () => {
  return (
    <Container fluid className="p-0">
    <h1 className="h3 mb-3">Bạn không có quyền truy cập vào trang này !!!</h1>
  </Container>
  )
}

export default AuthorizeDenied