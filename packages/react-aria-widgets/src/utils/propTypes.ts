//Misc.
import { createValidatorWithRequired } from 'src/utils';

/**
 * Because HTML only allows <h1> to <h6>, complain if
 * an invalid headerLevel prop gets passed in.
 */
const validateHeaderLevelProp = createValidatorWithRequired<number>((
  props,
  propName,
  componentName,
  location,
  propFullName
) => {
  const headerLevel = props[propName];
  const displayedComponentName = componentName ?? '<<anonymous>>';
  const displayedPropName = propFullName ?? propName;

  if(!Number.isInteger(headerLevel) || headerLevel < 1 || headerLevel > 6)
    return new Error(`Invalid ${location} \`${displayedPropName}\` supplied to \`${displayedComponentName}\`, \`${displayedPropName}\` must be an integer between 1 and 6 (inclusive).`);

  return null;
});

export { validateHeaderLevelProp };
