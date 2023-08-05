import { useState, useCallback, useRef, useMemo, useEffect } from 'react';

//Types
import type {
  UseAccordion,
  ExpandedSections,
  DisabledSections,
  HeaderRef,
  GetIsExpanded,
  GetIsDisabled,
  ToggleExpanded,
  ToggleDisabled,
  PushHeaderRef,
  FocusHeaderIndex,
  FocusHeaderId,
  FocusPrevHeader,
  FocusNextHeader,
  FocusFirstHeader,
  FocusLastHeader,
  OnToggleExpanded,
  OnToggleDisabled,
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
  initialExpanded = [],
  initialDisabled = [],
  onToggleExpanded,
  onToggleDisabled,
  onFocusChange,
}: UseAccordion) {
  const _initialExpanded = useMemo(() => {
    return new Set<string>(allowMultiple ? initialExpanded : initialExpanded.slice(0, 1));
  }, [ initialExpanded ]);

  const _initialDisabled = useMemo(() => {
    return new Set<string>(initialDisabled);
  }, [ initialDisabled ]);

  const [ expandedSections, setExpandedSections ] = useState<ExpandedSections>(_initialExpanded);
  const [ disabledSections, setDisabledSections ] = useState<DisabledSections>(_initialDisabled);
  const headerRefs = useRef<HeaderRef[]>([]);
  const idToIndexMap = useRef<Map<string, number>>(new Map());
  const onToggleExpandedRef = useRef<OnToggleExpanded | null | undefined>(null);
  const onToggleDisabledRef = useRef<OnToggleDisabled | null | undefined>(null);

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
  const toggleExpanded: ToggleExpanded = useCallback((id) => {
    setExpandedSections((expandedSections) => {
      const isExpanded = _getIsExpanded(id, expandedSections);
      const isDisabled = _getIsDisabled(id, expandedSections, disabledSections, allowCollapseLast);

      if(isDisabled)
        return expandedSections;

      onToggleExpandedRef.current = onToggleExpanded;

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
    onToggleExpanded,
    disabledSections,
  ]);

  /**
   * Allows/prevents an accordion header button from being expanded/collapsed.
   */
  const toggleDisabled: ToggleDisabled = useCallback((id) => {
    setDisabledSections((disabledSections) => {
      onToggleDisabledRef.current = onToggleDisabled;

      if(disabledSections.has(id))
        disabledSections.delete(id);
      else
        disabledSections.add(id);

      return new Set(disabledSections);
    });
  }, [ onToggleDisabled ]);

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
    if(typeof onToggleExpandedRef.current === 'function')
      onToggleExpandedRef.current(expandedSections);

    onToggleExpandedRef.current = null;
  }, [ expandedSections ]);

  useEffect(() => {
    if(typeof onToggleDisabledRef.current === 'function')
      onToggleDisabledRef.current(disabledSections);

    onToggleDisabledRef.current = null;
  }, [ disabledSections ]);

  return useMemo(() => {
    return {
      allowMultiple,
      allowCollapseLast,
      headerLevel,
      initialExpanded: _initialExpanded,
      initialDisabled: _initialDisabled,
      getIsExpanded,
      getIsDisabled,
      toggleExpanded,
      toggleDisabled,
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
    _initialExpanded,
    _initialDisabled,
    getIsExpanded,
    getIsDisabled,
    toggleExpanded,
    toggleDisabled,
    pushHeaderRef,
    focusHeaderIndex,
    focusHeaderId,
    focusPrevHeader,
    focusNextHeader,
    focusFirstHeader,
    focusLastHeader,
  ]);
}
