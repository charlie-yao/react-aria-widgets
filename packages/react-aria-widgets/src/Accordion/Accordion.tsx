import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import AccordionSection from 'src/Accordion/AccordionSection';

//HOCs
import withAccordionManager from 'src/Accordion/withAccordionManager';

//Misc.
import { validateHeaderLevelProp } from 'src/utils/propTypes';

class Accordion extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    headerLevel: validateHeaderLevelProp,
    //From <AccordionManager>
    allowMultiple: PropTypes.bool.isRequired,
    allowToggle: PropTypes.bool.isRequired,
    getIsExpanded: PropTypes.func.isRequired,
    getIsDisabled: PropTypes.func.isRequired,
    toggleSection: PropTypes.func.isRequired,
    setHeaderRef: PropTypes.func.isRequired,
    focusHeader: PropTypes.func.isRequired,
    focusPrevHeader: PropTypes.func.isRequired,
    focusNextHeader: PropTypes.func.isRequired,
    focusFirstHeader: PropTypes.func.isRequired,
    focusLastHeader: PropTypes.func.isRequired,
  };

  static defaultProps = {
    headerLevel: 2,
  };

  //---- Events ----
  onClick = (event) => {
    const { toggleSection } = this.props;
    toggleSection(event.target.id);
  };

  onKeyDown = (event) => {
    const { focusPrevHeader, focusNextHeader, focusFirstHeader, focusLastHeader } = this.props;
    const { key } = event;
    const index = Number.parseInt(event.target.dataset.index, 10);

    if(key === 'ArrowUp') {
      event.preventDefault();
      focusPrevHeader(index);
    }
    else if(key === 'ArrowDown') {
      event.preventDefault();
      focusNextHeader(index);
    }
    else if(key === 'Home') {
      event.preventDefault();
      focusFirstHeader();
    }
    else if(key === 'End') {
      event.preventDefault();
      focusLastHeader();
    }
  };

  //---- Rendering ----
  render() {
    const {
      children, headerLevel, allowMultiple, allowToggle,
      getIsExpanded, getIsDisabled, toggleSection, setHeaderRef, focusHeader,
      focusPrevHeader, focusNextHeader, focusFirstHeader, focusLastHeader,
    } = this.props;

    const mappedChildren = React.Children.map(children, (child, i) => {
      const { type } = child;

      if(type !== AccordionSection)
        throw new Error('Only <AccordionSection>s are valid children of <Accordion>.');

      return React.cloneElement(child, {
        index: i,
        onClick: this.onClick,
        onKeyDown: this.onKeyDown,
        headerLevel,
        allowMultiple,
        allowToggle,
        getIsExpanded,
        getIsDisabled,
        toggleSection,
        setHeaderRef,
        focusHeader,
        focusPrevHeader,
        focusNextHeader,
        focusFirstHeader,
        focusLastHeader,
      });
    });

    return mappedChildren;
  }
}

export default withAccordionManager(Accordion);
