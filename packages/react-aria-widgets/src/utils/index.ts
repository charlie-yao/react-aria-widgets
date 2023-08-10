import type { Validator } from 'prop-types';

export interface ValidatorWithRequired<T> extends Validator<T> {
  isRequired: Validator<T>;
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
 */
export function createValidatorWithRequired<T>(validator: Validator<T>) {
  const isRequired: Validator<T> = (props, propName, componentName, location, propFullName) => {
    /* eslint-disable @typescript-eslint/no-unnecessary-condition */
    /* eslint-disable @typescript-eslint/restrict-template-expressions */

    const prop = props[propName] as unknown;
    const displayedComponentName = componentName ?? '<<anonymous>>';
    const displayedPropName = propFullName ?? propName;

    if(prop === null || prop === undefined)
      return new Error(`The ${location} \`${displayedPropName}\` is marked as required in \`${displayedComponentName}\`, but its value is \`${prop}\`.`);
    else
      return validator(props, propName, componentName, location, propFullName);
  };

  const validatorWithRequired: ValidatorWithRequired<T> = Object.assign(validator, {
    isRequired,
  });

  return validatorWithRequired;
}

export const VALID_HTML_HEADER_LEVELS = [ 1, 2, 3, 4, 5, 6 ] as const;
