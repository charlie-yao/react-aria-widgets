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

export const Default: Story = {};

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

export const WithoutSectionRole: Story = {
  args: {
    as: 'div',
  },
};

export default meta;
