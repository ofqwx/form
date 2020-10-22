import React, { ReactNode } from 'react';
import FormProvider from './FormProvider';
import { TKeyValue } from '../../types/form';
import { useForm } from '../../hooks/';

type TFormProps = {
  onSubmit: () => void;
  initialValues: TKeyValue;
  children: ReactNode;
};

function Form({ children, ...props }: { children: ReactNode }) {
  const { submit } = useForm();

  return (
    <form onSubmit={submit} {...props}>
      {children}
    </form>
  );
}

export default function FormSetup({
  onSubmit,
  initialValues,
  children,
  ...props
}: TFormProps) {
  return (
    <FormProvider onSubmit={onSubmit} initialValues={initialValues}>
      <Form {...props}>{children}</Form>
    </FormProvider>
  );
}
