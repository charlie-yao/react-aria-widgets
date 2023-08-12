import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//HOCs
import withStyleWrapper from './withStyleWrapper';

//Types
import { AccordionProps } from 'react-aria-widgets/accordion';

function InitializeStateAccordion(props: AccordionProps) {
  return (
    <Accordion
      initialExpanded={ [ 'item1', 'item2' ] }
      initialDisabled={ [ 'item1', 'item2' ] }
      { ...props }
    >
      <AccordionItem id="item1">
        <AccordionHeader>
          Accordion Item 1
        </AccordionHeader>
        <AccordionPanel>
          { ({ id, getIsExpanded, getIsDisabled }) => (
            <ul>
              <li>getIsExpanded(id) = { getIsExpanded(id).toString() }</li>
              <li>getIsDisabled(id) = { getIsDisabled(id).toString() }</li>
            </ul>
          ) }
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item2">
        <AccordionHeader>
          Accordion Item 2
        </AccordionHeader>
        <AccordionPanel>
          { ({ id, getIsExpanded, getIsDisabled }) => (
            <ul>
              <li>getIsExpanded(id) = { getIsExpanded(id).toString() }</li>
              <li>getIsDisabled(id) = { getIsDisabled(id).toString() }</li>
            </ul>
          ) }
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default withStyleWrapper(InitializeStateAccordion);
