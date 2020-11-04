import { SyntheticEvent } from 'react';

export type TField = {
  input: {
    name: string;
    label: string | null;
    onChange: (e: SyntheticEvent) => void;
    value: any;
    error: string;
  };
};
