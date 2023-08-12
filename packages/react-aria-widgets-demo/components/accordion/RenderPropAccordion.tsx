import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//HOCs
import withStyleWrapper from './withStyleWrapper';

//Types
import { AccordionProps } from 'react-aria-widgets/accordion';

function RenderPropAccordion(props: AccordionProps) {
  return (
    <Accordion { ...props }>
      <AccordionItem id="item1">
        <AccordionHeader>
          { ({ getIsExpanded }) => `Accordion Item 1: Expanded = ${getIsExpanded('item1')}` }
        </AccordionHeader>
        <AccordionPanel>
          { ({ id, headerLevel, allowMultiple, allowCollapseLast, getIsExpanded }) => (
            <ul>
              <li>id = { id }</li>
              <li>headerLevel = { headerLevel }</li>
              <li>allowMultiple = { allowMultiple.toString() }</li>
              <li>allowCollapseLast = { allowCollapseLast.toString() }</li>
              <li>getIsExpanded('item2') = { getIsExpanded('item2').toString() }</li>
            </ul>
          ) }
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item2">
        <AccordionHeader>
          { ({ getIsExpanded }) => `Accordion Item 2: Expanded = ${getIsExpanded('item2')}` }
        </AccordionHeader>
        <AccordionPanel>
          { ({ id, headerLevel, allowMultiple, allowCollapseLast, getIsExpanded }) => (
            <ul>
              <li>id = { id }</li>
              <li>headerLevel = { headerLevel }</li>
              <li>allowMultiple = { allowMultiple.toString() }</li>
              <li>allowCollapseLast = { allowCollapseLast.toString() }</li>
              <li>getIsExpanded('item1') = { getIsExpanded('item1').toString() }</li>
            </ul>
          ) }
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default withStyleWrapper(RenderPropAccordion);
