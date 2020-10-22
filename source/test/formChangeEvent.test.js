/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Form, Input } from '../components';
import { render, fireEvent, screen } from '@testing-library/react';
import { toMatchDiffSnapshot } from 'snapshot-diff';
import '@testing-library/jest-dom/extend-expect';

expect.extend({ toMatchDiffSnapshot });

test('Value change when change event is triggered', async () => {
  const { asFragment } = render(
    <Form initialValues={{ firstName: 'Antonio' }} onSubmit={() => undefined}>
      <Input label="First name" name="firstName" />

      <button type="submit">Submit</button>
    </Form>
  );

  const firstRender = asFragment();

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'Pedro' },
  });

  expect(firstRender).toMatchDiffSnapshot(asFragment());
});
