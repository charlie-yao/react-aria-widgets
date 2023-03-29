import { Validator } from 'prop-types';

export interface ValidatorWithRequired<T> extends Validator<T> {
  isRequired?: Validator<T>;
}

/**
 * Lets us declare props with custom validators as mandatory in the usual
 * "PropTypes.isRequired" manner.
 * 
 * Though the validator function can just return an error if the prop isn't
 * supplied, by declaring it as ".isRequired" in a component's propTypes,
 * we circumvent an issue with eslint-plugin-react. Normally, the rule
 * react/require-default-props will complain if it encounters a custom prop validator
 * because without a wrapper like this, they can't be marked as ".isRequired".
 *
 * @see {@link https://github.com/yannickcr/eslint-plugin-react/issues/1020}
 * @see {@link https://github.com/facebook/react/issues/9125#issuecomment-285531461}
 *
 * @param {Validator} validator - A function that returns an Error if the prop is invalid
 * @param {boolean} [isRequired=false] - Determines whether or not an Error should be returned if the prop isn't supplied
 * @returns {ValidatorWithRequired} - A validator that automatically checks if the prop exists if isRequired is true
 */
export function createValidatorWithRequired<T>(validator: Validator<T>, isRequired: boolean = false): ValidatorWithRequired<T> {
  return function(props, propName, componentName, location, propFullName) {
    const prop = props[propName];

    if(isRequired && (prop === null || prop === undefined))
      return new Error(`${propName} is a required prop.`);
    else
      return validator(props, propName, componentName, location, propFullName);
  };
}

/**
 * Because HTML only allows <h1> to <h6>, complain if
 * an invalid headerLevel prop gets passed in.
 *
 * @param {object} props
 * @param {string} propName
 * @returns {Error | null}
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
