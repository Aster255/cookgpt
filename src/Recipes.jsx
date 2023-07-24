import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Pagination,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Recipes = (props) => {
  const [render, setRender] = useState(true);
  const [sortBy, setSortBy] = useState("");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [cuisine, setCuisine] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [preptime, setPreptime] = useState("");
  const [cooktime, setCooktime] = useState("");
  const [servingsize, setServingsize] = useState("");
  const [mainingredient, setMainingredient] = useState("");

  const [count, setCount] = useState(0);
  const [pagination, setPagination] = useState(1);

  const [recipelist, setRecipelist] = useState([...props.recipes]);

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    setPagination(1);
    setRender(!render);
    topFunction();
  };

  useEffect(() => {
    let x = [...props.recipes];
    if (cuisine) {
      x = x.filter((a) => a.cuisine?.toUpperCase() == cuisine);
    }
    if (difficulty) {
      x = x.filter((a) => a.difficulty?.toUpperCase() == difficulty);
    }
    if (preptime) {
      x = x.filter((a) => a.preptime?.toUpperCase() == preptime);
    }
    if (cooktime) {
      x = x.filter((a) => a.cooktime?.toUpperCase() == cooktime);
    }

    if (servingsize) {
      x = x.filter((a) => parseInt(a.servingsize) == servingsize);
    }

    if (mainingredient) {
      x = x.filter((a) => a.mainingredient?.toUpperCase() == mainingredient);
    }
    if (name) {
      x = x.filter(
        (a) =>
          a.othername.toLowerCase().includes(name.toLowerCase()) ||
          a.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (desc) {
      x = x.filter(
        (a) =>
          a.description.toLowerCase().includes(desc.toLowerCase()) ||
          a.dishblog.toLowerCase().includes(desc.toLowerCase())
      );
    }
    console.log(sortBy);
    if (sortBy == "datelatest") {
      x = x.sort((a, b) => b.time.toDate() - a.time.toDate());
    } else if (sortBy == "dateoldest") {
      x = x.sort((a, b) => a.time.toDate() - b.time.toDate());
    }
    setRecipelist(x);
  }, [render]);

  const handleFilterByCuisineChange = (event) => {
    setCuisine(event.target.value);
    setPagination(1);
    setRender(!render);
    topFunction();
  };
  const handleFilterByDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    setPagination(1);
    setRender(!render);
    topFunction();
  };
  const handleFilterByPTChange = (event) => {
    setPreptime(event.target.value);
    setPagination(1);
    setRender(!render);
    topFunction();
  };
  const handleFilterByCTChange = (event) => {
    setCooktime(event.target.value);
    setPagination(1);
    setRender(!render);
    topFunction();
  };

  const handleFilterBySSChange = (event) => {
    setServingsize(event.target.value);
    setPagination(1);
    setRender(!render);
    topFunction();
  };

  const handleFilterByMIChange = (event) => {
    setMainingredient(event.target.value);
    setPagination(1);
    setRender(!render);
    topFunction();
  };

  // const handleFilterByGenderChange = (event) => {
  //   setFilterByGender(event.target.value);
  //   setPagination(1);
  // };
  const searchName = (event) => {
    setName(event.target.value);
    setPagination(1);
    setRender(!render);
    topFunction();
  };

  const searchDesc = (event) => {
    setDesc(event.target.value);
    setPagination(1);
    setRender(!render);
    topFunction();
  };
  // const searchDesc = (event) => {
  //   setSearchTermDesc(event.target.value);
  //   setPagination(1);
  // };

  const functionCall = (event) => {
    setPagination(event.target.getAttribute("a-key"));
    topFunction();
  };

  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <Container>
      <Row>
        <Col lg="12">
          <h1>RECIPES by FoodGPT</h1>
          <h5>
            Recipe Count: {recipelist.length} - Page: {pagination}
          </h5>
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="d-none d-lg-block">
          <Card className="p-3">
            <h3>FILTERS</h3>
            <Form>
              <Form.Group>
                <Form.Label>
                  <h4>Sort by:</h4>
                </Form.Label>
                <Form.Select id="storesort" onChange={handleSortByChange}>
                  <option value="datelatest">Date:Latest</option>
                  <option value="dateoldest">Date:Oldest</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <h4>Search by Name:</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Chicken"
                  onChange={searchName}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <h4>Search by Desc:</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Delicious"
                  onChange={searchDesc}
                />
              </Form.Group>

              <FormGroup>
                <Form.Label>
                  <h4>Filter by Cuisine:</h4>
                </Form.Label>
                <Form.Select
                  id="cuisinefilter"
                  onChange={handleFilterByCuisineChange}
                >
                  <option value="">Select Cuisines</option>
                  {recipelist
                    .map((recipe) => recipe.cuisine?.toUpperCase())
                    .filter(
                      (value, index, array) => array.indexOf(value) === index
                    )
                    .sort()
                    .map((x) => (
                      <option value={x} selected={x == cuisine}>
                        {x}
                      </option>
                    ))}
                </Form.Select>
              </FormGroup>

              <FormGroup>
                <Form.Label>
                  <h4>Filter by Difficulty:</h4>
                </Form.Label>
                <Form.Select
                  id="difficultyfilter"
                  onChange={handleFilterByDifficultyChange}
                >
                  <option value="">Select Difficulty</option>
                  {recipelist
                    .map((recipe) => recipe.difficulty?.toUpperCase())
                    .filter(
                      (value, index, array) => array.indexOf(value) === index
                    )
                    .sort()
                    .map((x) => (
                      <option value={x} selected={x == difficulty}>
                        {x}
                      </option>
                    ))}
                </Form.Select>
              </FormGroup>

              <FormGroup>
                <Form.Label>
                  <h4>Filter by Prep Time:</h4>
                </Form.Label>
                <Form.Select onChange={handleFilterByPTChange}>
                  <option value="">Select Prep Time</option>
                  {recipelist
                    .map((recipe) => recipe.preptime?.toUpperCase())
                    .filter(
                      (value, index, array) => array.indexOf(value) === index
                    )
                    .sort()
                    .map((x) => (
                      <option value={x} selected={x == preptime}>
                        {x}
                      </option>
                    ))}
                </Form.Select>
              </FormGroup>

              <FormGroup>
                <Form.Label>
                  <h4>Filter by Cook Time:</h4>
                </Form.Label>
                <Form.Select onChange={handleFilterByCTChange}>
                  <option value="">Select Cook Time</option>
                  {recipelist
                    .map((recipe) => recipe.cooktime?.toUpperCase())
                    .filter(
                      (value, index, array) => array.indexOf(value) === index
                    )
                    .sort()
                    .map((x) => (
                      <option value={x} selected={x == cooktime}>
                        {x}
                      </option>
                    ))}
                </Form.Select>
              </FormGroup>

              <FormGroup>
                <Form.Label>
                  <h4>Filter by Servings:</h4>
                </Form.Label>
                <Form.Select onChange={handleFilterBySSChange}>
                  <option value="">Select Serving Size</option>
                  {recipelist
                    .map((recipe) => parseInt(recipe.servingsize))
                    .filter(
                      (value, index, array) => array.indexOf(value) === index
                    )
                    .sort((a, b) => a - b)
                    .map((x) => (
                      <option value={x} selected={x == servingsize}>
                        {x}
                      </option>
                    ))}
                </Form.Select>
              </FormGroup>

              <FormGroup>
                <Form.Label>
                  <h4>Filter by Ingredient:</h4>
                </Form.Label>
                <Form.Select onChange={handleFilterByMIChange}>
                  <option value="">Select Main Ingredient</option>
                  {recipelist
                    .map((recipe) => recipe.mainingredient?.toUpperCase())
                    .filter(
                      (value, index, array) => array.indexOf(value) === index
                    )
                    .sort()
                    .map((x) => (
                      <option value={x} selected={x == mainingredient}>
                        {x}
                      </option>
                    ))}
                </Form.Select>
              </FormGroup>
            </Form>
          </Card>
        </Col>
        <Col lg="9" md="12">
          <div>
            <Pagination>
              {(() => {
                let td = [];
                for (
                  let i = 1;
                  i <= 10 && i <= Math.ceil(recipelist.length / 20);
                  i++
                ) {
                  td.push(
                    <Pagination.Item
                      key={i}
                      a-key={i}
                      onClick={functionCall}
                      active={i == pagination}
                    >
                      {i}
                    </Pagination.Item>
                  );
                }
                return td;
              })()}
            </Pagination>
          </div>

          <div>
            <Row>
              {recipelist
                .slice((pagination - 1) * 20, pagination * 20)
                .map((recipe) => (
                  <Col lg={3} md={4} sm={6}>
                    <Link className="link" to={`/recipe/${recipe.id}`}>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={recipe.image}
                          className="p-1"
                        />
                        <Card.Body className="d-none d-lg-block">
                          <Card.Title>{recipe.name}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
            </Row>
          </div>

          <div>
            <Pagination>
              {(() => {
                let td = [];
                for (
                  let i = 1;
                  i <= 10 && i <= Math.ceil(recipelist.length / 20);
                  i++
                ) {
                  td.push(
                    <Pagination.Item
                      key={i}
                      a-key={i}
                      onClick={functionCall}
                      active={i == pagination}
                    >
                      {i}
                    </Pagination.Item>
                  );
                }
                return td;
              })()}
            </Pagination>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Recipes;
