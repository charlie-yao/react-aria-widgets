import type { Meta, StoryObj } from '@storybook/react';

//Components
import BaseAccordionPanel from './BaseAccordionPanel';

type Story = StoryObj<typeof BaseAccordionPanel>;

const meta = {
  component: BaseAccordionPanel,
  args: {
    children: 'Hello world!',
    id: 'panelId',
    'aria-labelledby': 'labelId',
  },
} satisfies Meta<typeof BaseAccordionPanel>;

export const Default: Story = {};

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
