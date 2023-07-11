import { useState, useCallback, useRef, useMemo } from 'react';

//Types
import type {
  HeaderRef,
  GetIsExpanded,
  GetIsDisabled,
  ToggleSection,
  PushHeaderRef,
  FocusHeader,
  FocusPrevHeader,
  FocusNextHeader,
  FocusFirstHeader,
  FocusLastHeader,
} from 'src/Accordion/types';

function _getIsExpanded(expandedSections: Set<string>, id: string) {
  return expandedSections.has(id);
}

function _getIsDisabled(allowToggle: boolean, isExpanded: boolean) {
  return !allowToggle && isExpanded;
}

export default function useAccordion(allowMultiple: boolean, allowToggle: boolean) {
  const [ expandedSections, setExpandedSections ] = useState(new Set<string>());
  const headerRefs = useRef<HeaderRef[]>([]);
  const headerRefIndexMap = useRef<Map<HeaderRef, number>>(new Map());

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
  const getIsExpanded: GetIsExpanded = useCallback((id) => {
    return _getIsExpanded(expandedSections, id);
  }, [ expandedSections ]);

  /**
   * Returns a boolean that lets us know if an aleady-expanded accordion section
   * can't be collapsed due to <code>allowToggle</code>.
   */
  const getIsDisabled: GetIsDisabled = useCallback((id) => {
    return _getIsDisabled(getAllowToggle(), getIsExpanded(id));
  }, [ getAllowToggle, getIsExpanded ]);

  /**
   * Expands or collapses an accordion section. Respects <code>allowMultiple</code>
   * and <code>allowToggle</code>.
   */
  const toggleSection: ToggleSection = useCallback((id) => {
    setExpandedSections((expandedSections) => {
      const isExpanded = _getIsExpanded(expandedSections, id);
      const isDisabled = _getIsDisabled(getAllowToggle(), isExpanded);

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
  }, [
    allowMultiple,
    getAllowToggle,
  ]);

  /**
   * Ref callback that pushes an accordion header button to headerRefs.
   */
  const pushHeaderRef: PushHeaderRef = useCallback((ref) => {
    headerRefs.current.push(ref);
    headerRefIndexMap.current.set(ref, headerRefs.current.length - 1);
  }, []);

  /**
   * Sets focus to an arbitrary accordion header button.
   */
  const focusHeader: FocusHeader = useCallback((index) => {
    const ref = headerRefs.current[index];

    if(!ref)
      return;

    ref.focus();
  }, []);

  /**
   * Sets focus on the previous accordion header button (relative to index).
   * Will "wrap" around the array if the boundary is reached.
   */
  const focusPrevHeader: FocusPrevHeader = useCallback((event) => {
    const index = headerRefIndexMap.current.get(event.currentTarget);

    if(index === undefined)
      return;

    focusHeader(index === 0 ? headerRefs.current.length - 1 : index - 1);
  }, [ focusHeader ]);

  /**
   * Sets focus on the next accordion header button (relative to index).
   * Will "wrap" around the array if the boundary is reached.
   */
  const focusNextHeader: FocusNextHeader = useCallback((event) => {
    const index = headerRefIndexMap.current.get(event.currentTarget);

    if(index === undefined)
      return;

    focusHeader(index === headerRefs.current.length - 1 ? 0 : index + 1);
  }, [ focusHeader ]);

  /**
   * Sets focus on the first accordion header button.
   */
  const focusFirstHeader: FocusFirstHeader = useCallback(() => {
    focusHeader(0);
  }, [ focusHeader ]);

  /**
   * Sets focus on the last accordion header button.
   */
  const focusLastHeader: FocusLastHeader = useCallback(() => {
    focusHeader(headerRefs.current.length - 1);
  }, [ focusHeader ]);

  return useMemo(() => {
    return {
      allowMultiple,
      allowToggle: getAllowToggle(),
      getIsExpanded,
      getIsDisabled,
      toggleSection,
      pushHeaderRef,
      focusHeader,
      focusPrevHeader,
      focusNextHeader,
      focusFirstHeader,
      focusLastHeader,
    };
  }, [
    allowMultiple,
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
  ]);
}
