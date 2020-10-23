import { useEffect, useCallback, SyntheticEvent } from 'react';
import { useForm } from '.';
import { TValidations } from '../types/form';

export type TFieldOptions = {
  validations: TValidations;
};

export type TField = {
  name: string;
  options?: TFieldOptions;
};

export default function useField(name: string, options?: TFieldOptions) {
  const {
    getValue,
    getError,
    updateFieldValue,
    setFieldError,
    cleanFieldError,
    registerField,
  } = useForm();

  useEffect(() => registerField({ name, options } as TField), []);

  const onChange = useCallback(
    (e: SyntheticEvent, name: string, validations: TValidations) => {
      const target = e.target as HTMLInputElement;
      const value = target.value;

      updateFieldValue(name, value);

      if (validations) {
        cleanFieldError(name);

        for (const validate of validations) {
          try {
            validate(value);
          } catch (error) {
            setFieldError(name, error);

            return undefined;
          }
        }
      }
    },
    [cleanFieldError, setFieldError, updateFieldValue]
  );

  return {
    input: {
      name,
      onChange: (e) => onChange(e, name, options.validations),
      value: getValue(name),
      error: getError(name),
    },
  };
}
