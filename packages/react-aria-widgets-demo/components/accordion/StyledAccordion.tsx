/* eslint-disable react/jsx-props-no-spreading, react/jsx-no-bind */

import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//HOCs
import withStyleWrapper from './withStyleWrapper';

//Types
import type { AccordionProps } from 'react-aria-widgets/accordion';

function StyledAccordion(props: AccordionProps) {
  return (
    <Accordion { ...props }>
      <AccordionItem id="item1">
        <AccordionHeader>
          Accordion Item 1
        </AccordionHeader>
        <AccordionPanel>
          This accordion item is styled by CSS that targets the default classes provided by React ARIA
          Widgets. Since React ARIA Widgets also exposes the accordion&apos;s state via HTML data attributes,
          we can target selectors such as <code>[data-expanded]</code> or <code>[data-disabled]</code>.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item2">
        <AccordionHeader
          headerProps={{ className: 'custom-accordion-header' }}
          buttonProps={{ className: 'custom-accordion-button' }}
        >
          Accordion Item 2
        </AccordionHeader>
        <AccordionPanel className="custom-accordion-panel">
          This accordion item is styled by passing in strings for <code>className</code> and
          CSS that targets the supplied classes and the state exposed by React ARIA Widgets.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item3">
        <AccordionHeader
          headerProps={{ style: { color : 'hsl(217, 71%, 45%)'} }}
          buttonProps={{ style: { color: 'inherit' } }}
        >
          Accordion Item 3
        </AccordionHeader>
        <AccordionPanel style={{ color: 'hsl(217, 71%, 45%)' }}>
          This accordion item is styled by passing in objects for <code>style</code>.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item4">
        <AccordionHeader
          headerProps={{ className: ({ isExpanded }) => `another-custom-header ${isExpanded ? 'expanded' : 'collapsed'}` }}
          buttonProps={{ className: ({ isExpanded }) => `another-custom-button ${isExpanded ? 'expanded' : 'collapsed'}` }}
        >
          Accordion Item 4
        </AccordionHeader>
        <AccordionPanel className={ ({ isExpanded }) => `another-custom-panel ${isExpanded ? 'expanded' : 'collapsed'}` }>
          This accordion item is styled by passing in functions for <code>className</code>. These functions
          have access to the accordion's state, allowing you to dynamically apply classes.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item5">
        <AccordionHeader
          headerProps={{ style: ({ isExpanded }) => isExpanded ? { color: 'hsl(0, 0%, 100%)' } : {} }}
          buttonProps={{ style: ({ isExpanded }) => isExpanded ? { color: 'inherit', backgroundColor: 'hsl(217, 71%, 53%' } : {} }}
        >
          Accordion Item 5
        </AccordionHeader>
        <AccordionPanel style={ ({ isExpanded }) => isExpanded ? {} : { display: 'none' } }>
          This accordion item is styled by passing in functions for <code>style</code>. As before, these
          functions allow you to dynamically apply styles based on the accordion's state.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item6">
        <AccordionHeader>
          { ({ id, getIsExpanded }) => (
            <span
              className={ getIsExpanded(id) ? 'expanded' : 'collapsed' }
              style={ getIsExpanded(id) ? { color: 'hsl(217, 71%, 45%)' } : {} }
            >
              Accordion Item 6
            </span>
          ) }
        </AccordionHeader>
        <AccordionPanel>
          { ({ id, getIsExpanded }) => (
            <p
              className={ getIsExpanded(id) ? 'expanded' : 'collapsed' }
              style={ getIsExpanded(id) ? { color: 'hsl(217, 71%, 45%)' } : {} }
            >
              The content for this accordion item is rendered with a render function. Since these render
              functions have access to the accordion's state, you can dynamically style your content.
            </p>
          ) }
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default withStyleWrapper(StyledAccordion);
