/* eslint "react/require-default-props": [ "error", { forbidDefaultForRequired: true, functions: "defaultProps" } ] */
/* eslint-disable react/no-unused-prop-types */

import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

//Types
import { accordionSectionProp } from 'src/Accordion/propTypes';
import type { AccordionProps, HeaderRef } from 'src/Accordion/types';

//Misc.
import { defaultRenderSection } from 'src/Accordion/utils';
import { VALID_HTML_HEADER_LEVELS } from 'src/utils';

function Accordion(props: AccordionProps) {
  const {
    sections,
    allowMultiple,
    allowToggle,
    renderSection = defaultRenderSection,
  } = props;

  const [ expandedSections, setExpandedSections ] = useState(new Set<string>());
  const headerRefs = useRef<HeaderRef[]>([]);

  /**
   * Returns a boolean that lets us know if this accordion lets us collapse
   * an already-expanded accordion section.
   *
   * Note that even though this component accepts <code>allowToggle</code> and
   * <code>allowMultiple</code> as independent booleans, it doesn't reflect
   * the actual behavior of this accordion implementation.
   *
   * Technically speaking, this component can receive props such that
   * <code>allowMultiple && !allowToggle</code>. But that situation would
   * allow for opening multiple accordion sections that can't be closed. So,
   * we force sections to be toggleable if <code>allowMultiple</code> is
   * <code>true</code>.
   *
   * Additionally, child components should use <code>getAllowToggle</code> rather
   * than directly accessing the <code>allowToggle</code> prop because the getter
   * reflects the above behavior.
   */
  const getAllowToggle = useCallback(() => {
    return allowMultiple ? true : allowToggle;
  }, [ allowMultiple, allowToggle ]);

  /**
   * Returns a boolean that lets us know if a particular accordion section is
   * expanded or collapsed.
   */
  const getIsExpanded = useCallback((id: string) => {
    return expandedSections.has(id);
  }, [ expandedSections ]);

  /**
   * Returns a boolean that lets us know if an aleady-expanded accordion section
   * can't be collapsed due to <code>allowToggle</code>.
   */
  const getIsDisabled = useCallback((id: string) => {
    return !getAllowToggle() && getIsExpanded(id);
  }, [ getAllowToggle, getIsExpanded ]);

  /**
   * Expands or collapses an accordion section. Respects <code>allowMultiple</code>
   * and <code>allowToggle</code>.
   */
  const toggleSection = useCallback((id: string) => {
    const isExpanded = getIsExpanded(id);
    const isDisabled = getIsDisabled(id);

    setExpandedSections((expandedSections) => {
      if(allowMultiple) {
        if(isExpanded)
          expandedSections.delete(id);
        else
          expandedSections.add(id);
      }
      else {
        expandedSections.clear();

        //Expand the section if it was originally collapsed,
        //or if it shouldn't have been collapsed as a result
        //of the indiscriminate call to clear() that we just made.
        if(!isExpanded || isDisabled)
          expandedSections.add(id);
      }

      return new Set(expandedSections);
    });
  }, [ getIsExpanded, getIsDisabled ]);

  /**
   * Ref callback that pushes an accordion header button to headerRefs.
   */
  const pushHeaderRef = useCallback((ref: HeaderRef) => {
    headerRefs.current.push(ref);
  }, []);

  /**
   * Sets focus to an arbitrary accordion header button.
   */
  const focusHeader = useCallback((index: number) => {
    const ref = headerRefs.current[index];

    if(!ref)
      return;

    ref.focus();
  }, []);

  /**
   * Sets focus on the previous accordion header button (relative to index).
   * Will "wrap" around the array if the boundary is reached.
   */
  const focusPrevHeader = useCallback((index: number) => {
    focusHeader(index === 0 ? headerRefs.current.length - 1 : index - 1);
  }, []);

  /**
   * Sets focus on the next accordion header button (relative to index).
   * Will "wrap" around the array if the boundary is reached.
   */
  const focusNextHeader = useCallback((index: number) => {
    focusHeader(index === headerRefs.current.length - 1 ? 0 : index + 1);
  }, []);

  /**
   * Sets focus on the first accordion header button.
   */
  const focusFirstHeader = useCallback(() => {
    focusHeader(0);
  }, []);

  /**
   * Sets focus on the last accordion header button.
   */
  const focusLastHeader = useCallback(() => {
    focusHeader(headerRefs.current.length - 1);
  }, []);

  const renderedSections = sections.map((section, index) => {
    return renderSection(index, props, {
      getAllowToggle,
      getIsExpanded,
      getIsDisabled,
      toggleSection,
      pushHeaderRef,
      focusHeader,
      focusPrevHeader,
      focusNextHeader,
      focusFirstHeader,
      focusLastHeader,
    });
  });

  return (
    <>
      { renderedSections }
    </>
  );
}

Accordion.propTypes = {
  allowMultiple: PropTypes.bool,
  allowToggle: PropTypes.bool,
  sections: PropTypes.arrayOf(accordionSectionProp.isRequired).isRequired,
  headerLevel: PropTypes.oneOf(VALID_HTML_HEADER_LEVELS).isRequired,
  renderSection: PropTypes.func,
  renderHeader: PropTypes.func,
  renderPanel: PropTypes.func,
  headerProps: PropTypes.object,
  panelProps: PropTypes.object,
  headerElementType: PropTypes.elementType.isRequired,
  panelElementType: PropTypes.elementType.isRequired,
};

Accordion.defaultProps = {
  allowMultiple: true,
  allowToggle: true,
};

export default Accordion;
