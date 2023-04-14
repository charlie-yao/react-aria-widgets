import PropTypes from 'prop-types';

export const accordionSectionProp = PropTypes.exact({
  id: PropTypes.string.isRequired,
  renderHeader: PropTypes.func,
  renderPanel: PropTypes.func,
  renderHeaderContent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  renderPanelContent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  headerProps: PropTypes.object,
  panelProps: PropTypes.object,
  headerElementType: PropTypes.elementType,
  panelElementType: PropTypes.elementType,
});
