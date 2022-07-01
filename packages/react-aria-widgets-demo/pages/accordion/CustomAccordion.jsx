import {
	Accordion,
	AccordionSection,
	AccordionHeader,
	AccordionPanel,
} from '@charlie-yao/react-aria-widgets/accordion';

//Components
import StyledAccordionHeader from './StyledAccordionHeader';
import StyledAccordionPanel from './StyledAccordionPanel';
import CustomAccordionHeader from './CustomAccordionHeader';
import CustomAccordionPanel from './CustomAccordionPanel';
import customRenderFunction from './customRenderFunction';

export default function CustomAccordion(props) {
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
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="custom-accordion-section2">
				<StyledAccordionHeader>
					CustomAccordion - Section 2
				</StyledAccordionHeader>
				<StyledAccordionPanel>
					Hello world!
				</StyledAccordionPanel>
			</AccordionSection>
			<AccordionSection id="custom-accordion-section3">
				<CustomAccordionHeader>
					CustomAccordion - Section 3
				</CustomAccordionHeader>
				<CustomAccordionPanel>
					Hello world!
				</CustomAccordionPanel>
			</AccordionSection>
			<AccordionSection id="custom-accordion-section4">
				{ customRenderFunction }
			</AccordionSection>
		</Accordion>
	);
}
