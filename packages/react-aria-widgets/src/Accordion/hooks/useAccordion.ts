import { useState, useCallback, useRef, useMemo, useEffect } from 'react';

//Types
import type { ValidHTMLHeaderLevels } from '../../types';

export type ExpandedItems = Set<string>;
export type DisabledItems = Set<string>;

export type AccordionHeaderButtonElement = HTMLButtonElement | HTMLElement | null;

export interface AccordionItemRef {
  elem: AccordionHeaderButtonElement;
  id: string;
}

export type GetIsExpanded = (id: string) => boolean;
export type GetIsDisabled = (id: string) => boolean;
export type ToggleExpanded = (id: string) => void;
export type ToggleDisabled = (id: string) => void;
export type PushItemRef = (elem: AccordionHeaderButtonElement, id: string) => void;
export type FocusItemIndex = (index: number) => void;
export type FocusItemId = (id: string) => void;
export type FocusPrevItem = (id: string) => void;
export type FocusNextItem = (id: string) => void;
export type FocusFirstItem = () => void;
export type FocusLastItem = () => void;
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
  const itemRefs = useRef<AccordionItemRef[]>([]);
  const idToIndexMap = useRef<Map<string, number>>(new Map());
  const onToggleExpandedRef = useRef<OnToggleExpanded | null | undefined>(null);
  const onToggleDisabledRef = useRef<OnToggleDisabled | null | undefined>(null);

  const getIsExpanded: GetIsExpanded = useCallback((id) => {
    return _getIsExpanded(id, expandedItems);
  }, [ expandedItems ]);

  const getIsDisabled: GetIsDisabled = useCallback((id) => {
    return _getIsDisabled(id, expandedItems, disabledItems, allowCollapseLast);
  }, [
    expandedItems,
    disabledItems,
    allowCollapseLast,
  ]);

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

  const pushItemRef: PushItemRef = useCallback((elem, id) => {
    itemRefs.current.push({ elem, id });
    idToIndexMap.current.set(id, itemRefs.current.length - 1);
  }, []);

  const focusItemIndex: FocusItemIndex = useCallback((index) => {
    /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition --
     * TypeScript applications will complain if you pass in undefined or null,
     * but this code may be running in a JavaScript application.
     **/
    if(index === undefined || index === null)
      return;

    const { elem, id } = itemRefs.current[index];

    if(!elem)
      return;

    elem.focus();

    if(typeof onFocusChange === 'function')
      onFocusChange({ elem, index, id });
  }, [ onFocusChange ]);

  const focusItemId: FocusItemId = useCallback((id) => {
    const index = idToIndexMap.current.get(id);

    if(index === undefined)
      return;

    focusItemIndex(index);
  }, [ focusItemIndex ]);

  const focusPrevItem: FocusPrevItem = useCallback((id) => {
    const index = idToIndexMap.current.get(id);

    if(index === undefined)
      return;

    focusItemIndex(index === 0 ? itemRefs.current.length - 1 : index - 1);
  }, [ focusItemIndex ]);

  const focusNextItem: FocusNextItem = useCallback((id) => {
    const index = idToIndexMap.current.get(id);

    if(index === undefined)
      return;

    focusItemIndex(index === itemRefs.current.length - 1 ? 0 : index + 1);
  }, [ focusItemIndex ]);

  const focusFirstItem: FocusFirstItem = useCallback(() => {
    focusItemIndex(0);
  }, [ focusItemIndex ]);

  const focusLastItem: FocusLastItem = useCallback(() => {
    focusItemIndex(itemRefs.current.length - 1);
  }, [ focusItemIndex ]);

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
      pushItemRef,
      focusItemIndex,
      focusItemId,
      focusPrevItem,
      focusNextItem,
      focusFirstItem,
      focusLastItem,
    };
  }, [
    allowMultiple,
    allowCollapseLast,
    headerLevel,
    getIsExpanded,
    getIsDisabled,
    toggleExpanded,
    toggleDisabled,
    pushItemRef,
    focusItemIndex,
    focusItemId,
    focusPrevItem,
    focusNextItem,
    focusFirstItem,
    focusLastItem,
  ]);
}
