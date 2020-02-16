import React, { useContext, useEffect } from 'react';

import { UserContext } from '../Contexts/User';

import { useHistory, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VerificationRequests from './Auth/VerificationRequests';

const Profile: React.FC = () => {
  useEffect(() => {
    document.title = 'Resident 51 | Profile';
  }, []);
  const { user, isLoggingIn } = useContext(UserContext);

  const history = useHistory();
  useEffect(() => {
    if (!isLoggingIn && !user.uid) {
      history.replace('/login');
    }
  }, [user, history, isLoggingIn]);

  // Return empty component while waiting for auth
  if (!user.uid) return <div />;

  const status = ['Unverified', 'Resident', 'Editor', 'Admin'][user.permissions] || 'User';

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={4}>
          <Container>
            <Row>
              <Col>
                <h1>{user.displayName}</h1>
                <h3>{user.hall || <i>No hall selected</i>}</h3>
                <h3>{status}</h3>
                {!user.kuEmail && user.permissions === 0 && (
                  <p>
                    <i>
                      If you haven't already, <Link to="/first-login">request verification</Link>.
                    </i>
                  </p>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs={12} md={7}>
          <Container>
            <h1 className="text-center mb-4">
              {user.permissions > 2 ? 'Admin' : 'Your'} Dashboard
            </h1>
          </Container>
          {user.permissions >= 3 ? (
            <VerificationRequests />
          ) : (
            <Row className="justify-content-center">
              <Col className="text-center" xs={12}>
                <i className="lead">(We're still working on this part!)</i>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
