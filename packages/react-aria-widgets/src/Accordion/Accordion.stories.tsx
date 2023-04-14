import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

//Components
import Accordion from 'src/Accordion/Accordion';
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//Misc.
import { defaultRenderHeader, defaultRenderPanel } from 'src/Accordion/utils';

type Story = StoryObj<typeof Accordion>

const meta = {
  component: Accordion,
  args: {
    headerLevel: 1,
    sections: [
      {
        id: 'section1',
        renderHeaderContent: 'Section 1',
        renderPanelContent: (
          <p>
            This header/panel content was rendered by supplying objects of type
            { ' ' }
            <code>React.ReactNode</code>
            { '' }
            , i.e. anything renderable inside of JSX. The value of
            { ' ' }
            <code>renderHeaderContent</code>
            { ' ' }
            is a string while the value of
            { ' ' }
            <code>renderPanelContent</code>
            { ' ' }
            is text inside of a &lt;p&gt; tag.
          </p>
        ),
      },
      {
        id: 'section2',
        renderHeaderContent: () => 'Section 2',
        renderPanelContent: () => (
          <p>This header/panel content was (trivially) rendered with a render function.</p>
        ),
      },
      {
        id: 'section3',
        renderHeader: (index, props) => {
          const { sections, headerElementType: HeaderElementType = AccordionHeader, headerProps = {} } = props;
          const section = sections[index];
          const { renderHeaderContent } = section;
          const children = typeof renderHeaderContent === 'function' ? renderHeaderContent(props) : renderHeaderContent;

          return (
            <HeaderElementType
              index={ index }
              {...props}
              {...headerProps}
            >
              { children }
            </HeaderElementType>
          );
        },
        renderPanel: (index, props) => {
          const { sections, panelElementType: PanelElementType = AccordionPanel, panelProps = {} } = props;
          const section = sections[index];
          const { renderPanelContent } = section;
          const children = typeof renderPanelContent === 'function' ? renderPanelContent(props) : renderPanelContent;

          return (
            <PanelElementType
              index={ index }
              {...props}
              {...panelProps}
            >
              { children }
            </PanelElementType>
          );
        },
        renderHeaderContent: 'Section 3',
        renderPanelContent: (
          <p>
            This header/panel uses per-section
            { ' ' }
            <code>renderHeader</code>
            { ' ' }
            and
            { ' ' }
            <code>renderPanel</code>
            { ' ' }
            functions that simply reimplement the behavior of the defaults. The content
            is provided by the
            { ' ' }
            <code>renderHeaderContent</code>
            { ' ' }
            and
            { ' ' }
            <code>renderPanelContent</code>
            { ' ' }
            fields.
          </p>
        ),
      },
      {
        id: 'section4',
        renderHeader: (index, props) => {
          const { headerElementType: HeaderElementType = AccordionHeader, headerProps = {} } = props;

          return (
            <HeaderElementType
              index={ index }
              {...props}
              {...headerProps}
            >
                Section 5
            </HeaderElementType>
          );
        },
        renderPanel: (index, props) => {
          const { panelElementType: PanelElementType = AccordionPanel, panelProps = {} } = props;

          return (
            <PanelElementType
              index={ index }
              {...props}
              {...panelProps}
            >
              <p>
                This header/panel uses per-section
                { ' ' }
                <code>renderHeader</code>
                { ' ' }
                and
                { ' ' }
                <code>renderPanel</code>
                { ' ' }
                functions that largely recreate the behavior of the defaults. The difference is that the
                { ' ' }
                <code>renderHeaderContent</code>
                { ' ' }
                and
                { ' ' }
                <code>renderPanelContent</code>
                { ' ' }
                fields are ignored. Technically speaking, there is nothing that enforces the reuse of the content
                fields, but there isn't much upside to ignoring them. There may be confusion as to where the "true"
                content lies, and if you provide a render function to
                { ' ' }
                <code>renderHeaderContent</code>
                { ' ' }
                or
                { ' '}
                <code>renderHeaderContent</code>
                { '' }
                , it'll have access to the same information as their "parent" render functions.
              </p>
            </PanelElementType>
          );
        },
        renderHeaderContent: 'Section 4 - Shouldn\'t be seen.',
        renderPanelContent: 'You shouldn\'t be seeing this.',
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
