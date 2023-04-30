//Misc.
import { createValidatorWithRequired } from 'src/utils';

/**
 * Because HTML only allows <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>,
 * complain if an invalid header level prop gets passed in.
 */
export const validateHeaderLevelProp = createValidatorWithRequired<number>((
  props,
  propName,
  componentName,
  location,
  propFullName
) => {
  const headerLevel = props[propName] as unknown;
  const displayedComponentName = componentName ?? '<<anonymous>>';
  const displayedPropName = propFullName ?? propName;

  if(typeof headerLevel !== 'number' || !Number.isInteger(headerLevel) || headerLevel < 1 || headerLevel > 6)
    return new Error(`Invalid ${location} \`${displayedPropName}\` supplied to \`${displayedComponentName}\`, \`${displayedPropName}\` must be an integer between 1 and 6 (inclusive).`);

  return null;
});
