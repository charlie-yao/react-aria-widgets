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
              <li><code>getIsExpanded(id)</code> = <code>{ getIsExpanded(id).toString() }</code></li>
              <li><code>getIsDisabled(id)</code> = <code>{ getIsDisabled(id).toString() }</code></li>
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
              <li><code>getIsExpanded(id)</code> = <code>{ getIsExpanded(id).toString() }</code></li>
              <li><code>getIsDisabled(id)</code> = <code>{ getIsDisabled(id).toString() }</code></li>
            </ul>
          ) }
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default withStyleWrapper(InitializeStateAccordion);
