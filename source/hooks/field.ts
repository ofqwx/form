import { useForm } from '.';
import { TValidations } from '../types/form';

type TUseFieldOptions = {
  validations: TValidations;
};

export default function useField(name: string, options?: TUseFieldOptions) {
  const {
    getValue,
    getError,
    updateFieldValue,
    setFieldError,
    cleanFieldError,
  } = useForm();

  function onChange(e, name, validations) {
    const value = e.target.value;

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
  }

  return {
    input: {
      name,
      onChange: (e) => onChange(e, name, options.validations),
      value: getValue(name),
      error: getError(name),
    },
  };
}
