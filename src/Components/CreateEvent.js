import React, { useContext } from "react";

import { EventsContext } from "../Contexts/EventsContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventForm from "./EventForm";
import EventCreationFAQ from "./EventCreationFAQ";

const CreateEvent = ({ history }) => {
  
  const { dispatchToEvents } = useContext(EventsContext);

  const onSubmit = event => {
    alert(event);

    dispatchToEvents({
      type: "ADD",
      event
    });
    console.log("event!: ", event);
    history.push("/events");
  };

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col className="HomeCard margin-bottom" sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col className="HomeCard margin-bottom" sm={12} md={7}>
          <h1>Create New Event</h1>
          <hr />
          <EventForm onSubmit={onSubmit} />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEvent;
