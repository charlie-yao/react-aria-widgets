import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//Styles
import styles from './StyledAccordion.module.scss';

export const STYLED_ACCORDION_EXAMPLE =
`//StyledAccordion.tsx
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

export default function StyledAccordion() {
  return (
    <Accordion headerLevel={ 3 }>
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
        <AccordionPanel className="styled-accordion-panel">
          This accordion item is styled by passing in a string <code>className</code> prop.
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
}`;

export const STYLED_ACCORDION_CLASSES_EXAMPLE =
`//styles.scss
.react-aria-widgets-accordion-panel {
  &[data-expanded=false] {
    display: none;
  }
}

.styled-accordion-panel {
  &[data-expanded=false] {
    display: none;
  }
}`;

export default function StyledAccordion() {
  return (
    <div className={ styles.StyledAccordion }>
      <Accordion headerLevel={ 3 }>
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
          <AccordionPanel className="styled-accordion-panel">
            This accordion item is styled by passing in a string <code>className</code> prop and CSS
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
    </div>
  );
}
