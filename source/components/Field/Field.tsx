import React, { Fragment, ReactNode } from 'react';
import { useField } from '../../hooks';
import { TFieldOptions } from '../../hooks/field';
import { TField } from '../../types/field';

type TInputProps = {
  name: string;
  type?: string;
  options: TFieldOptions;
  children: (field: TField) => ReactNode
};

export default function Field({
  name,
  type = 'text',
  options,
  children,
  ...props
}: TInputProps) {
  const field = useField(name, options);

  return children(field)
}
