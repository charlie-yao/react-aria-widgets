import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

//Components
import Accordion from 'src/Accordion/Accordion';
import AccordionSection from 'src/Accordion/AccordionSection';
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

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
        <AccordionSection>
          <AccordionHeader>
            Basic Section
          </AccordionHeader>
          <AccordionPanel>
            Hello world!
          </AccordionPanel>
        </AccordionSection>
        <AccordionSection>
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
        <AccordionSection>
          <AccordionHeader>
            Section With Nested Accordion
          </AccordionHeader>
          <AccordionPanel>
            <Accordion headerLevel={ 2 }>
              <AccordionSection>
                <AccordionHeader>
                  Basic Section
                </AccordionHeader>
                <AccordionPanel>
                  Hello world!
                </AccordionPanel>
              </AccordionSection>
              <AccordionSection>
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
        <AccordionSection id="manually-entered-id">
          <AccordionHeader>
            Section With Manual ID
          </AccordionHeader>
          <AccordionPanel>
            The IDs for accessibility attributes in this section are coming from the
            { ' ' }
            <code>id</code>
            { ' ' }
            prop, not React&apos;s
            { ' ' }
            <code>useId</code>
            { ' ' }
            hook.
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

export const WithStateChangeCallback: Story = {
  args: {
    onStateChange: (expandedSections) => {
      console.log(expandedSections);
    },
  },
};

export const WithFocusChangeCallback: Story = {
  args: {
    onFocusChange: (ref, index) => {
      console.log(ref, index);
    },
  },
};

export default meta;
