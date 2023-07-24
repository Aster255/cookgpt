import { Accordion, Card, Col, Container, Image, Row } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";
import { auth } from "./config/firebase";
import ReactPlayer from "react-player";

export const RecipePage = (props) => {
  const { id } = useParams();
  const recipx = props.recipes.find((rec) => rec.id == id);

  return (
    <>
      <div>
        {recipx?.name ? (
          <div className="css-typing">
            <Container className="mt-3">
              <Row></Row>
              <Row>
                <Col lg={4}>
                  <Image src={`${recipx.image}`} rounded fluid />
                </Col>
                <Col lg={8}>
                  <h2>{recipx.name}</h2>
                  {recipx.othername ? <h5>aka {recipx.othername}</h5> : <></>}
                  <p>{recipx.description}</p>
                  {/* <p>{recipx.scene}</p> */}
                  <p>{recipx.dishblog}</p>
                  <Row>
                    {Boolean(recipx.cuisine) && (
                      <Col xs={6} sm={4} md={2} className="text-center">
                        <Card>
                          Cuisine
                          <Image
                            src={process.env.PUBLIC_URL + "/1.png"}
                            fluid
                          />
                          {recipx.cuisine}
                        </Card>
                      </Col>
                    )}
                    {Boolean(recipx.difficulty) && (
                      <Col xs={6} sm={4} md={2} className="text-center">
                        <Card>
                          Difficulty
                          <Image
                            src={process.env.PUBLIC_URL + "/2.png"}
                            fluid
                          />
                          {recipx.difficulty}
                        </Card>
                      </Col>
                    )}
                    {Boolean(recipx.preptime) && (
                      <Col xs={6} sm={4} md={2} className="text-center">
                        <Card>
                          Prep Time
                          <Image
                            src={process.env.PUBLIC_URL + "/3.png"}
                            fluid
                          />
                          {recipx.preptime}
                        </Card>
                      </Col>
                    )}
                    {Boolean(recipx.cooktime) && (
                      <Col xs={6} sm={4} md={2} className="text-center">
                        <Card>
                          Cook Time
                          <Image
                            src={process.env.PUBLIC_URL + "/4.png"}
                            fluid
                          />
                          :{recipx.cooktime}
                        </Card>
                      </Col>
                    )}
                    {Boolean(recipx.servingsize) && (
                      <Col xs={6} sm={4} md={2} className="text-center">
                        <Card>
                          Servings
                          <Image
                            src={process.env.PUBLIC_URL + "/5.png"}
                            fluid
                          />
                          {recipx.servingsize}
                        </Card>
                      </Col>
                    )}
                    {Boolean(recipx.servingsize) && (
                      <Col xs={6} sm={4} md={2} className="text-center">
                        <Card>
                          Base
                          <Image
                            src={process.env.PUBLIC_URL + "/6.png"}
                            fluid
                          />
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
            </Container>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
