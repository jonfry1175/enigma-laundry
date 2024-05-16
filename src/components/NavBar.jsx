import React from "react";
import { Navbar, Container, Nav , Button} from "react-bootstrap";
import doneImg from '../assets/done.svg'
import environmentImg from '../assets/environment.svg'
import mailSent from '../assets/mailSent.svg'

const NavBar = () => {
    return (
        <>
          <Navbar className="py-3 fixed-top" bg="dark" expand="lg" variant="dark">
            <Container>
            <Navbar.Brand href="/">
            <img
              src={mailSent}
              width="50"
              height="40"
              className="d-inline-block align-top me-2"
              alt="Enigma Laundry Logo"
            />{" "}
            Enigma Laundry
          </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto" id="navmenu">
                  <Nav.Link href="#services">Services</Nav.Link>
                  <Nav.Link href="#">About</Nav.Link>
                  <Nav.Link href="#">Contact Us</Nav.Link>
                </Nav>
                <Nav className="">
                  <Button variant="primary" href="#">
                    Login
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      );
};

export default NavBar;
