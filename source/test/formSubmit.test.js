/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Form, Field } from '../components';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import validations from '../validation/validation';

test('Submit and validate form values', () => {
  const mockSubmitFunction = jest.fn((values) => values.firstName);

  render(
    <Form
      initialValues={{ firstName: 'wooga.name.antonio' }}
      onSubmit={mockSubmitFunction}
    >
      <Field
        name="firstName"
        options={{
          label: 'First name',
          validations: [validations.string.required('This field is required')],
        }}
      >
        {({ input }) => (
          <div>
            {input.label ? <label>{input.label}</label> : null}

            <input {...input} />
          </div>
        )}
      </Field>

      <button type="submit">Submit</button>
    </Form>
  );

  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(mockSubmitFunction.mock.calls.length).toBe(1);
  expect(mockSubmitFunction.mock.results[0].value).toBe('wooga.name.antonio');

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: '' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

  // validation should avoid execute again onSubmit
  expect(mockSubmitFunction.mock.calls.length).toBe(1);
});
