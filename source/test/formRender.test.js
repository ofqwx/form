/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Form, Field } from '../components';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('Render form with initial value', () => {
  const { container } = render(
    <Form initialValues={{ firstName: 'Antonio' }} onSubmit={() => undefined}>
      <Field name="firstName">{(field) => <input {...field.input} />}</Field>
    </Form>
  );

  expect(container).toMatchSnapshot();
});
