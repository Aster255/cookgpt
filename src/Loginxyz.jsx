import { Alert, Button, Form, Spinner } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { auth, googleProvider, facebookProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shoecard } from "./Shoecard";

export const Account = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailz, setEmailz] = useState("");
  const [passwordz, setPasswordz] = useState("");
  const [count, setCount] = useState(0);
  const [errmy, setErrmy] = useState("");
  const [errmz, setErrmz] = useState("");
  const [showerror1, setShowerror1] = useState("");
  const [showerror2, setShowerror2] = useState("");
  const [spin1, setSpin1] = useState("");
  const [spin2, setSpin2] = useState("");
  const [spin3, setSpin3] = useState("");

  const signIn = async () => {
    setSpin1(" ");
    if (passwordz != "" && emailz != "") {
      try {
        await signInWithEmailAndPassword(auth, emailz, passwordz);
        setCount(count + 1);
        props.setUser("login");
      } catch (err) {
        console.error(err);
        setShowerror1(" ");
        setErrmz("invalid password");
      }
    } else {
      setShowerror1(" ");
      setErrmz("fields cannnot be blank");
    }
    setSpin1("");
  };

  const createAccount = async () => {
    setSpin2(" ");
    if (password.length > 5) {
      if (password != "" && email != "" && password2 != "") {
        if (password == password2) {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
            setCount(count + 1);
            props.setUser("login");
          } catch (err) {
            console.error(err);
            setShowerror2(" ");
            setErrmy("invalid or used email");
          }
        } else {
          setShowerror2(" ");
          setErrmy("Passwords do not match");
        }
      } else {
        setShowerror2(" ");
        setErrmy("fields cannnot be blank");
      }
    } else {
      setErrmy("Passwords should be atleast 6 characters");
    }
    setSpin2("");
  };

  const signInWithGoogle = async () => {
    setSpin3(" ");
    try {
      await signInWithPopup(auth, googleProvider);
      setCount(count + 1);
      setErrmy("");
      setErrmz("");
      props.setUser("login");
    } catch (err) {
      console.error(err);
    }
    setSpin3("");
  };

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, [count]);

  return (
    <>
      <Container>
        {auth.currentUser ? (
          <>
            <Container>
              <h1>
                Konnichiwa{" "}
                {auth.currentUser.displayName
                  ? `${auth.currentUser.displayName} - ${auth.currentUser.email}`
                  : auth.currentUser.email}
              </h1>
              <Shoecard heading="Gift for Dads" brand="NIKE" gender="Male" />
              <Shoecard heading="Seasonal Collection" />

              {/*               
              <button
                onClick={(e) => {
                  console.log(auth.currentUser);
                }}
              >
                hello
              </button> */}
            </Container>
          </>
        ) : (
          <Tabs defaultActiveKey="login" id="tabs" className="mb-3">
            <Tab eventKey="login" title="Login">
              <Form>
                <h1>Login to your Kutsubako Account</h1>
                {showerror1 && <Alert variant={"primary"}>{errmz}</Alert>}
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="juandelacruz@gmail.com"
                    onChange={(e) => {
                      setEmailz(e.target.value);
                      setShowerror1("");
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    onChange={(e) => {
                      setPasswordz(e.target.value);
                      setShowerror1("");
                    }}
                  />
                </Form.Group>
                <>
                  {spin1 || spin3 ? (
                    <>
                      <Button variant="secondary" disabled>
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
                      <Button variant="secondary" onClick={signIn}>
                        LOGIN
                      </Button>
                      <vr />
                      <Button
                        variant="secondary"
                        onClick={signInWithGoogle}
                        className="mx-3"
                      >
                        Login with GOOGLE
                      </Button>
                    </>
                  )}
                </>
              </Form>
            </Tab>
            <Tab eventKey="register" title="Register">
              <Form>
                <h1>Create your Kutsubako Account</h1>
                {showerror2 && <Alert variant={"primary"}>{errmy}</Alert>}
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="juandelacruz@gmail.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setShowerror2("");
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setShowerror2("");
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    onChange={(e) => {
                      setPassword2(e.target.value);
                      setShowerror2("");
                    }}
                  />
                </Form.Group>
                {spin2 || spin3 ? (
                  <>
                    <Button variant="secondary" disabled>
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
                    <Button variant="secondary" onClick={createAccount}>
                      Register
                    </Button>
                    <vr />
                    <Button
                      variant="secondary"
                      onClick={signInWithGoogle}
                      className="mx-3"
                    >
                      Login with GOOGLE
                    </Button>
                  </>
                )}
              </Form>
            </Tab>
          </Tabs>
        )}
      </Container>
    </>
  );
};
