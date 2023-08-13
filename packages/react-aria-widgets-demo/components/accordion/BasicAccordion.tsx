/* eslint-disable react/jsx-props-no-spreading */

import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//HOCs
import withStyleWrapper from './withStyleWrapper';

//Types
import type { AccordionProps } from 'react-aria-widgets/accordion';

function BasicAccordion(props: AccordionProps) {
  return (
    <Accordion { ...props }>
      <AccordionItem id="item1">
        <AccordionHeader>
          Accordion Item 1
        </AccordionHeader>
        <AccordionPanel>
          Hello world!
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item2">
        <AccordionHeader>
          Accordion Item 2
        </AccordionHeader>
        <AccordionPanel>
          Hello world!
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item3">
        <AccordionHeader>
          Accordion Item 3
        </AccordionHeader>
        <AccordionPanel>
          Hello world!
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default withStyleWrapper(BasicAccordion);
export { BasicAccordion as UnstyledBasicAccordion };
