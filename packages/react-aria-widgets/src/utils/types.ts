import { Validator } from 'prop-types';

//Misc.
import { VALID_HTML_HEADER_LEVELS } from 'src/utils';

export interface Props {
  [key: string]: any;
}

export interface ValidatorWithRequired<T> extends Validator<T> {
  isRequired: Validator<T>;
}

export type ValidHTMLHeaderLevels = typeof VALID_HTML_HEADER_LEVELS[number];
