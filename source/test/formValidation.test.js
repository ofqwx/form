/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Form, Input } from '../components';
import { fireEvent, render, screen } from '@testing-library/react';
import { toMatchDiffSnapshot } from 'snapshot-diff';
import '@testing-library/jest-dom/extend-expect';
import validations from '../validation/validation';

expect.extend({ toMatchDiffSnapshot });

test('String required validation', async () => {
  const { asFragment } = render(
    <Form initialValues={{ firstName: 'antonio' }} onSubmit={() => undefined}>
      <Input
        label="First name"
        name="firstName"
        validations={[validations.string.required('First name is required')]}
      />

      <button type="submit">Submit</button>
    </Form>
  );

  const firstRender = asFragment();

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: '' },
  });

  // Display error when value is empty after change
  expect(firstRender).toMatchDiffSnapshot(asFragment());

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'Wooga' },
  });

  // Remove error when value is not empty after change
  expect(firstRender).toMatchDiffSnapshot(asFragment());
});

test('String regex validation', async () => {
  const regex = /^(?:wooga\.name).[\w|\W]{1,}/;

  const { asFragment } = render(
    <Form onSubmit={() => undefined}>
      <Input
        label="First name"
        name="firstName"
        validations={[
          validations.string.regex(
            'First name must start with "wooga.name"',
            regex
          ),
        ]}
      />

      <button type="submit">Submit</button>
    </Form>
  );

  const firstRender = asFragment();

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'antonio' },
  });

  // Display error if value doesn't match with the regex
  expect(firstRender).toMatchDiffSnapshot(asFragment());

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'wooga.name antonio' },
  });

  // Remove error if value match with the regex
  expect(firstRender).toMatchDiffSnapshot(asFragment());
});

test('String regex and required validation', async () => {
  const regex = /^(?:wooga\.name).[\w|\W]{1,}/;

  const { asFragment } = render(
    <Form initialValues={{ firstName: 'antonio' }} onSubmit={() => undefined}>
      <Input
        label="First name"
        name="firstName"
        validations={[
          validations.string.required('First name is required'),
          validations.string.regex(
            'First name must start with "wooga.name"',
            regex
          ),
        ]}
      />

      <button type="submit">Submit</button>
    </Form>
  );

  const firstRender = asFragment();

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: '' },
  });

  // Display error if value is empty
  expect(firstRender).toMatchDiffSnapshot(asFragment());

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'wooga' },
  });

  // Remove required error and display regex error
  expect(firstRender).toMatchDiffSnapshot(asFragment());

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'wooga.name.antonio' },
  });

  // Remove all errors, value is not empty and match regex
  expect(firstRender).toMatchDiffSnapshot(asFragment());
});
