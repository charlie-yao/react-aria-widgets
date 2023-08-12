import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//HOCs
import withStyleWrapper from './withStyleWrapper';

//Types
import { AccordionProps } from 'react-aria-widgets/accordion';

function DisableItemAccordion(props: AccordionProps) {
  return (
    <Accordion { ...props }>
      <AccordionItem id="item1">
        <AccordionHeader>
          { ({ id, getIsDisabled }) => (
            <>
              Accordion Item 1: Disabled = <code>{ getIsDisabled(id).toString() }</code>
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
      <AccordionItem id="item2">
        <AccordionHeader>
          { ({ id, getIsDisabled }) => (
            <>
              Accordion Item 2: Disabled = <code>{ getIsDisabled(id).toString() }</code>
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
    </Accordion>
  );
}

export default withStyleWrapper(DisableItemAccordion);
