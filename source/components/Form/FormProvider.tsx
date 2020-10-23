import React, { useState, useCallback } from 'react';
import { createContext, ReactNode, SyntheticEvent } from 'react';
import { TField } from '../../hooks/field';
import { TKeyValue, TFormState } from '../../types/form';

export const FormContext = createContext<TFormState>(null);

type TFormProviderProps = {
  onSubmit: (values: TKeyValue, event: SyntheticEvent) => void;
  initialValues: TKeyValue;
  children: ReactNode;
};

export default function FormProvider({
  initialValues = {},
  onSubmit,
  children,
}: TFormProviderProps) {
  const [fields, setFields] = useState([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [fieldsWithChanges, setFieldsWithChanges] = useState([]);

  const registerField = useCallback(
    (field: TField) => {
      if (!fields.find((it) => it.name === field.name)) {
        setFields((prevFields) => [...prevFields, field]);
      }
    },
    [fields]
  );

  const updateFieldValue = useCallback(
    (fieldName, newValue) => {
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
    },
    [fieldsWithChanges, formValues, initialValues]
  );

  const setFieldError = useCallback((fieldName, error) => {
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [fieldName]: error,
    }));
  }, []);

  const cleanFieldError = useCallback(
    (fieldName) => {
      if (formErrors[fieldName]) {
        setFormErrors((prevFormErrors) => {
          delete prevFormErrors[fieldName];
          return prevFormErrors;
        });
      }
    },
    [formErrors]
  );

  const getValue = useCallback(
    (fieldName) => {
      return formValues[fieldName] || '';
    },
    [formValues]
  );

  const getError = useCallback(
    (fieldName) => {
      return formErrors[fieldName] || null;
    },
    [formErrors]
  );

  const isValid = !Object.keys(formErrors).length;

  const hasChanged = Boolean(fieldsWithChanges.length);

  const submit = useCallback(
    (e) => {
      e.preventDefault();

      for (const field of fields) {
        if (field.options?.validations) {
          cleanFieldError(field.name);

          // Check if fields are valid before submit
          for (const validate of field.options?.validations) {
            try {
              validate(getValue(field.name));
            } catch (error) {
              setFieldError(field.name, error);

              return undefined;
            }
          }
        }
      }

      return onSubmit(formValues, e);
    },
    [fields, cleanFieldError, onSubmit, formValues, getValue, setFieldError]
  );

  const formState = {
    registerField,
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
