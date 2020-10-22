import React, { ReactNode } from 'react';
import FormProvider from './FormProvider';
import { TKeyValue } from '../../types/form';
import { useForm } from '../../hooks/';

type TFormProps = {
  onSubmit: () => void;
  initialValues: TKeyValue;
  children: ReactNode;
};

function Form({ children }: { children: ReactNode }) {
  const { submit } = useForm();

  return <form onSubmit={submit}>{children}</form>;
}

export default function FormSetup({
  onSubmit,
  initialValues,
  children,
}: TFormProps) {
  return (
    <FormProvider onSubmit={onSubmit} initialValues={initialValues}>
      <Form>{children}</Form>
    </FormProvider>
  );
}
