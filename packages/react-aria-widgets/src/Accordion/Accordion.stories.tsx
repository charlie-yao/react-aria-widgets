import React, { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

//Components
import Accordion from 'src/Accordion/Accordion';
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';
import BlueAccordionHeader from 'src/Accordion/BlueAccordionHeader';
import BlueAccordionPanel from 'src/Accordion/BlueAccordionPanel';
import GreenAccordionHeader from 'src/Accordion/GreenAccordionHeader';
import GreenAccordionPanel from 'src/Accordion/GreenAccordionPanel';

//Misc.
import { defaultRenderHeader, defaultRenderPanel } from 'src/Accordion/utils';

type Story = StoryObj<typeof Accordion>;

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
                { /**/ }
                .
              </p>
              <p>
                By default,
                { ' ' }
                <code>renderHeaderContent</code>
                { ' ' }
                and
                { ' ' }
                <code>renderPanelContent</code>
                { ' ' }
                will receive the section&apos;s index and every prop passed to
                { ' ' }
                <code>&lt;Accordion&gt;</code>
                { ' ' }
                , including methods from the
                { ' ' }
                <code>withAccordionManager</code>
                { ' ' }
                HOC, as arguments. For example, this
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
                { /**/ }
                .
              </p>
            </>
          );
        },
      },
      {
        id: 'section3',
        headerElementType: BlueAccordionHeader,
        panelElementType: BlueAccordionPanel,
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
              , which determine which components will wrap the header/panel content for each section. By default,
              these components automatically receive as props the section&apos;s index and every prop passed to its parent
              { ' ' }
              <code>&lt;Accordion&gt;</code>
              .
              { ' ' }
              <code>&lt;Accordion&gt;</code>
              { ' ' }
              also accepts the props
              { ' ' }
              <code>headerProps</code>
              { ' ' }
              and
              { ' ' }
              <code>panelProps</code>
              { ' ' }
              , which are objects that get spread onto their respective element by default.
            </p>
            <p>
              Developers can also give each section a
              { ' ' }
              <code>headerElementType</code>
              , a
              { ' ' }
              <code>panelElementType</code>
              , a
              { ' ' }
              <code>headerProps</code>
              { /**/ }
              , and a
              { ' ' }
              <code>panelProps</code>
              { /**/ }
              . Section-specific properties override those on the accordion level.
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
            headerElementType,
            headerProps = {},
          } = accordionProps;

          const {
            headerElementType: indvHeaderElementType,
            headerProps: indvHeaderProps,
          } = sections[index];

          const HeaderElementType = indvHeaderElementType ? indvHeaderElementType : headerElementType;
          const _headerProps = indvHeaderProps ? indvHeaderProps : headerProps;

          return (
            <HeaderElementType
              index={ index }
              { ...accordionProps }
              { ..._headerProps }
            >
              Section  4
            </HeaderElementType>
          );
        },
        renderPanel: (index, accordionProps) => {
          const {
            sections,
            panelElementType,
            panelProps = {},
          } = accordionProps;

          const {
            panelElementType: indvPanelElementType,
            panelProps: indvPanelProps,
          } = sections[index];

          const PanelElementType = indvPanelElementType ? indvPanelElementType : panelElementType;
          const _panelProps = indvPanelProps ? indvPanelProps : panelProps;

          return (
            <PanelElementType
              index={ index }
              { ...accordionProps }
              { ..._panelProps }
            >
              <p>
                If, for whatever reason, the customization options showcased in the third example
                are insufficient, developers are given full control over how their headers and
                panels are rendered. One option is to pass the
                { ' ' }
                <code>&lt;Accordion&gt;</code>
                { ' ' }
                custom render functions for the props
                { ' ' }
                <code>renderHeader</code>
                { ' ' }
                and
                { ' ' }
                <code>renderPanel</code>
                , which are applied to each section. Developers can also specify section-specific render
                functions that use the same name. The section-specific versions of
                { ' ' }
                <code>renderHeader</code>
                { ' ' }
                and
                { ' ' }
                <code>renderPanel</code>
                { ' ' }
                override those on the accordion level. As with before, by default, these render functions
                automatically receive the section&apos;s index and the props passed to the parent
                { ' ' }
                <code>&lt;Accordion&gt;</code>
                { ' ' }
                as arguments.
              </p>
              <p>
                There are pitfalls to using custom functions for
                { ' ' }
                <code>renderHeader</code>
                { ' ' }
                and
                { ' ' }
                <code>renderPanel</code>
                { ' ' }
                though. In the previous accordion section examples, we&apos;ve been saying &quot;such-and-such
                elements/functions receive the section index and HOC methods by default&quot;. That&apos;s because the
                default
                { ' ' }
                <code>renderHeader</code>
                { ' ' }
                and
                { ' ' }
                <code>renderPanel</code>
                { ' ' }
                functions provide those behaviors. The default render functions also make sure that the
                elements you supply with
                { ' ' }
                <code>headerElementType</code>
                { ' ' }
                and
                { ' ' }
                <code>panelElementType</code>
                { ' ' }
                are used. If you override the default render functions, whether on the
                accordion level or on a specific section, you may want to reimplement these behaviors
                for the sake of consistency.
              </p>
              <p>
                This accordion section is itself an example of a pitfall with using custom
                { ' ' }
                <code>renderHeader</code>
                { ' ' }
                and
                { ' ' }
                <code>renderPanel</code>
                { ' ' }
                functions. This section uses section-specific render functions, overriding those on the
                accordion level. They largely recreate the behavior of the defaults but with one mistake: they
                ignore the section&apos;s
                { ' ' }
                <code>renderHeaderContent</code>
                { ' ' }
                and
                { ' ' }
                <code>renderPanelContent</code>
                . This section&apos;s
                { ' ' }
                <code>renderPanel</code>
                { ' ' }
                COULD access the content via
                { ' ' }
                <code>sections[index].renderHeaderContent</code>
                { /**/ }
                , but instead, it renders the hard-coded content that you&apos;re currently reading.
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

export const NonDefaultElementTypes: Story = {
  args: {
    headerElementType: GreenAccordionHeader,
    panelElementType: GreenAccordionPanel,
  },
};

export const CustomHeaderPanelProps: Story = {
  args: {
    headerProps: {
      buttonProps: {
        style: {
          fontWeight: 'bold',
        },
      },
    },
    panelProps: {
      style: {
        fontWeight: 'bold',
      },
    },
  },
};

export const CustomRenderHeaderPanel: Story = {
  args: {
    renderHeader: (index, accordionProps) => {
      const {
        sections,
        headerElementType = AccordionHeader,
        headerProps = {},
      } = accordionProps;

      const {
        renderHeaderContent,
        headerElementType: indvHeaderElementType,
        headerProps: indvHeaderProps,
      } = sections[index];

      const HeaderElementType = indvHeaderElementType ? indvHeaderElementType : headerElementType;
      const _headerProps = indvHeaderProps ? indvHeaderProps : headerProps;
      let children;

      if(typeof renderHeaderContent === 'function')
        children = renderHeaderContent(index, accordionProps);
      else
        children = renderHeaderContent;

      return (
        <HeaderElementType
          index={ index }
          { ...accordionProps }
          { ..._headerProps }
        >
          <>
            { children }
            <span>
              Random span added by
              { ' ' }
              <code>renderHeader</code>
              { /**/ }
              !
            </span>
          </>
        </HeaderElementType>
      );
    },
    renderPanel: (index, accordionProps) => {
      const {
        sections,
        panelElementType,
        panelProps = {},
      } = accordionProps;

      const {
        renderPanelContent,
        panelElementType: indvPanelElementType,
        panelProps: indvPanelProps,
      } = sections[index];

      const PanelElementType = indvPanelElementType ? indvPanelElementType : panelElementType;
      const _panelProps = indvPanelProps ? indvPanelProps : panelProps;
      let children;

      if(typeof renderPanelContent === 'function')
        children = renderPanelContent(index, accordionProps);
      else
        children = renderPanelContent;

      return (
        <PanelElementType
          index={ index }
          { ...accordionProps }
          { ..._panelProps }
        >
          <>
            { children }
            <span>
              Random span added by
              { ' ' }
              <code>renderPanel</code>
              { /**/ }
              !
            </span>
          </>
        </PanelElementType>
      );
    },
  },
};

export const CustomRenderSection: Story = {
  args: {
    renderSection: (index, props) => {
      const {
        sections,
        renderHeader = defaultRenderHeader,
        renderPanel = defaultRenderPanel,
      } = props;

      const {
        id,
        renderHeader: renderIndvHeader,
        renderPanel: renderIndvPanel,
      } = sections[index];

      const _renderHeader = renderIndvHeader ? renderIndvHeader : renderHeader;
      const _renderPanel = renderIndvPanel ? renderIndvPanel : renderPanel;

      return (
        <Fragment key={ id }>
          { _renderHeader(index, props) }
          { _renderPanel(index, props) }
          <span>
            Random span added by
            { ' ' }
            <code>renderSection</code>
            { /**/ }
            !
          </span>
        </Fragment>
      );
    },
  },
};

export const CombinedCustomizationOptions: Story = {
  args: {
    ...NonDefaultElementTypes.args,
    ...CustomHeaderPanelProps.args,
    ...CustomRenderHeaderPanel.args,
    ...CustomRenderSection.args,
  },
};

export default meta;
