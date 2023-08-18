import { useState, useCallback, useRef, useMemo, useEffect } from 'react';

//Types
import type { ValidHTMLHeaderLevels } from '../../types';

type ExpandedItems = Set<string>;
type DisabledItems = Set<string>;

type AccordionHeaderButtonElement = HTMLButtonElement | HTMLElement | null;

interface AccordionItemRef {
  elem: AccordionHeaderButtonElement;
  id: string;
}

type OnToggleExpanded = (expandedItems: ExpandedItems) => void;
type OnToggleDisabled = (disabledItems: DisabledItems) => void;
type OnFocusChange = ({ elem, index, id }: { elem: AccordionHeaderButtonElement; index: number; id: string }) => void;

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

export type AccordionMembers = ReturnType<typeof useAccordion>;

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

  const getIsExpanded = useCallback((id: string) => {
    return _getIsExpanded(id, expandedItems);
  }, [ expandedItems ]);

  const getIsDisabled = useCallback((id: string) => {
    return _getIsDisabled(id, expandedItems, disabledItems, allowCollapseLast);
  }, [
    expandedItems,
    disabledItems,
    allowCollapseLast,
  ]);

  const toggleExpanded = useCallback((id: string) => {
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

  const toggleDisabled = useCallback((id: string) => {
    setDisabledItems((disabledItems) => {
      onToggleDisabledRef.current = onToggleDisabled;

      if(disabledItems.has(id))
        disabledItems.delete(id);
      else
        disabledItems.add(id);

      return new Set(disabledItems);
    });
  }, [ onToggleDisabled ]);

  const pushItemRef = useCallback((elem: AccordionHeaderButtonElement, id: string) => {
    itemRefs.current.push({ elem, id });
    idToIndexMap.current.set(id, itemRefs.current.length - 1);
  }, []);

  const focusItemIndex = useCallback((index: number) => {
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

  const focusItemId = useCallback((id: string) => {
    const index = idToIndexMap.current.get(id);

    if(index === undefined)
      return;

    focusItemIndex(index);
  }, [ focusItemIndex ]);

  const focusPrevItem = useCallback((id: string) => {
    const index = idToIndexMap.current.get(id);

    if(index === undefined)
      return;

    focusItemIndex(index === 0 ? itemRefs.current.length - 1 : index - 1);
  }, [ focusItemIndex ]);

  const focusNextItem = useCallback((id: string) => {
    const index = idToIndexMap.current.get(id);

    if(index === undefined)
      return;

    focusItemIndex(index === itemRefs.current.length - 1 ? 0 : index + 1);
  }, [ focusItemIndex ]);

  const focusFirstItem = useCallback(() => {
    focusItemIndex(0);
  }, [ focusItemIndex ]);

  const focusLastItem = useCallback(() => {
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
