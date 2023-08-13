import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//HOCs
import withStyleWrapper from './withStyleWrapper';

//Types
import { AccordionProps } from 'react-aria-widgets/accordion';

const ITEMS = [ 'item1', 'item2', 'item3' ];

function DisableItemAccordion(props: AccordionProps) {
  return (
    <Accordion { ...props }>
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

export default withStyleWrapper(DisableItemAccordion);