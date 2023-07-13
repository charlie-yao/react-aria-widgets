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

function _getIsDisabled(expandedSections: Set<string>, id: string, allowCollapseLast: boolean) {
  return expandedSections.size === 1 && _getIsExpanded(expandedSections, id) && !allowCollapseLast;
}

export default function useAccordion(allowMultiple: boolean, allowCollapseLast: boolean) {
  const [ expandedSections, setExpandedSections ] = useState(new Set<string>());
  const headerRefs = useRef<HeaderRef[]>([]);
  const headerRefIndexMap = useRef<Map<HeaderRef, number>>(new Map());

  /**
   * Returns a boolean that lets us know if a particular accordion section is
   * expanded or collapsed.
   */
  const getIsExpanded: GetIsExpanded = useCallback((id) => {
    return _getIsExpanded(expandedSections, id);
  }, [ expandedSections ]);

  /**
   * Returns a boolean that lets us know if an aleady-expanded accordion section
   * can't be collapsed due to <code>allowCollapseLast</code>.
   */
  const getIsDisabled: GetIsDisabled = useCallback((id) => {
    return _getIsDisabled(expandedSections, id, allowCollapseLast);
  }, [ expandedSections, allowCollapseLast ]);

  /**
   * Expands or collapses an accordion section. Respects <code>allowMultiple</code>
   * and <code>allowCollapseLast</code>.
   */
  const toggleSection: ToggleSection = useCallback((id) => {
    setExpandedSections((expandedSections) => {
      const isExpanded = _getIsExpanded(expandedSections, id);
      const isDisabled = _getIsDisabled(expandedSections, id, allowCollapseLast);

      if(isDisabled)
        return expandedSections;

      if(isExpanded)
        expandedSections.delete(id);
      else {
        if(!allowMultiple)
          expandedSections.clear();

        expandedSections.add(id);
      }

      return new Set(expandedSections);
    });
  }, [
    allowMultiple,
    allowCollapseLast,
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
      allowCollapseLast,
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
    allowCollapseLast,
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
