import React, { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { TKeyValue, TFormState } from '../../types/form';

export const FormContext = createContext<TFormState>(null);

type TFormProviderProps = {
  onSubmit: (values: TKeyValue) => void;
  initialValues: TKeyValue;
  children: ReactNode;
};

export default function FormProvider({
  initialValues = {},
  onSubmit,
  children,
}: TFormProviderProps) {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [fieldsWithChanges, setFieldsWithChanges] = useState([]);

  function updateFieldValue(fieldName, newValue) {
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        [fieldName]: newValue,
      };
    });

    const valueHasChanged =
      formValues[fieldName] !== newValue &&
      initialValues[fieldName] !== newValue;

    if (valueHasChanged && !fieldsWithChanges.includes(fieldName)) {
      setFieldsWithChanges((prevFieldsWithChanges) => [
        ...prevFieldsWithChanges,
        fieldName,
      ]);
    } else if (!valueHasChanged && fieldsWithChanges.includes(fieldName)) {
      setFieldsWithChanges((prevFieldsWithChanges) =>
        prevFieldsWithChanges.filter((field) => field !== fieldName)
      );
    }
  }

  function setFieldError(fieldName, error) {
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [fieldName]: error,
    }));
  }

  function cleanFieldError(fieldName) {
    if (formErrors[fieldName]) {
      setFormErrors((prevFormErrors) => {
        delete prevFormErrors[fieldName];
        return prevFormErrors;
      });
    }
  }

  function getValue(fieldName) {
    return formValues[fieldName] || '';
  }

  function getError(fieldName) {
    return formErrors[fieldName] || null;
  }

  function isValid() {
    return !Object.keys(formErrors).length;
  }

  function hasChanged() {
    return Boolean(fieldsWithChanges.length)
  }

  function submit(e) {
    e.preventDefault();

    return onSubmit(formValues);
  }

  const formState = {
    values: formValues,
    errors: formErrors,
    getValue,
    getError,
    updateFieldValue,
    setFieldError,
    cleanFieldError,
    isValid,
    hasChanged,
    submit,
  };

  return (
    <FormContext.Provider value={formState}>{children}</FormContext.Provider>
  );
}
