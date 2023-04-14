import { Validator } from 'prop-types';

//Misc.
import { createValidatorWithRequired } from 'src/utils';

/**
 * Because HTML only allows <h1> to <h6>, complain if
 * an invalid headerLevel prop gets passed in.
 */
const _validateHeaderLevelProp: Validator<number> = (props, propName) => {
  const headerLevel = props[propName];

  if(!Number.isInteger(headerLevel) || headerLevel < 1 || headerLevel > 6)
    return new Error(`${propName} must be an integer between 1 and 6 (inclusive).`);

  return null;
}

const validateHeaderLevelProp = createValidatorWithRequired(_validateHeaderLevelProp);
validateHeaderLevelProp.isRequired = createValidatorWithRequired(_validateHeaderLevelProp, true);
export { validateHeaderLevelProp };
