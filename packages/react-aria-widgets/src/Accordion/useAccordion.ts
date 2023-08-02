import { useState, useCallback, useRef, useMemo, useEffect } from 'react';

//Types
import type {
  UseAccordion,
  ExpandedSections,
  HeaderRef,
  GetIsExpanded,
  GetIsDisabled,
  ToggleSection,
  PushHeaderRef,
  FocusHeaderIndex,
  FocusHeaderId,
  FocusPrevHeader,
  FocusNextHeader,
  FocusFirstHeader,
  FocusLastHeader,
  OnStateChange,
} from 'src/Accordion/types';

function _getIsExpanded(expandedSections: Set<string>, id: string) {
  return expandedSections.has(id);
}

function _getIsDisabled(expandedSections: Set<string>, id: string, allowCollapseLast: boolean) {
  return expandedSections.size === 1 && _getIsExpanded(expandedSections, id) && !allowCollapseLast;
}

export default function useAccordion({
  allowMultiple,
  allowCollapseLast,
  headerLevel,
  onStateChange,
  onFocusChange,
}: UseAccordion) {
  const [ expandedSections, setExpandedSections ] = useState<ExpandedSections>(new Set<string>());
  const headerRefs = useRef<HeaderRef[]>([]);
  const idToIndexMap = useRef<Map<string, number>>(new Map());
  const onStateChangeRef = useRef<OnStateChange | null | undefined>(null);

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
    onStateChangeRef.current = onStateChange;

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
    onStateChange,
  ]);

  /**
   * Ref callback that tracks the accordion header buttons and their IDs.
   */
  const pushHeaderRef: PushHeaderRef = useCallback((elem, id) => {
    headerRefs.current.push({ elem, id });
    idToIndexMap.current.set(id, headerRefs.current.length - 1);
  }, []);

  /**
   * Focuses an arbitrary accordion header button based on its index.
   */
  const focusHeaderIndex: FocusHeaderIndex = useCallback((index) => {
    const { elem, id } = headerRefs.current[index];

    if(!elem)
      return;

    elem.focus();

    if(typeof onFocusChange === 'function')
      onFocusChange({ elem, index, id });
  }, [ onFocusChange ]);

  /**
   * Focuses an arbitrary accordion header button based on its ID.
   */
  const focusHeaderId: FocusHeaderId = useCallback((id) => {
    const index = idToIndexMap.current.get(id);

    if(index === undefined)
      return;

    focusHeaderIndex(index);
  }, [ focusHeaderIndex ]);

  /**
   * Focuses the accordion header button located behind <code>id</code>.
   * Will "wrap" around the accordion if the boundary is reached.
   */
  const focusPrevHeader: FocusPrevHeader = useCallback((id) => {
    const index = idToIndexMap.current.get(id);

    if(index === undefined)
      return;

    focusHeaderIndex(index === 0 ? headerRefs.current.length - 1 : index - 1);
  }, [ focusHeaderIndex ]);

  /**
   * Focuses the accordion header button located in front of <code>id<code>.
   * Will "wrap" around the accordion if the boundary is reached.
   */
  const focusNextHeader: FocusNextHeader = useCallback((id) => {
    const index = idToIndexMap.current.get(id);

    if(index === undefined)
      return;

    focusHeaderIndex(index === headerRefs.current.length - 1 ? 0 : index + 1);
  }, [ focusHeaderIndex ]);

  /**
   * Sets focus on the first accordion header button.
   */
  const focusFirstHeader: FocusFirstHeader = useCallback(() => {
    focusHeaderIndex(0);
  }, [ focusHeaderIndex ]);

  /**
   * Sets focus on the last accordion header button.
   */
  const focusLastHeader: FocusLastHeader = useCallback(() => {
    focusHeaderIndex(headerRefs.current.length - 1);
  }, [ focusHeaderIndex ]);

  useEffect(() => {
    if(typeof onStateChangeRef.current === 'function')
      onStateChangeRef.current(expandedSections);

    onStateChangeRef.current = null;
  }, [ expandedSections ]);

  return useMemo(() => {
    return {
      allowMultiple,
      allowCollapseLast,
      headerLevel,
      getIsExpanded,
      getIsDisabled,
      toggleSection,
      pushHeaderRef,
      focusHeaderIndex,
      focusHeaderId,
      focusPrevHeader,
      focusNextHeader,
      focusFirstHeader,
      focusLastHeader,
    };
  }, [
    allowMultiple,
    allowCollapseLast,
    headerLevel,
    getIsExpanded,
    getIsDisabled,
    toggleSection,
    pushHeaderRef,
    focusHeaderIndex,
    focusHeaderId,
    focusPrevHeader,
    focusNextHeader,
    focusFirstHeader,
    focusLastHeader,
  ]);
}
