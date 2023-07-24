import { Button, Card, Col, Container, Row } from "react-bootstrap";

import { Link } from "react-router-dom";
import { auth } from "./config/firebase";
import ReactPlayer from "react-player";

export const LandingPage = () => {
  return (
    <Container className="landing" fluid>
      <Row>
        {/* <Col lg="4">
          <img className="img-fluid" src={require("./hero.jpg")} />
        </Col> */}
        <div className="hero-video-container">
          <div className="hero-video">
            <ReactPlayer
              // url={`${process.env.PUBLIC_URL}/assets/videos/video-3.mp4`}
              url="https://res.cloudinary.com/dqgsn9024/video/upload/v1689650164/mixkit-chef-preparing-salad-in-the-restaurant-kitchen-13258-medium_iadnca.mp4"
              playing
              playbackRate={1}
              muted
              loop
              controls={false}
              width={"100%"}
              height={"500px"}
            />
          </div>

          <div className="hero-text">
            <h1>Savor the Best Flavors with FoodGPT</h1>
            <h2>Experience the future of cooking</h2>
            <Link className="link" to="/recipe-generator">
              <button className="shop-now-btn mt-1">
                Cook like a pro with AI
              </button>
            </Link>{" "}
            <Link className="link" to="/recipes">
              <button className="shop-now-btn mt-1">See our Recipes</button>
            </Link>
          </div>
        </div>
      </Row>
    </Container>
  );
};
