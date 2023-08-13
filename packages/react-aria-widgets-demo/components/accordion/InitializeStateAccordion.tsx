/* eslint-disable react/jsx-props-no-spreading */

import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

//HOCs
import withStyleWrapper from './withStyleWrapper';

//Types
import type { AccordionProps } from 'react-aria-widgets/accordion';

const ITEMS = [ 'item1', 'item2', 'item3' ];

function InitializeStateAccordion(props: AccordionProps) {
  return (
    <Accordion
      initialExpanded={ [ 'item1', 'item2' ] }
      initialDisabled={ [ 'item2' ] }
      { ...props }
    >
      { ITEMS.map((id, index) => (
        <AccordionItem key={ id } id={ id }>
          <AccordionHeader>
            Accordion Item { index + 1 }
          </AccordionHeader>
          <AccordionPanel>
            { ({ id, getIsExpanded, getIsDisabled }) => (
              <ul>
                <li><code>getIsExpanded(id)</code> = <code>{ getIsExpanded(id).toString() }</code></li>
                <li><code>getIsDisabled(id)</code> = <code>{ getIsDisabled(id).toString() }</code></li>
              </ul>
            ) }
          </AccordionPanel>
        </AccordionItem>
      )) }
    </Accordion>
  );
}

export default withStyleWrapper(InitializeStateAccordion);
