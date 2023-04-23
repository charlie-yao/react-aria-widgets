import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

//Components
import Accordion from 'src/Accordion/Accordion';
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';
import StyledAccordionHeader from 'src/Accordion/StyledAccordionHeader';
import StyledAccordionPanel from 'src/Accordion/StyledAccordionPanel';

type Story = StoryObj<typeof Accordion>

const meta = {
  component: Accordion,
  args: {
    headerLevel: 1,
    headerElementType: AccordionHeader,
    panelElementType: AccordionPanel,
    sections: [
      {
        id: 'section1',
        renderHeaderContent: 'Section 1',
        renderPanelContent: (
          <p>
            This header/panel content was rendered by supplying values of type
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
            is just a regular
            { ' ' }
            <code>&lt;p&gt;</code>
            { ' ' }
            element.
          </p>
        ),
      },
      {
        id: 'section2',
        renderHeaderContent: () => 'Section 2',
        renderPanelContent: (index, accordionProps) => {
          const { headerLevel } = accordionProps;

          return (
            <>
              <p>
                The header/panel content for this section was rendered by supplying render functions to
                { ' ' }
                <code>renderHeaderContent</code>
                { ' ' }
                and
                { ' ' }
                <code>renderPanelContent</code>
                { '' }
                .
              </p>
              <p>
                Unless you use custom render functions for
                { ' ' }
                <code>renderSection</code>
                { '' }
                ,
                { ' ' }
                <code>renderHeader</code>
                { '' }
                ,
                { ' ' }
                and
                { ' ' }
                <code>renderPanel</code>
                { ' ' }
                that remove this behavior,
                { ' ' }
                <code>renderHeaderContent</code>
                { ' ' }
                and
                { ' ' }
                <code>renderPanelContent</code>
                { ' ' }
                will receive the section's index and every prop passed to
                { ' ' }
                <code>&lt;Accordion&gt;</code>
                { ' ' }
                , including methods from
                { ' ' }
                <code>withAccordionManager</code>
                { '' }
                , as arguments. For example, this
                { ' ' }
                <code>renderPanelContent</code>
                { ' ' }
                knows that its index is
                { ' ' }
                <code>{ index }</code>
                { ' ' }
                and that its
                { ' ' }
                <code>headerLevel</code>
                { ' ' }
                is
                { ' ' }
                <code>{ headerLevel }</code>
                { '' }
                .
              </p>
            </>
          );
        },
      },
      {
        id: 'section3',
        headerElementType: StyledAccordionHeader,
        panelElementType: StyledAccordionPanel,
        headerProps: {
          buttonProps: {
            style: {
              border: '2px solid black',
            },
          },
        },
        panelProps: {
          style: {
            border: '2px solid black',
          },
        },
        renderHeaderContent: 'Section 3',
        renderPanelContent: (
          <>
            <p>
              <code>&lt;Accordion&gt;</code>
              { ' ' }
              accepts the props
              { ' ' }
              <code>headerElementType</code>
              { ' ' }
              and
              { ' ' }
              <code>panelElementType</code>
              { '' }
              , which determine which components will wrap the header/panel content for each section.
              It also accepts the props
              { ' ' }
              <code>headerProps</code>
              { ' ' }
              and
              { ' ' }
              <code>panelProps</code>
              { ' ' }
              , which are objects that get spread onto their respective element.
            </p>
            <p>
              Developers can also give each section a
              { ' ' }
              <code>headerElementType</code>
              { '' }
              , a
              { ' ' }
              <code>panelElementType</code>
              { '' }
              , a
              { ' ' }
              <code>headerProps</code>
              { '' }
              , and/or a
              { ' ' }
              <code>panelProps</code>
              { '' }
              . Section-specific header/panel element types overwrite those on the accordion level, whereas
              section-specific header/panel props are merged with those on the accordion level. If there are any
              conflicts in the merged objects, the properties from the section-specific objects are prioritized.
            </p>
            <p>
              This section uses a
              { ' ' }
              <code>headerElementType</code>
              { ' ' }
              and a
              { ' ' }
              <code>panelElementType</code>
              { ' ' }
              that composes over
              { ' ' }
              <code>&lt;AccordionHeader&gt;</code>
              { ' ' }
              and
              { ' ' }
              <code>&lt;AccordionPanel&gt;</code>
              { ' ' }
              to automatically color the text blue. It also uses section-specific
              { ' ' }
              <code>headerProps</code>
              { ' ' }
              and
              { ' ' }
              <code>panelProps</code>
              { ' ' }
              to set styles with black borders.
            </p>
          </>
        ),
      },
      {
        id: 'section4',
        renderHeader: (index, accordionProps) => {
          const {
            sections,
            headerElementType = AccordionHeader,
            headerProps = {}
          } = accordionProps;

          const {
            headerElementType: indvHeaderElementType,
            headerProps: indvHeaderProps = {}
          } = sections[index];

          const HeaderElementType = indvHeaderElementType ? indvHeaderElementType : headerElementType;
          const combinedHeaderProps = { ...headerProps, ...indvHeaderProps };

          return (
            <HeaderElementType
              index={ index }
              {...accordionProps}
              {...combinedHeaderProps}
            >
                Section  4
            </HeaderElementType>
          );
        },
        renderPanel: (index, accordionProps) => {
          const {
            sections,
            panelElementType = AccordionPanel,
            panelProps = {},
          } = accordionProps;

          const {
            panelElementType: indvPanelElementType,
            panelProps: indvPanelProps = {},
          } = sections[index];

          const PanelElementType = indvPanelElementType ? indvPanelElementType : panelElementType;
          const combinedPanelProps = { ...panelProps, ...indvPanelProps };

          return (
            <PanelElementType
              index={ index }
              {...accordionProps}
              {...combinedPanelProps}
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
