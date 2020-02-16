import React, { useContext, useState, useEffect } from 'react';

import { EventsContext } from '../Contexts/Events';
import { UserContext } from '../Contexts/User';

import { useHistory, useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { eventsCollection } from '../Firebase/firebase';

import EventCreationFAQ from './Events/EventCreationFAQ';
import EventNotFound from './Events/EventNotFound';
import ConfirmRemoveEvent from './Events/ConfirmRemoveEvent';

import { canUpdate } from '../Utils';

const RemoveEvent: React.FC = () => {
  useEffect(() => {
    document.title = 'Resident 51 | Remove Event';
  }, []);
  const { events } = useContext(EventsContext);
  const { user, isLoggingIn } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const history = useHistory();
  const { id = '' } = useParams();

  const eventToRemove = (events || []).find(e => '' + e.id === '' + id);

  const maySeePage = eventToRemove && canUpdate(eventToRemove.publicStatus, user);

  useEffect(() => {
    // #TODO this will probably trigger before user's permissions arrive to the user object.
    if (!isLoggingIn && !maySeePage && events) {
      return history.push('/events');
    }
  }, [events, history, isLoggingIn, maySeePage]);

  if (!maySeePage) return <div />;

  const handleConfirm = (): void => {
    setIsDeleting(true);
    eventsCollection
      .doc(id)
      .update('publicStatus.type', 'unpublished')
      .then(() => history.push('/events', { update: 'Event removed.', t: Date.now() }))
      .catch(e => {
        console.error(e);
        setIsDeleting(false);
      });
  };

  const showNotFoundMessage = !eventToRemove && !isDeleting;

  // #TODO change EventCreationFAQ to something less, uh, creation-y
  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col sm={12} md={7}>
          {showNotFoundMessage ? (
            <EventNotFound />
          ) : (
            eventToRemove && (
              <ConfirmRemoveEvent
                handleConfirm={handleConfirm}
                handleCancel={(): void => history.push('/events')}
                event={eventToRemove}
              />
            )
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RemoveEvent;
