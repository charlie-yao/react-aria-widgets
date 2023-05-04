import type { Meta, StoryObj } from '@storybook/react';

//Components
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

type Story = StoryObj<typeof BaseAccordionPanel>;

const meta = {
  component: BaseAccordionPanel,
  args: {
    children: 'Hello world!',
    id: 'placeholder',
    labelId: 'labelPlaceholder',
  },
} satisfies Meta<typeof BaseAccordionPanel>;

export const Default: Story = {};

export const WithSectionRole: Story = {
  args: {
    tagName: 'div',
    role: 'section',
  },
};

export const WithoutSectionRole: Story = {
  args: {
    tagName: 'div',
  },
};

export default meta;
