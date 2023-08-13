import { useState } from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//HOCs
import withStyleWrapper from './withStyleWrapper';

//Types
import type {
  AccordionProps,
  FocusHeaderId,
  FocusPrevHeader,
  FocusNextHeader,
  FocusFirstHeader,
  FocusLastHeader,
} from 'react-aria-widgets/accordion';

interface FocusFormProps {
  id: string;
  focusHeaderId: FocusHeaderId;
  focusPrevHeader: FocusPrevHeader;
  focusNextHeader: FocusNextHeader;
  focusFirstHeader: FocusFirstHeader;
  focusLastHeader: FocusLastHeader;
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
  focusHeaderId,
  focusPrevHeader,
  focusNextHeader,
  focusFirstHeader,
  focusLastHeader,
}: FocusFormProps) {
  const [ inputItemId, setInputItemId ] = useState<string>('');

  return (
    <>
      <form onSubmit={ (e) => { e.preventDefault(); focusHeaderId(inputItemId); }}>
        <label htmlFor={ `${id}-focus-input` }>Item ID:</label> 
        <input
          id={ `${id}-focus-input` }
          type="text"
          onChange={ (e) => setInputItemId(e.target.value) }
        />
        <button type="submit">Focus Item</button>
      </form>
      <button type="button" onClick={ () => focusFirstHeader() }>
        Focus First Item
      </button>
      <button type="button" onClick={ () => focusPrevHeader(id) }>
        Focus Previous Item
      </button>
      <button type="button" onClick={ () => focusNextHeader(id) }>
        Focus Next Item
      </button>
      <button type="button" onClick={ () => focusLastHeader() }>
        Focus Last Item
      </button>
    </>
  );
}

export default withStyleWrapper(FocusAccordion);
