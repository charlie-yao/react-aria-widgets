import {
	Accordion,
	AccordionSection,
	AccordionHeader,
	AccordionPanel,
} from 'react-aria-widgets/accordion';

//Components
import StyledAccordionHeader from './StyledAccordionHeader';
import StyledAccordionPanel from './StyledAccordionPanel';
import CustomAccordionHeader from './CustomAccordionHeader';
import CustomAccordionPanel from './CustomAccordionPanel';
import customRenderFunction from './customRenderFunction';

export default function CustomAccordion() {
	return (
		<Accordion headerLevel={ 4 }>
			<AccordionSection id="custom-accordion-section1">
				<AccordionHeader
					headerProps={{ className: 'defaultHeaderClass' }}
					buttonProps={{ className: 'defaultButtonClass' }}
				>
					CustomAccordion - Section 1
				</AccordionHeader>
				<AccordionPanel className="defaultPanelClass">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor lorem eu blandit
					placerat. Nam interdum metus id molestie elementum. Aenean lorem eros, facilisis eu sem
					in, porttitor vestibulum massa. Phasellus tempus condimentum hendrerit. Vestibulum sagittis
					metus arcu, id ultrices tellus cursus nec. In sit amet purus sed dolor tempus condimentum.
					Curabitur in sapien ex. Cras condimentum quam in facilisis dictum. Mauris eu pulvinar massa.
					Nulla facilisis et tellus ut pretium.
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="custom-accordion-section2">
				<StyledAccordionHeader>
					CustomAccordion - Section 2
				</StyledAccordionHeader>
				<StyledAccordionPanel>
					Vestibulum vestibulum finibus enim, et rutrum nibh fringilla at. Sed varius purus at
					vestibulum finibus. Nunc interdum neque vitae viverra faucibus. Nullam erat dui, iaculis
					sed libero eu, hendrerit volutpat nunc. Vestibulum vitae porttitor turpis. Donec consectetur
					a tellus vitae mollis. Phasellus egestas blandit purus. Duis tempus, nunc vel mollis efficitur,
					urna mauris condimentum lectus, ac porttitor orci lorem nec leo. Sed augue metus, laoreet in
					neque eu, pulvinar dignissim nulla. Nulla facilisi. Vestibulum ante ipsum primis in faucibus
					orci luctus et ultrices posuere cubilia curae;
				</StyledAccordionPanel>
			</AccordionSection>
			<AccordionSection id="custom-accordion-section3">
				<CustomAccordionHeader>
					CustomAccordion - Section 3
				</CustomAccordionHeader>
				<CustomAccordionPanel>
					Curabitur tempus vulputate massa imperdiet feugiat. Aenean eleifend lectus quis lorem
					condimentum aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
					per inceptos himenaeos. Quisque rhoncus auctor eros a congue. Nullam interdum id nisl id
					cursus. Quisque et lobortis nisl. Integer pretium lorem lectus, vel imperdiet diam hendrerit
					in. Sed ac enim pretium, laoreet sem quis, viverra lectus. Sed sagittis faucibus tellus semper
					molestie. Aliquam in magna est. Suspendisse at pellentesque augue, facilisis accumsan est.
					Ut iaculis turpis nec gravida consectetur.
				</CustomAccordionPanel>
			</AccordionSection>
			<AccordionSection id="custom-accordion-section4">
				{ customRenderFunction }
			</AccordionSection>
		</Accordion>
	);
}
