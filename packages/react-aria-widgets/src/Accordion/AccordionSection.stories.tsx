import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

//Components
import Accordion from 'src/Accordion/Accordion';
import AccordionSection from 'src/Accordion/AccordionSection';
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

type Story = StoryObj<typeof AccordionSection>

const meta = {
  component: AccordionSection,
  args: {
    id: 'accordionId',
  },
  decorators: [
    (Story) => (
      <Accordion headerLevel={ 2 }>
        <Story />
      </Accordion>
    ),
  ],
} satisfies Meta<typeof AccordionSection>;

export const Default: Story = {
  args: {
    children: (props) => (
      <>
        <AccordionHeader key={ 0 } { ...props }>
          Header
        </AccordionHeader>
        <AccordionPanel key={ 1 } { ...props }>
          Hello world!
          </AccordionPanel>
      </>
    ),
  },
};

export default meta;
