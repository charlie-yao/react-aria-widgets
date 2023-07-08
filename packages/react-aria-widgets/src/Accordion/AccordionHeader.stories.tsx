import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

//Components
import Accordion from 'src/Accordion/Accordion';
import AccordionSection from 'src/Accordion/AccordionSection';
import AccordionHeader from 'src/Accordion/AccordionHeader';

type Story = StoryObj<typeof AccordionHeader>;

const meta = {
  component: AccordionHeader,
  args: {
    children: 'Hello world!',
  },
  render: (args) => {
    return (
      <Accordion headerLevel={ 1 }>
        <AccordionSection id="test">
          <AccordionHeader { ...args } />
        </AccordionSection>
      </Accordion>
    );
  },
} satisfies Meta<typeof AccordionHeader>;

export const Default: Story = {};

export const WithHeaderProps: Story = {
  args: {
    headerProps: {
      style: {
        backgroundColor: 'red',
      },
    },
  },
};

export const WithButtonProps: Story = {
  args: {
    buttonProps: {
      style: {
        color: 'red',
      },
    },
  },
};

export default meta;
