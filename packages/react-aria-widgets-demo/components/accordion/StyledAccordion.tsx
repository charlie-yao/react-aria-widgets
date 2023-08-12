import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//HOCs
import withStyleWrapper from './withStyleWrapper';

//Types
import { AccordionProps } from 'react-aria-widgets/accordion';

function StyledAccordion(props: AccordionProps) {
  return (
    <Accordion { ...props }>
      <AccordionItem id="item1">
        <AccordionHeader>
          Styled Accordion Item 1
        </AccordionHeader>
        <AccordionPanel>
          This accordion item is styled by CSS that targets the default classes provided by React ARIA
          Widgets. Since React ARIA Widgets also exposes the accordion's state via HTML data attributes,
          we can use selectors such as <code>[data-expanded]</code> or <code>[data-disabled]</code>.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item2">
        <AccordionHeader>
          Styled Accordion Item 2
        </AccordionHeader>
        <AccordionPanel className="custom-accordion-panel">
          This accordion item is styled by passing in a string <code>className</code> prop and CSS
          targeting the state exposed by React ARIA Widgets.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item3">
        <AccordionHeader>
          Styled Accordion Item 3
        </AccordionHeader>
        <AccordionPanel style={ ({ isExpanded }) => isExpanded ? {} : { display: 'none'} }>
          This accordion item is styled by passing in a function <code>style</code> prop that behaves
          similarly to the commonly-used render function pattern.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default withStyleWrapper(StyledAccordion);
