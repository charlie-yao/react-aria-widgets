import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

export default function BasicAccordion() {
  return (
    <Accordion headerLevel={ 5 }>
      <AccordionItem id="lol">
        <AccordionHeader>
          Test
        </AccordionHeader>
        <AccordionPanel>
          Test
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
