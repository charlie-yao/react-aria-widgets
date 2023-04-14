import { Validator } from 'prop-types';

export interface Props {
  [key: string]: any;
}

export interface ValidatorWithRequired<T> extends Validator<T> {
  isRequired?: Validator<T>;
}
