import { useState, useCallback, useRef, useMemo, useEffect } from 'react';

//Types
import type { ValidHTMLHeaderLevels } from 'src/utils/types';

export type ExpandedItems = Set<string>;
export type DisabledItems = Set<string>;

export type AccordionHeaderButtonElement = HTMLButtonElement | HTMLElement | null;

export interface AccordionHeaderRef {
  elem: AccordionHeaderButtonElement;
  id: string;
}

export type GetIsExpanded = (id: string) => boolean;
export type GetIsDisabled = (id: string) => boolean;
export type ToggleExpanded = (id: string) => void;
export type ToggleDisabled = (id: string) => void;
export type PushHeaderRef = (elem: AccordionHeaderButtonElement, id: string) => void;
export type FocusHeaderIndex = (index: number) => void;
export type FocusHeaderId = (id: string) => void;
export type FocusPrevHeader = (id: string) => void;
export type FocusNextHeader = (id: string) => void;
export type FocusFirstHeader = () => void;
export type FocusLastHeader = () => void;
export type OnToggleExpanded = (expandedItems: ExpandedItems) => void;
export type OnToggleDisabled = (disabledItems: DisabledItems) => void;
export type OnFocusChange = ({ elem, index, id }: { elem: AccordionHeaderButtonElement; index: number; id: string }) => void;

export interface UseAccordion {
  allowMultiple?: boolean;
  allowCollapseLast?: boolean;
  headerLevel: ValidHTMLHeaderLevels;
  initialExpanded?: string[];
  initialDisabled?: string[];
  onToggleExpanded?: OnToggleExpanded | undefined;
  onToggleDisabled?: OnToggleDisabled | undefined;
  onFocusChange?: OnFocusChange | undefined;
}

function _getIsExpanded(id: string, expandedItems: Set<string>) {
  return expandedItems.has(id);
}

function _getIsDisabled(id: string, expandedItems: Set<string>, disabledItems: Set<string>, allowCollapseLast: boolean) {
  const preventCollapseLast = expandedItems.size === 1
    && _getIsExpanded(id, expandedItems)
    && !allowCollapseLast;

  return disabledItems.has(id) || preventCollapseLast;
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
  }, [ allowMultiple, initialExpanded ]);

  const _initialDisabled = useMemo(() => new Set<string>(initialDisabled), [ initialDisabled ]);

  const [ expandedItems, setExpandedItems ] = useState<ExpandedItems>(_initialExpanded);
  const [ disabledItems, setDisabledItems ] = useState<DisabledItems>(_initialDisabled);
  const headerRefs = useRef<AccordionHeaderRef[]>([]);
  const idToIndexMap = useRef<Map<string, number>>(new Map());
  const onToggleExpandedRef = useRef<OnToggleExpanded | null | undefined>(null);
  const onToggleDisabledRef = useRef<OnToggleDisabled | null | undefined>(null);

  /**
   * Returns a boolean that lets us know if a particular accordion item is
   * expanded or collapsed.
   */
  const getIsExpanded: GetIsExpanded = useCallback((id) => {
    return _getIsExpanded(id, expandedItems);
  }, [ expandedItems ]);

  /**
   * Returns a boolean that lets us know if an aleady-expanded accordion item
   * can't be collapsed due to <code>allowCollapseLast</code>.
   */
  const getIsDisabled: GetIsDisabled = useCallback((id) => {
    return _getIsDisabled(id, expandedItems, disabledItems, allowCollapseLast);
  }, [
    expandedItems,
    disabledItems,
    allowCollapseLast,
  ]);

  /**
   * Expands or collapses an accordion item. Respects <code>allowMultiple</code>
   * and <code>allowCollapseLast</code>.
   */
  const toggleExpanded: ToggleExpanded = useCallback((id) => {
    setExpandedItems((expandedItems) => {
      const isExpanded = _getIsExpanded(id, expandedItems);
      const isDisabled = _getIsDisabled(id, expandedItems, disabledItems, allowCollapseLast);

      if(isDisabled)
        return expandedItems;

      onToggleExpandedRef.current = onToggleExpanded;

      if(isExpanded)
        expandedItems.delete(id);
      else {
        if(!allowMultiple)
          expandedItems.clear();

        expandedItems.add(id);
      }

      return new Set(expandedItems);
    });
  }, [
    allowMultiple,
    allowCollapseLast,
    onToggleExpanded,
    disabledItems,
  ]);

  /**
   * Allows/prevents an accordion header button from being expanded/collapsed.
   */
  const toggleDisabled: ToggleDisabled = useCallback((id) => {
    setDisabledItems((disabledItems) => {
      onToggleDisabledRef.current = onToggleDisabled;

      if(disabledItems.has(id))
        disabledItems.delete(id);
      else
        disabledItems.add(id);

      return new Set(disabledItems);
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
      onToggleExpandedRef.current(expandedItems);

    onToggleExpandedRef.current = null;
  }, [ expandedItems ]);

  useEffect(() => {
    if(typeof onToggleDisabledRef.current === 'function')
      onToggleDisabledRef.current(disabledItems);

    onToggleDisabledRef.current = null;
  }, [ disabledItems ]);

  return useMemo(() => {
    return {
      allowMultiple,
      allowCollapseLast,
      headerLevel,
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
