import { useState } from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//HOCs
import withStyleWrapper from './withStyleWrapper';

//Types
import type {
  AccordionProps,
  FocusItemId,
  FocusPrevItem,
  FocusNextItem,
  FocusFirstItem,
  FocusLastItem,
} from 'react-aria-widgets/accordion';

interface FocusFormProps {
  id: string;
  focusItemId: FocusItemId;
  focusPrevItem: FocusPrevItem;
  focusNextItem: FocusNextItem;
  focusFirstItem: FocusFirstItem;
  focusLastItem: FocusLastItem;
}

const ITEMS = [ 'item1', 'item2', 'item3' ];

function FocusAccordion(props: AccordionProps) {
  return (
    <Accordion { ...props }>
      { ITEMS.map((id, index) => (
        <AccordionItem key={ id } id={ id }>
          <AccordionHeader>
            Accordion Item { index + 1 }: ID = { id }
          </AccordionHeader>
          <AccordionPanel>
            { (args) => <FocusForm { ...args } /> }
          </AccordionPanel>
        </AccordionItem>
      )) }
    </Accordion>
  );
}

function FocusForm({
  id,
  focusItemId,
  focusPrevItem,
  focusNextItem,
  focusFirstItem,
  focusLastItem,
}: FocusFormProps) {
  const [ inputItemId, setInputItemId ] = useState<string>('');

  return (
    <>
      <form onSubmit={ (e) => { e.preventDefault(); focusItemId(inputItemId); } }>
        <label htmlFor={ `${id}-focus-input` }>Item ID:</label>
        <input
          id={ `${id}-focus-input` }
          type="text"
          onChange={ (e) => setInputItemId(e.target.value) }
        />
        <button type="submit">Focus Item</button>
      </form>
      <button type="button" onClick={ () => focusFirstItem() }>
        Focus First Item
      </button>
      <button type="button" onClick={ () => focusPrevItem(id) }>
        Focus Previous Item
      </button>
      <button type="button" onClick={ () => focusNextItem(id) }>
        Focus Next Item
      </button>
      <button type="button" onClick={ () => focusLastItem() }>
        Focus Last Item
      </button>
    </>
  );
}

export default withStyleWrapper(FocusAccordion);
