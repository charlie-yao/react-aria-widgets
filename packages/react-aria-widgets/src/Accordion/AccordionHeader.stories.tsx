import type { Meta, StoryObj } from '@storybook/react';

//Components
import AccordionHeader from 'src/Accordion/AccordionHeader';

type Story = StoryObj<typeof AccordionHeader>

const meta = {
  component: AccordionHeader,
  args: {
    children: 'Hello world!',
    id: 'accordionId',
    index: 1,
    headerLevel: 2,
    setHeaderRef: () => {},
  },
} satisfies Meta<typeof AccordionHeader>;

export const Expanded: Story = {
  args: {
    getIsExpanded: () => true,
    getIsDisabled: () => false,
  },
};

export const Collapsed: Story = {
  args: {
    getIsExpanded: () => false,
    getIsDisabled: () => false,
  },
};

export const Disabled: Story = {
  args: {
    getIsExpanded: () => true,
    getIsDisabled: () => true,
  },
};

export default meta;
