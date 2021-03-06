import React from 'react';

import Form from 'react-bootstrap/Form';
import { FieldProps } from 'formik';

import { WebsiteFeedback } from '../Website';
import AlertInFormer from '../../Common/AlertInFormer';

const Message: React.FC<FieldProps<WebsiteFeedback>> = props => {
  const {
    form: { values, touched, errors },
    field,
  } = props;

  return (
    <AlertInFormer errors={errors} touched={touched} name="message">
      <Form.Group controlId="message">
        <Form.Label>Message:</Form.Label>
        <Form.Control
          name="message"
          required
          as="textarea"
          maxLength={1000}
          onChange={field.onChange}
          value={values.message}
          placeholder="Provide details..."
          rows="5"
        />
      </Form.Group>
    </AlertInFormer>
  );
};

export default Message;
