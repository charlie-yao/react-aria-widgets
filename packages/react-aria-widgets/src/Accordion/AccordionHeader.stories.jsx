import React from 'react';

//Components and Styles
import AccordionHeader from 'src/Accordion/AccordionHeader';

export default {
  title: 'Accordion/AccordionHeader',
  component: AccordionHeader,
  args: {
    children: 'Hello world!',
    id: 'accordionId',
    index: 1,
    headerLevel: 2,
    onClick: () => {},
    onKeyDown: () => {},
    setHeaderRef: () => {},
  },
};

function Template(args) {
  return <AccordionHeader { ...args } />;
}

export const Expanded = Template.bind({});
Expanded.args = {
  getIsExpanded: () => true,
  getIsDisabled: () => false,
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  getIsExpanded: () => false,
  getIsDisabled: () => false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  getIsExpanded: () => true,
  getIsDisabled: () => true,
};
