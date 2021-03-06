import React, { useContext } from 'react';

import { EventType } from '../../../Types/';

import { EventsContext } from '../../../Contexts/Events';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { FieldProps } from 'formik';
import { EventFormValues } from '../EventForm';
import AlertInFormer from '../../Common/AlertInFormer';

const EventTypeInput: React.FC<FieldProps<EventFormValues>> = props => {
  const {
    form: { values, touched, errors },
    field,
  } = props;
  const { eventTypes } = useContext(EventsContext);

  return (
    <AlertInFormer errors={errors} touched={touched} name="type">
      <Form.Group>
        <Form.Label>What type of event is this?</Form.Label>
        <Row>
          {Object.keys(eventTypes).map(type => {
            const formal = eventTypes[type as EventType].formal;
            return (
              <Col key={type} sm={6} lg={4}>
                <Form.Check
                  required
                  custom
                  type="radio"
                  label={formal}
                  name="type"
                  id={`event-type-${type}`}
                  onChange={field.onChange}
                  value={type}
                  checked={values.type === type}
                />
              </Col>
            );
          })}
        </Row>
      </Form.Group>
    </AlertInFormer>
  );
};

export default EventTypeInput;
