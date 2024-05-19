import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import './style.css'; 
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light login-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4} className="login-form-container">
            <div className="text-center mb-4">
              <h2>Masuk Dashboard</h2>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Kata Sandi</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3">
                Masuk
              </Button>

              <div className="text-center">
                <a href="#" className="d-block mb-2">Lupa kata sandi?</a>
                <Link to={'/register'} className='d-block'>Belum punya akun? Daftar</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
