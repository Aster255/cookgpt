import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const AboutPage = () => {
  return (
    <Container className="about">
      <Row>
        <Col>
          <h2>Welcome to FoodGPT - Your AI-Powered Recipe Companion</h2>
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <Image src={process.env.PUBLIC_URL + "/OIG2.jpg"} fluid />
        </Col>
        <Col lg={8}>
          <p>
            At FoodGPT, we're dedicated to elevating your culinary journey with
            our state-of-the-art AI technology. Our extensive collection of
            personalized and creative recipes is designed to inspire and delight
            your taste buds.
          </p>
          <p>
            Powered by advanced AI, FoodGPT uses the breakthrough GPT
            (Generative Pre-trained Transformer) model in natural language
            processing. It has mastered the art of recipe creation, delivering
            unique and mouthwatering dishes on-demand.
          </p>
          <p>
            Whether you're a home cook looking for fresh ideas or a seasoned
            chef seeking inspiration, FoodGPT has you covered. Explore a wide
            range of recipes, from appetizers to desserts, all tailored to your
            preferences and occasions.
          </p>
          <p>
            Our mission is to empower you in the kitchen, spark your creativity,
            and simplify your cooking journey. Join us as we revolutionize the
            culinary world with the power of AI. Explore FoodGPT, discover new
            flavors, and elevate your cooking to new heights. Happy cooking with
            FoodGPT!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
