/* eslint-disable react/jsx-props-no-spreading, react/jsx-no-bind */

import { useState } from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//HOCs
import withStyleWrapper from './withStyleWrapper';

//Types
import type { AccordionProps, AccordionMembers } from 'react-aria-widgets/accordion';

type FocusFormProps = {
  id: string;
} & Pick<
  AccordionMembers,
  'focusItemId' |
  'focusPrevItem' |
  'focusNextItem' |
  'focusFirstItem' |
  'focusLastItem'
>;

const ITEMS = [ 'item1', 'item2', 'item3' ];

function FocusAccordion(props: AccordionProps) {
  return (
    <Accordion { ...props }>
      { ITEMS.map((id, index) => (
        <AccordionItem key={ id } id={ id }>
          <AccordionHeader>
            Accordion Item { index + 1 }: ID = <code>{ id }</code>
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
    <form className="mb-4" onSubmit={ (e) => { e.preventDefault(); focusItemId(inputItemId); } }>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label" htmlFor={ `${id}-focus-input` }>
            Item ID:
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                id={ `${id}-focus-input` }
                type="text"
                onChange={ (e) => setInputItemId(e.target.value) }
                className="input"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">
                Focus Item
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button className="button" type="button" onClick={ () => focusFirstItem() }>
            Focus First Item
          </button>
        </div>
        <div className="control">
          <button className="button" type="button" onClick={ () => focusPrevItem(id) }>
            Focus Previous Item
          </button>
        </div>
        <div className="control">
          <button className="button" type="button" onClick={ () => focusNextItem(id) }>
            Focus Next Item
          </button>
        </div>
        <div className="control">
          <button className="button" type="button" onClick={ () => focusLastItem() }>
            Focus Last Item
          </button>
        </div>
      </div>
    </form>
  );
}

export default withStyleWrapper(FocusAccordion);
