import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

export default function BasicAccordion(props: any) {
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
