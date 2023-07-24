import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Offcanvas,
  Container,
  Image,
  Button,
  Spinner,
  NavDropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import GoogleButton from "react-google-button";
import { auth, googleProvider } from "./config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const NavBar = (props) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const spinner = props.spinner;
  const loadingmess = props.loadingmess;
  const [counter, setCounter] = useState(0);

  const [spinx, setSpinx] = useState(false);

  const signInWithGoogle = async () => {
    console.log("abc");
    setSpinx(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
    setSpinx(false);
  };

  const logout = async () => {
    setSpinx(true);
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
    setSpinx(false);
  };

  return (
    <>
      <Container fluid>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand>
              <Image
                src={process.env.PUBLIC_URL + "/qwer.png"}
                className="logo"
              />
            </Navbar.Brand>
            <Navbar.Brand as={Link} to="/">
              FOODGPT
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                {/* <Nav.Link as={Link} to="/test">
                  Home
                </Nav.Link> */}
                <Nav.Link as={Link} to="/recipe-generator">
                  Recipe Generator
                </Nav.Link>
                <Nav.Link as={Link} to="/recipes">
                  Recipes List
                </Nav.Link>
                <Nav.Link as={Link} to="/about" className="me-auto">
                  About
                </Nav.Link>
              </Nav>
              <Nav>
                {auth.currentUser ? (
                  <>
                    <NavDropdown
                      title={auth?.currentUser?.displayName}
                      id="dropdown"
                    >
                      {props.spinner ? (
                        <NavDropdown.Item disabled>
                          Please Wait
                        </NavDropdown.Item>
                      ) : (
                        <>
                          {spinx ? (
                            <>
                              <Button variant="primary" disabled>
                                <Spinner
                                  as="span"
                                  animation="grow"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                                Loading...
                              </Button>
                            </>
                          ) : (
                            <>
                              {" "}
                              <NavDropdown.Item onClick={logout}>
                                Log Out
                              </NavDropdown.Item>
                            </>
                          )}
                        </>
                      )}
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    {spinx ? (
                      <>
                        <Button variant="primary" disabled>
                          <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Loading...
                        </Button>
                      </>
                    ) : (
                      <>
                        <GoogleButton
                          className={"google"}
                          onClick={signInWithGoogle}
                        />
                      </>
                    )}
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </>
  );
};

export default NavBar;
