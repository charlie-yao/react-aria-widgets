/* eslint-disable react/jsx-props-no-spreading, react/jsx-no-bind, no-console */

import { useAccordion, ControlledAccordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//HOCs
import withStyleWrapper from './withStyleWrapper';

//Types
import type { UseAccordion } from 'react-aria-widgets/accordion';
import type { ReactNode } from 'react';

const ITEMS = [ 'item1', 'item2', 'item3' ];

function RemoteControlAccordion(props: UseAccordion) {
  const contextValue = useAccordion(props);
  const { toggleExpanded, toggleDisabled, focusItemId, getIsDisabled } = contextValue;
  const toggleExpandButtons: ReactNode[] = [];
  const toggleDisableButtons: ReactNode[] = [];
  const focusButtons: ReactNode[] = [];
  const accordionItems: ReactNode[] = [];

  ITEMS.forEach((id, index) => {
    toggleExpandButtons.push(
      <div className="control">
        <button
          key={ id }
          type="button"
          value={ id }
          onClick={ (e) => toggleExpanded(e.currentTarget.value) }
          className="button is-primary"
        >
          Expand/Collapse { id }
        </button>
      </div>
    );

    toggleDisableButtons.push(
      <div className="control">
        <button
          key={ id }
          type="button"
          value={ id }
          onClick={ (e) => toggleDisabled(e.currentTarget.value) }
          className="button is-primary"
        >
          Enable/Disable { id }
        </button>
      </div>
    );

    focusButtons.push(
      <div className="control">
        <button
          key={ id }
          type="button"
          value={ id }
          onClick={ (e) => focusItemId(e.currentTarget.value) }
          className="button is-primary"
        >
          Focus { id }
        </button>
      </div>
    );
    
    accordionItems.push(
      <AccordionItem id={ id } key={ id }>
        <AccordionHeader>
          Accordion Item { index + 1 }: Disabled = <code>{ getIsDisabled(id).toString() }</code>
        </AccordionHeader>
        <AccordionPanel>
          Hello world! 
        </AccordionPanel>
      </AccordionItem>
    );
  });

  return (
    <>
      <form onSubmit={ e => e.preventDefault() } style={{ paddingBottom: '1rem' }}>
        <fieldset className="field is-grouped">
          <legend>Expand/Collapse Items</legend>
          { toggleExpandButtons }
        </fieldset>
        <fieldset className="field is-grouped">
        <legend>Enable/Disable Items</legend>
          { toggleDisableButtons }
        </fieldset>
        <fieldset className="field is-grouped">
          <legend>Focus Items</legend>
          { focusButtons }
        </fieldset>
      </form>
      <ControlledAccordion contextValue={ contextValue }>
        { accordionItems }
      </ControlledAccordion>
    </>
  );
}

export default withStyleWrapper(RemoteControlAccordion);
