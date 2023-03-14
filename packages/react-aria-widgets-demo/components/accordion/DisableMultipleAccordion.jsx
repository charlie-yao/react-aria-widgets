import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

export default function DisableMultipleAccordion() {
  return (
    <Accordion headerLevel={ 6 } allowMultiple={ false }>
      <AccordionSection id="disable-multiple-section1">
        <AccordionHeader>
          DisableMultipleAccordion - Section 1
        </AccordionHeader>
        <AccordionPanel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor lorem eu blandit
          placerat. Nam interdum metus id molestie elementum. Aenean lorem eros, facilisis eu sem
          in, porttitor vestibulum massa. Phasellus tempus condimentum hendrerit. Vestibulum sagittis
          metus arcu, id ultrices tellus cursus nec. In sit amet purus sed dolor tempus condimentum.
          Curabitur in sapien ex. Cras condimentum quam in facilisis dictum. Mauris eu pulvinar massa.
          Nulla facilisis et tellus ut pretium.
        </AccordionPanel>
      </AccordionSection>
      <AccordionSection id="disable-multiple-section2">
        <AccordionHeader>
          DisableMultipleAccordion - Section 2
        </AccordionHeader>
        <AccordionPanel>
          Vestibulum vestibulum finibus enim, et rutrum nibh fringilla at. Sed varius purus at
          vestibulum finibus. Nunc interdum neque vitae viverra faucibus. Nullam erat dui, iaculis
          sed libero eu, hendrerit volutpat nunc. Vestibulum vitae porttitor turpis. Donec consectetur
          a tellus vitae mollis. Phasellus egestas blandit purus. Duis tempus, nunc vel mollis efficitur,
          urna mauris condimentum lectus, ac porttitor orci lorem nec leo. Sed augue metus, laoreet in
          neque eu, pulvinar dignissim nulla. Nulla facilisi. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae;
        </AccordionPanel>
      </AccordionSection>
      <AccordionSection id="disable-multiple-section3">
        <AccordionHeader>
          DisableMultipleAccordion - Section 3
        </AccordionHeader>
        <AccordionPanel>
          Curabitur tempus vulputate massa imperdiet feugiat. Aenean eleifend lectus quis lorem
          condimentum aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Quisque rhoncus auctor eros a congue. Nullam interdum id nisl id
          cursus. Quisque et lobortis nisl. Integer pretium lorem lectus, vel imperdiet diam hendrerit
          in. Sed ac enim pretium, laoreet sem quis, viverra lectus. Sed sagittis faucibus tellus semper
          molestie. Aliquam in magna est. Suspendisse at pellentesque augue, facilisis accumsan est.
          Ut iaculis turpis nec gravida consectetur.
        </AccordionPanel>
      </AccordionSection>
    </Accordion>
  );
}
