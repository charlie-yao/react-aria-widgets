import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//HOCs
import withStyleWrapper from './withStyleWrapper';

//Types
import type { AccordionProps } from 'react-aria-widgets/accordion';

const ITEMS = [ 'item1', 'item2', 'item3' ];

function CallbackAccordion(props: AccordionProps) {
  return (
    <Accordion
      { ...props }
      onToggleExpanded={ expandedItems => console.log(expandedItems) }
      onToggleDisabled={ disabledItems => console.log(disabledItems) }
      onFocusChange={ ({ elem, index, id }) => console.log(elem, index, id) }
    >
      { ITEMS.map((id, index) => (
        <AccordionItem key={ id } id={ id }>
          <AccordionHeader>
            { ({ id, getIsDisabled }) => (
              <>
                Accordion Item { index + 1 }: Disabled = <code>{ getIsDisabled(id).toString() }</code>
              </>
            ) }
          </AccordionHeader>
          <AccordionPanel>
            { ({ id, toggleDisabled, getIsDisabled }) => (
              <button type="button" onClick={ () => toggleDisabled(id) }>
                { getIsDisabled(id) ? 'Enable' : 'Disable' } <code>{ id }</code>
              </button>
            ) }
          </AccordionPanel>
        </AccordionItem>
      )) }
    </Accordion>
  );
}

export default withStyleWrapper(CallbackAccordion);
