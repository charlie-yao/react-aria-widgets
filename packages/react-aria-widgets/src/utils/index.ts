import { Validator } from 'prop-types';

//Types
import { ValidatorWithRequired } from 'src/types';

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
