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
    return (
      <Accordion { ...args }>
        <AccordionSection id="1">
          <AccordionHeader>
            Basic Section
          </AccordionHeader>
          <AccordionPanel>
            Hello world!
          </AccordionPanel>
        </AccordionSection>
        <AccordionSection id="2">
          <AccordionHeader>
            Section With Interactive Elements
          </AccordionHeader>
          <AccordionPanel>
            <form onSubmit={ (e) => { e.preventDefault() } }>
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
        <AccordionSection id="3">
          <AccordionHeader>
            Section With Nested Accordion
          </AccordionHeader>
          <AccordionPanel>
            <Accordion headerLevel={ 2 }>
              <AccordionSection id="3-1">
                <AccordionHeader>
                  Basic Section
                </AccordionHeader>
                <AccordionPanel>
                  Hello world!
                </AccordionPanel>
              </AccordionSection>
              <AccordionSection id="3-2">
                <AccordionHeader>
                  Section With Interactive Elements
                </AccordionHeader>
                <AccordionPanel>
                  <form onSubmit={ (e) => { e.preventDefault() } }>
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
