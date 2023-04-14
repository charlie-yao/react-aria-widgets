import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

//Components
import Accordion from 'src/Accordion/Accordion';
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

type Story = StoryObj<typeof Accordion>

const meta = {
  component: Accordion,
  args: {
    headerLevel: 2,
    renderHeader: (index, props) => {
      const { sections, headerElementType: HeaderElementType = AccordionHeader, headerProps = {} } = props;
      const section = sections[index];
      const { renderHeaderContent } = section;

      return (
        <HeaderElementType index={ index } {...props} {...headerProps}>
          { typeof renderHeaderContent === 'function' ? renderHeaderContent(props) : renderHeaderContent }
        </HeaderElementType>
      );
    },
    renderPanel: (index, props) => {
      const { sections, panelElementType: PanelElementType = AccordionPanel, panelProps = {} } = props;
      const section = sections[index];
      const { renderPanelContent } = section;

      return (
        <PanelElementType index={ index } {...props} {...panelProps}>
          { typeof renderPanelContent === 'function' ? renderPanelContent(props) : renderPanelContent }
        </PanelElementType>
      );
    },
    sections: [
      {
        id: 'section1',
        renderHeaderContent: <div>Hello world!</div>,
        renderPanelContent: () => 'Hello world!',
      },
    ],
  },
} satisfies Meta<typeof Accordion>;

export const YesMultipleYesToggle: Story = { 
  args: {
    allowMultiple: true,
    allowToggle: true,
  },
};

export const NoMultipleYesToggle: Story = {
  args: {
    allowMultiple: false,
    allowToggle: true,
  },
};

export const YesMultipleNoToggle: Story = {
  args: {
    allowMultiple: true,
    allowToggle: false,
  },
};

export const NoMultipleNoToggle: Story = {
  args: {
    allowMultiple: false,
    allowToggle: false,
  },
};

export default meta;
