import type { Meta, StoryObj } from '@storybook/react';

//Components and Styles
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';

type Story = StoryObj<typeof BaseAccordionHeader>;

const meta = {
  component: BaseAccordionHeader,
  args: {
    children: 'Hello world!',
    id: 'headerId',
    headerLevel: 1,
    onClick: (event) => event.preventDefault(),
    'aria-controls': 'panelId',
    'aria-expanded': false,
    'aria-disabled': false,
  },
} satisfies Meta<typeof BaseAccordionHeader>;

export const Expanded: Story = {
  args: {
    'aria-expanded': true,
  },
};

export const Disabled: Story = {
  args: {
    'aria-disabled': true,
  },
};

export default meta;
