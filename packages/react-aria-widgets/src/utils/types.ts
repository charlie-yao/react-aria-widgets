import { Validator } from 'prop-types';

//Misc.
import { VALID_HTML_HEADER_LEVELS } from 'src/utils';

export type Props = Record<string, any>; //eslint-disable-line @typescript-eslint/no-explicit-any

export interface ValidatorWithRequired<T> extends Validator<T> {
  isRequired: Validator<T>;
}

export type ValidHTMLHeaderLevels = typeof VALID_HTML_HEADER_LEVELS[number];
