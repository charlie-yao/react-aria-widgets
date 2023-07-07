import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

//Components
import Accordion from 'src/Accordion/Accordion';
import AccordionSection from 'src/Accordion/AccordionSection';
import AccordionPanel from 'src/Accordion/AccordionPanel';

type Story = StoryObj<typeof AccordionPanel>;

const meta = {
  component: AccordionPanel,
  args: {
    children: 'Hello world!',
    //    index: 0,
    //    sections: [
    //      {
    //        id: 'dummySectionId',
    //        renderHeaderContent: 'Section 1 Header',
    //        renderPanelContent: 'Hello world!',
    //      },
    //    ],
    //    getIsExpanded: () => true,
  },
  render: (args) => {
    return (
      <Accordion headerLevel={ 1 }>
        <AccordionSection id="test">
          <AccordionPanel { ...args } />
        </AccordionSection>
      </Accordion>
    );
  },
} satisfies Meta<typeof AccordionPanel>;

export const Expanded: Story = {};

export const Collapsed: Story = {
  args: {
    //    getIsExpanded: () => false,
  },
};

export const WithClassName: Story = {
  args: {
    className: 'dummyClassName',
  },
};

export const WithCustomStyle: Story = {
  args: {
    style: {
      color: 'red',
    },
  },
};

export const WithSectionRole: Story = {
  args: {
    as: 'div',
    role: 'section',
  },
};

export default meta;
