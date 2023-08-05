/* eslint-disable react/jsx-no-bind */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

//Components
import Accordion from 'src/Accordion/Accordion';
import ControlledAccordion from 'src/Accordion/ControlledAccordion';
import AccordionSection from 'src/Accordion/AccordionSection';
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//Hooks
import useAccordion from 'src/Accordion/useAccordion';

type Story = StoryObj<typeof Accordion>;

const meta = {
  component: Accordion,
  args: {
    headerLevel: 1,
  },
  render: (args) => {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
    };

    return (
      <Accordion { ...args }>
        <AccordionSection id="section1">
          <AccordionHeader>
            Basic Section
          </AccordionHeader>
          <AccordionPanel>
            Hello world!
          </AccordionPanel>
        </AccordionSection>
        <AccordionSection id="section2">
          <AccordionHeader>
            Section With Interactive Elements
          </AccordionHeader>
          <AccordionPanel>
            <form onSubmit={ handleSubmit }>
              <label htmlFor="nameInput">
                Name:
              </label>
              <input id="nameInput" type="text" />
              <button type="submit">
                Submit
              </button>
            </form>
          </AccordionPanel>
        </AccordionSection>
        <AccordionSection id="section3">
          <AccordionHeader>
            Section With Nested Accordion
          </AccordionHeader>
          <AccordionPanel>
            <Accordion headerLevel={ 2 }>
              <AccordionSection id="nested-section1">
                <AccordionHeader>
                  Basic Section
                </AccordionHeader>
                <AccordionPanel>
                  Hello world!
                </AccordionPanel>
              </AccordionSection>
              <AccordionSection id="nested-section2">
                <AccordionHeader>
                  Section With Interactive Elements
                </AccordionHeader>
                <AccordionPanel>
                  <form onSubmit={ handleSubmit }>
                    <label htmlFor="nestedNameInput">
                      Name:
                    </label>
                    <input id="nestedNameInput" type="text" />
                    <button type="submit">
                      Submit
                    </button>
                  </form>
                </AccordionPanel>
              </AccordionSection>
            </Accordion>
          </AccordionPanel>
        </AccordionSection>
      </Accordion>
    );
  },
} satisfies Meta<typeof Accordion>;

export const YesMultipleYesCollapseLast: Story = {
  args: {
    allowMultiple: true,
    allowCollapseLast: true,
  },
};

export const NoMultipleYesCollapseLast: Story = {
  args: {
    allowMultiple: false,
    allowCollapseLast: true,
  },
};

export const YesMultipleNoCollapseLast: Story = {
  args: {
    allowMultiple: true,
    allowCollapseLast: false,
  },
};

export const NoMultipleNoCollapseLast: Story = {
  args: {
    allowMultiple: false,
    allowCollapseLast: false,
  },
};

export const UseRenderFunctions: Story = {
  render: (args) => {
    return (
      <Accordion { ...args }>
        <AccordionSection id="section1">
          <AccordionHeader>
            { ({ id }) => <div>Section ID: { id }</div> }
          </AccordionHeader>
          <AccordionPanel>
            { ({ allowMultiple, allowCollapseLast, id }) => (
              <ul>
                <li>allowMultple = { allowMultiple.toString() }</li>
                <li>allowCollapseLast = { allowCollapseLast.toString() }</li>
                <li>id = { id }</li>
              </ul>
            ) }
          </AccordionPanel>
        </AccordionSection>
      </Accordion>
    );
  },
};

export const WithToggleExpandedCallback: Story = {
  args: {
    onToggleExpanded: (expandedSections) => {
      //eslint-disable-next-line no-console
      console.log(expandedSections);
    },
  },
};

export const WithToggleDisabledCallback: Story = {
  args: {
    onToggleDisabled: (disabledSections) => {
      //eslint-disable-next-line no-console
      console.log(disabledSections);
    },
  },
  render: (args) => {
    return (
      <Accordion { ...args }>
        <AccordionSection id="section1">
          <AccordionHeader>
            Section 1
          </AccordionHeader>
          <AccordionPanel>
            { ({ toggleDisabled, getIsDisabled, id }) => {
              const isDisabled = getIsDisabled(id);

              return (
                <form>
                  <button type="button" onClick={ () => { toggleDisabled(id); } }>
                    { `${isDisabled ? 'Enable' : 'Disable'} ${id}` }
                  </button>
                </form>
              );
            } }
          </AccordionPanel>
        </AccordionSection>
      </Accordion>
    );
  },
};

export const WithFocusChangeCallback: Story = {
  args: {
    onFocusChange: ({ elem, index, id }) => {
      //eslint-disable-next-line no-console
      console.log(elem, index, id);
    },
  },
};

export const Controlled: Story = {
  render: (args) => {
    //eslint-disable-next-line react-hooks/rules-of-hooks
    const contextValue = useAccordion(args);
    const { toggleExpanded, toggleDisabled } = contextValue;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
    };

    const handleToggleExpanded: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      toggleExpanded(event.currentTarget.value);
    };

    const handleToggleDisabled: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      toggleDisabled(event.currentTarget.value);
    };

    return (
      <>
        <form onSubmit={ handleSubmit }>
          <button type="button" onClick={ handleToggleExpanded } value="section1">
            Expand/Collapse section1
          </button>
          <button type="button" onClick={ handleToggleExpanded } value="section2">
            Expand/Collapse section2
          </button>
          <button type="button" onClick={ handleToggleExpanded } value="section3">
            Expand/Collapse section3
          </button>
          <button type="button" onClick={ handleToggleDisabled } value="section1">
            Enable/Disable section1
          </button>
          <button type="button" onClick={ handleToggleDisabled } value="section2">
            Enable/Disable section2
          </button>
          <button type="button" onClick={ handleToggleDisabled } value="section3">
            Enable/Disable section3
          </button>
        </form>
        <ControlledAccordion contextValue={ contextValue }>
          <AccordionSection id="section1">
            <AccordionHeader>
              Basic Section
            </AccordionHeader>
            <AccordionPanel>
              Hello world!
            </AccordionPanel>
          </AccordionSection>
          <AccordionSection id="section2">
            <AccordionHeader>
              Section With Interactive Elements
            </AccordionHeader>
            <AccordionPanel>
              <form onSubmit={ handleSubmit }>
                <label htmlFor="nameInput">
                  Name:
                </label>
                <input id="nameInput" type="text" />
                <button type="submit">
                  Submit
                </button>
              </form>
            </AccordionPanel>
          </AccordionSection>
          <AccordionSection id="section3">
            <AccordionHeader>
              Section With Nested Accordion
            </AccordionHeader>
            <AccordionPanel>
              <Accordion headerLevel={ 2 }>
                <AccordionSection id="nested-section1">
                  <AccordionHeader>
                    Basic Section
                  </AccordionHeader>
                  <AccordionPanel>
                    Hello world!
                  </AccordionPanel>
                </AccordionSection>
                <AccordionSection id="nested-section2">
                  <AccordionHeader>
                    Section With Interactive Elements
                  </AccordionHeader>
                  <AccordionPanel>
                    <form onSubmit={ handleSubmit }>
                      <label htmlFor="nestedNameInput">
                        Name:
                      </label>
                      <input id="nestedNameInput" type="text" />
                      <button type="submit">
                        Submit
                      </button>
                    </form>
                  </AccordionPanel>
                </AccordionSection>
              </Accordion>
            </AccordionPanel>
          </AccordionSection>
        </ControlledAccordion>
      </>
    );
  },
};

export default meta;
