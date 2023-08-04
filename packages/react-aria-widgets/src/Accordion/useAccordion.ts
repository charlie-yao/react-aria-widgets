import { useState, useCallback, useRef, useMemo, useEffect } from 'react';

//Types
import type {
  UseAccordion,
  ExpandedSections,
  DisabledSections,
  HeaderRef,
  GetIsExpanded,
  GetIsDisabled,
  ToggleVisible,
  ToggleUsable,
  PushHeaderRef,
  FocusHeaderIndex,
  FocusHeaderId,
  FocusPrevHeader,
  FocusNextHeader,
  FocusFirstHeader,
  FocusLastHeader,
  OnToggleVisible,
} from 'src/Accordion/types';

function _getIsExpanded(id: string, expandedSections: Set<string>) {
  return expandedSections.has(id);
}

function _getIsDisabled(id: string, expandedSections: Set<string>, disabledSections: Set<string>, allowCollapseLast: boolean) {
  const preventCollapseLast = expandedSections.size === 1
    && _getIsExpanded(id, expandedSections)
    && !allowCollapseLast;

  return disabledSections.has(id) || preventCollapseLast;
}

export default function useAccordion({
  allowMultiple = true,
  allowCollapseLast = true,
  headerLevel,
  onToggleVisible,
  onFocusChange,
}: UseAccordion) {
  const [ expandedSections, setExpandedSections ] = useState<ExpandedSections>(new Set<string>());
  const [ disabledSections, setDisabledSections ] = useState<DisabledSections>(new Set<string>());
  const headerRefs = useRef<HeaderRef[]>([]);
  const idToIndexMap = useRef<Map<string, number>>(new Map());
  const onToggleVisibleRef = useRef<OnToggleVisible | null | undefined>(null);

  /**
   * Returns a boolean that lets us know if a particular accordion section is
   * expanded or collapsed.
   */
  const getIsExpanded: GetIsExpanded = useCallback((id) => {
    return _getIsExpanded(id, expandedSections);
  }, [ expandedSections ]);

  /**
   * Returns a boolean that lets us know if an aleady-expanded accordion section
   * can't be collapsed due to <code>allowCollapseLast</code>.
   */
  const getIsDisabled: GetIsDisabled = useCallback((id) => {
    return _getIsDisabled(id, expandedSections, disabledSections, allowCollapseLast);
  }, [
    expandedSections,
    disabledSections,
    allowCollapseLast,
  ]);

  /**
   * Expands or collapses an accordion section. Respects <code>allowMultiple</code>
   * and <code>allowCollapseLast</code>.
   */
  const toggleVisible: ToggleVisible = useCallback((id) => {
    setExpandedSections((expandedSections) => {
      const isExpanded = _getIsExpanded(id, expandedSections);
      const isDisabled = _getIsDisabled(id, expandedSections, disabledSections, allowCollapseLast);

      if(isDisabled)
        return expandedSections;

      onToggleVisibleRef.current = onToggleVisible;

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
    onToggleVisible,
    disabledSections,
  ]);

  /**
   * Allows/prevents an accordion header button from being expanded/collapsed.
   */
  const toggleUsable: ToggleUsable = useCallback((id) => {
    setDisabledSections((disabledSections) => {
      if(disabledSections.has(id))
        disabledSections.delete(id);
      else
        disabledSections.add(id);

      return new Set(disabledSections);
    });
  }, []);

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
    if(typeof onToggleVisibleRef.current === 'function')
      onToggleVisibleRef.current(expandedSections);

    onToggleVisibleRef.current = null;
  }, [ expandedSections ]);

  return useMemo(() => {
    return {
      allowMultiple,
      allowCollapseLast,
      headerLevel,
      getIsExpanded,
      getIsDisabled,
      toggleVisible,
      toggleUsable,
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
    toggleVisible,
    toggleUsable,
    pushHeaderRef,
    focusHeaderIndex,
    focusHeaderId,
    focusPrevHeader,
    focusNextHeader,
    focusFirstHeader,
    focusLastHeader,
  ]);
}
