import React, { Fragment } from 'react';
import { useField } from '../../../hooks';
import { TValidations } from '../../../types/form';

type TInputProps = {
  name: string;
  type?: string;
  label?: string;
  validations?: TValidations;
};

export default function Input({
  name,
  type = 'text',
  label,
  validations,
  ...props
}: TInputProps) {
  const { input } = useField(name, { validations });

  return (
    <fieldset>
      {label ? (
        <Fragment>
          <label>{label}</label>
          <br />
        </Fragment>
      ) : null}

      <input
        type={type}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        {...props}
      />

      {input.error ? (
        <Fragment>
          <br />
          <div>{input.error}</div>
        </Fragment>
      ) : null}
    </fieldset>
  );
}
