import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { auth, db, storage } from "./config/firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { Link } from "react-router-dom";
const RecipeGenerator = (props) => {
  const dish = props.dish;
  const handleInputChange = props.handleInputChange;
  const disable = props.disable;
  const spinner = props.spinner;
  const recipx = props.recipx;
  const loadingmess = props.loadingmess;
  const handleSubmit = props.handleSubmit;
  const imagesrc = props.imagesrc;
  return (
    <div>
      <Container></Container>
      <Container>
        <div>
          <Row>
            <Col lg={2}></Col>
            <Col lg={8}>
              <div className="text-center">
                <h1>
                  FOODGPT<Badge bg="secondary">v3.5</Badge>
                </h1>
                <h3>The ultimate AI Recipe generator.</h3>
              </div>
              <Form>
                <Form.Group>
                  {/* <Form.Label>Example textarea</Form.Label> */}
                  <Form.Control
                    as="textarea"
                    rows={4}
                    id="dish"
                    value={dish}
                    onChange={handleInputChange}
                    disabled={disable}
                    placeholder="Let's start cooking today"
                    className="recgenform"
                  />
                  <div className="d-grid">
                    {spinner ? (
                      <Button variant="primary" className="recgen" disabled>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        {loadingmess}
                      </Button>
                    ) : (
                      <Button
                        className="recgen"
                        onClick={handleSubmit}
                        disabled={
                          auth.currentUser && props.dish.trim() != ""
                            ? ""
                            : "disabled"
                        }
                      >
                        Generate Recipe{" "}
                      </Button>
                    )}
                  </div>
                  {auth.currentUser ? (
                    <></>
                  ) : (
                    <>
                      <Alert variant="secondary" className="mt-2">
                        You need to <Alert.Link href="#">LOGIN</Alert.Link> to
                        Start generating recipes.
                      </Alert>
                    </>
                  )}
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
      {recipx.name ? (
        <div className="css-typing">
          <Container className="mt-3">
            <Row></Row>
            <Row>
              <Col lg={4}>
                {imagesrc ? (
                  <Image
                    src={`data:image/png;base64,${imagesrc}`}
                    rounded
                    alt={recipx.scene}
                    fluid
                  />
                ) : (
                  // <img src={`data:image/png;base64,${imagesrc}`} />
                  <></>
                )}
              </Col>
              <Col lg={8}>
                <h2>{recipx.name}</h2>
                {recipx.othername ? <h5>aka {recipx.othername}</h5> : <></>}
                <p>{recipx.description}</p>
                {/* <p>{recipx.scene}</p> */}
                <p className="blog">{recipx.dishblog}</p>
                <Row>
                  {Boolean(recipx.cuisine) && (
                    <Col xs={6} sm={4} md={2} className="text-center">
                      <Card>
                        Cuisine
                        <Image src={process.env.PUBLIC_URL + "/1.png"} fluid />
                        {recipx.cuisine}
                      </Card>
                    </Col>
                  )}
                  {Boolean(recipx.difficulty) && (
                    <Col xs={6} sm={4} md={2} className="text-center">
                      <Card>
                        Difficulty
                        <Image src={process.env.PUBLIC_URL + "/2.png"} fluid />
                        {recipx.difficulty}
                      </Card>
                    </Col>
                  )}
                  {Boolean(recipx.preptime) && (
                    <Col xs={6} sm={4} md={2} className="text-center">
                      <Card>
                        Prep Time
                        <Image src={process.env.PUBLIC_URL + "/3.png"} fluid />
                        {recipx.preptime}
                      </Card>
                    </Col>
                  )}
                  {Boolean(recipx.cooktime) && (
                    <Col xs={6} sm={4} md={2} className="text-center">
                      <Card>
                        Cook Time
                        <Image src={process.env.PUBLIC_URL + "/4.png"} fluid />:
                        {recipx.cooktime}
                      </Card>
                    </Col>
                  )}
                  {Boolean(recipx.servingsize) && (
                    <Col xs={6} sm={4} md={2} className="text-center">
                      <Card>
                        Servings
                        <Image src={process.env.PUBLIC_URL + "/5.png"} fluid />
                        {recipx.servingsize}
                      </Card>
                    </Col>
                  )}
                  {Boolean(recipx.servingsize) && (
                    <Col xs={6} sm={4} md={2} className="text-center">
                      <Card>
                        Base
                        <Image src={process.env.PUBLIC_URL + "/6.png"} fluid />
                        {recipx.mainingredient}
                      </Card>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <h3>Ingredients</h3>
                <ul>
                  {recipx.ingredients.map((ingredient) => (
                    <li>{ingredient}</li>
                  ))}
                </ul>
              </Col>
              <Col lg={8}>
                <h3>Instructions</h3>
                <ol>
                  {recipx.instructions
                    .filter((e) => e != "")
                    .map((instruction) => (
                      <li>{instruction.replace(/[0-9][.]/, "")}</li>
                    ))}
                </ol>
              </Col>
            </Row>
            {recipx.nutritionalinformation[0] ? (
              <>
                <Row>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <h5>Nutritional Information</h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul>
                          {recipx.nutritionalinformation.map((tag) => (
                            // <Button>#{tag}</Button>
                            <li>{tag}</li>
                          ))}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Row>
              </>
            ) : (
              <></>
            )}
            {/* <Row>
              <Col className="text-center">
                {recipx.tags.map((tag) => (
                  // <Button>#{tag}</Button>
                  <>
                    <Link to={`/recipes/${tag}`}>#{tag}</Link>
                    {"  "}
                  </>
                ))}
              </Col>
            </Row> */}
          </Container>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RecipeGenerator;
