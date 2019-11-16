import React, { useContext } from "react";

import { UserContext } from '../../Contexts/UserContext';

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import HeaderLink from "./HeaderLink";

const Header = () => {

  const { user } = useContext(UserContext);

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="mb-3">
      <Container fluid="true" className="my-auto">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <HeaderLink to="/" title="Home" />
            <HeaderLink to="/events/">Events</HeaderLink>
            <HeaderLink to="/feedback">Feedback</HeaderLink>
          </Nav>
          <Nav>
            {(() => {
              if (user && user.uid) {
                return <HeaderLink to="/profile/">Profile</HeaderLink>
              } else if (user !== null) {
                return <HeaderLink to="/login/">Log In</HeaderLink>
              } else {
                return <div />
              }
            })()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Header;
