//HOCs
import withStyleWrapper from "./withStyleWrapper";

//Components
import CustomAccordion from "./CustomAccordion";
import CustomAccordionHeader from "./CustomAccordionHeader";
import CustomAccordionPanel from "./CustomAccordionPanel";

//Types
import { UseAccordion } from "react-aria-widgets/accordion";

function MyAccordion(props: UseAccordion) {
  return (
    <CustomAccordion { ...props }>
      <CustomAccordionHeader id="item1">
        Joke #1
      </CustomAccordionHeader> 
      <CustomAccordionPanel id="item1">
        <p>Why don&apos;t scientists trust atoms? Because they make up everything!</p>
      </CustomAccordionPanel>
      <CustomAccordionHeader id="item2">
        Joke #2 
      </CustomAccordionHeader> 
      <CustomAccordionPanel id="item2">
        Why did the bicycle fall over? Because it was two tired!
      </CustomAccordionPanel>
      <CustomAccordionHeader id="item3">
        Joke #3
      </CustomAccordionHeader> 
      <CustomAccordionPanel id="item3">
        What do you call fake spaghetti? An &quot;impasta&quot;!
      </CustomAccordionPanel>
    </CustomAccordion>
  );
}

export default withStyleWrapper(MyAccordion);
