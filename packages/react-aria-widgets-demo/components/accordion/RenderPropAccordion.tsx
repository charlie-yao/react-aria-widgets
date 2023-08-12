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
          { ({ id, getIsExpanded }) => (
            <>
              Accordion Item 1: Expanded = <code>{ getIsExpanded(id).toString() }</code>
            </>
          ) }
        </AccordionHeader>
        <AccordionPanel>
          { ({ id, headerLevel, allowMultiple, allowCollapseLast, getIsExpanded }) => (
            <ul>
              <li><code>id</code> = <code>{ id }</code></li>
              <li><code>headerLevel</code> = <code>{ headerLevel }</code></li>
              <li><code>allowMultiple</code> = <code>{ allowMultiple.toString() }</code></li>
              <li><code>allowCollapseLast</code> = <code>{ allowCollapseLast.toString() }</code></li>
              <li><code>getIsExpanded('item2')</code> = <code>{ getIsExpanded('item2').toString() }</code></li>
            </ul>
          ) }
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item2">
        <AccordionHeader>
          { ({ id, getIsExpanded }) => (
            <>
              Accordion Item 2: Expanded = <code>{ getIsExpanded(id).toString() }</code>
            </>
          ) }
        </AccordionHeader>
        <AccordionPanel>
          { ({ id, headerLevel, allowMultiple, allowCollapseLast, getIsExpanded }) => (
            <ul>
              <li><code>id</code> = <code>{ id }</code></li>
              <li><code>headerLevel</code> = <code>{ headerLevel }</code></li>
              <li><code>allowMultiple</code> = <code>{ allowMultiple.toString() }</code></li>
              <li><code>allowCollapseLast</code> = <code>{ allowCollapseLast.toString() }</code></li>
              <li><code>getIsExpanded('item1')</code> = <code>{ getIsExpanded('item1').toString() }</code></li>
            </ul>
          ) }
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default withStyleWrapper(RenderPropAccordion);
