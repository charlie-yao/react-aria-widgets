import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

//Components
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import AccordionPanel from './AccordionPanel';

type Story = StoryObj<typeof AccordionPanel>;

const meta = {
  component: AccordionPanel,
  args: {
    children: 'Hello world!',
  },
  render: (args) => {
    return (
      <Accordion headerLevel={ 1 }>
        <AccordionItem id="test">
          <AccordionPanel { ...args } />
        </AccordionItem>
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
