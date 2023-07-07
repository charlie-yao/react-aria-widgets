import type { Meta, StoryObj } from '@storybook/react';

//Components and Styles
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';

type Story = StoryObj<typeof BaseAccordionHeader>;

const meta = {
  component: BaseAccordionHeader,
  args: {
    children: 'Hello world!',
    id: 'headerId',
    controlsId: 'panelId',
    headerLevel: 1,
    onClick: (event) => event.preventDefault(),
    isExpanded: false,
    isDisabled: false,
  },
} satisfies Meta<typeof BaseAccordionHeader>;

export const Expanded: Story = {
  args: {
    isExpanded: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export default meta;
