/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Form, Input } from '../components';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('Render form with initial value', () => {
  const { container } = render(
    <Form initialValues={{ firstName: 'Antonio' }} onSubmit={() => undefined}>
      <Input label="First name" name="firstName" />

      <button type="submit">Submit</button>
    </Form>
  );

  expect(container).toMatchSnapshot();
});
