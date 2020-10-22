import { useContext } from 'react';
import { TFormState } from '../types/form';
import { FormContext } from '../components';

export default function useForm(): TFormState {
  const formState = useContext(FormContext);

  return formState;
}
