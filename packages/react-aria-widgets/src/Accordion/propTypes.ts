import PropTypes from 'prop-types';

//Misc.
import { VALID_HTML_HEADER_LEVELS } from 'src/utils';

export const accordionContextValuePropType = PropTypes.exact({
  allowMultiple: PropTypes.bool.isRequired,
  allowCollapseLast: PropTypes.bool.isRequired,
  headerLevel: PropTypes.oneOf(VALID_HTML_HEADER_LEVELS).isRequired,
  getIsExpanded: PropTypes.func.isRequired,
  getIsDisabled: PropTypes.func.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  toggleUsable: PropTypes.func.isRequired,
  pushHeaderRef: PropTypes.func.isRequired,
  focusHeaderIndex: PropTypes.func.isRequired,
  focusHeaderId: PropTypes.func.isRequired,
  focusPrevHeader: PropTypes.func.isRequired,
  focusNextHeader: PropTypes.func.isRequired,
  focusFirstHeader: PropTypes.func.isRequired,
  focusLastHeader: PropTypes.func.isRequired,
});
