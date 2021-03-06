import { SyntheticEvent } from 'react';
import { TFieldProps } from '../hooks/field';

export type TKeyValue = {
  [key: string]: any;
};

export type TValidations = Array<(message: string) => void>;

export type TFormState = null | {
  registerField: (field: TFieldProps) => void;
  values: TKeyValue;
  errors: TKeyValue;
  getValue: (fieldName: string) => any;
  getError: (fieldName: string) => any;
  updateFieldValue: (fieldName: string, newValue: any) => void;
  setFieldError: (fieldName: string, error: string) => void;
  cleanFieldError: (fieldName: string) => void;
  isValid: boolean;
  hasChanged: boolean;
  submit: (event: SyntheticEvent) => void;
};
