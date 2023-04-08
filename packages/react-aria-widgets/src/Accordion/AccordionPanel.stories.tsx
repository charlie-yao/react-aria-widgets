import type { Meta, StoryObj } from '@storybook/react';

//Components
import AccordionPanel from 'src/Accordion/AccordionPanel';

type Story = StoryObj<typeof AccordionPanel>

const meta = {
  component: AccordionPanel,
  args: {
    children: 'Hello world!',
    id: 'accordionId',
  },
} satisfies Meta<typeof AccordionPanel>;

export const Expanded: Story = {
  args: {
    getIsExpanded: () => true,
  },
};

export const Collapsed: Story = {
  args: {
    getIsExpanded: () => false,
  },
};

export const WithClassName: Story = {
  args: {
    getIsExpanded: () => false,
    className: 'dummyClassName',
  },
};

export default meta;
