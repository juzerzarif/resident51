import React from "react";

import Container from "react-bootstrap/Container";
// import CardColumns from "react-bootstrap/CardColumns";
// import CardDeck from "react-bootstrap/CardDeck";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import R51Card from "./R51Card";

// Dev
import lorem from "../tests/lorem";
const gen = lorem.generateSentences.bind(lorem);

const Home = () => (
  <Container fluid={true}>
    <Row className="justify-content-md-center">
      <Col md={10} lg={6}>
        <R51Card.Home title="Events">{gen(11)}</R51Card.Home>
        <R51Card.Home title="Resources">{gen(7)}</R51Card.Home>
      </Col>
      <Col md={10} lg={6}>
        <R51Card.Home title="Legacy">{gen(12)}</R51Card.Home>
        <R51Card.Home title="Feedback">{gen(2)}</R51Card.Home>
      </Col>
    </Row>
  </Container>
);

export default Home;