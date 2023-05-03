import { Accordion, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

const sections = [
  {
    id: 'basic-section1',
    renderHeaderContent: 'BasicAccordion - Section 1',
    renderPanelContent: 'Lorem ipsum',
  },
  {
    id: 'basic-section2',
    renderHeaderContent: 'BasicAccordion - Section 2',
    renderPanelContent: 'Lorem ipsum',
  },
  {
    id: 'basic-section3',
    renderHeaderContent: 'BasicAccordion - Section 3',
    renderPanelContent: 'Lorem ipsum',
  },
];

export default function BasicAccordion() {
  return (
    <Accordion
      headerLevel={ 5 }
      sections={ sections }
      headerElementType={ AccordionHeader }
      panelElementType={ AccordionPanel }
    />
  );
}
