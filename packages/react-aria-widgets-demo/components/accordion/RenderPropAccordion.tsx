import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//HOCs
import withStyleWrapper from './withStyleWrapper';

//Types
import { AccordionProps } from 'react-aria-widgets/accordion';

const ITEMS = [ 'item1', 'item2', 'item3' ];

function RenderPropAccordion(props: AccordionProps) {
  return (
    <Accordion { ...props }>
      { ITEMS.map((id, index) => (
        <AccordionItem key={ id } id={ id }>
          <AccordionHeader>
            { ({ id, getIsExpanded }) => (
              <>
                Accordion Item { index + 1 }: Expanded = <code>{ getIsExpanded(id).toString() }</code>
              </>
            ) }
          </AccordionHeader>
          <AccordionPanel>
            { ({ id, headerLevel, allowMultiple, allowCollapseLast }) => (
              <ul>
                <li><code>id</code> = <code>{ id }</code></li>
                <li><code>headerLevel</code> = <code>{ headerLevel }</code></li>
                <li><code>allowMultiple</code> = <code>{ allowMultiple.toString() }</code></li>
                <li><code>allowCollapseLast</code> = <code>{ allowCollapseLast.toString() }</code></li>
              </ul>
            ) }
          </AccordionPanel>
        </AccordionItem>
      )) }
    </Accordion>
  );
}

export default withStyleWrapper(RenderPropAccordion);
