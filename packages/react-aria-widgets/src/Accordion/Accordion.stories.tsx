/* eslint-disable react/jsx-no-bind */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

//Components
import Accordion from 'src/Accordion/Accordion';
import ControlledAccordion from 'src/Accordion/ControlledAccordion';
import AccordionItem from 'src/Accordion/AccordionItem';
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
        <AccordionItem id="item1">
          <AccordionHeader>
            Basic Item
          </AccordionHeader>
          <AccordionPanel>
            Hello world!
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem id="item2">
          <AccordionHeader>
            Item With Interactive Elements
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
        </AccordionItem>
        <AccordionItem id="item3">
          <AccordionHeader>
            Item With Nested Accordion
          </AccordionHeader>
          <AccordionPanel>
            <Accordion headerLevel={ 2 }>
              <AccordionItem id="nested-item1">
                <AccordionHeader>
                  Basic Item
                </AccordionHeader>
                <AccordionPanel>
                  Hello world!
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem id="nested-item2">
                <AccordionHeader>
                  Item With Interactive Elements
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
              </AccordionItem>
            </Accordion>
          </AccordionPanel>
        </AccordionItem>
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
        <AccordionItem id="item1">
          <AccordionHeader>
            { ({ id }) => <div>Item ID: { id }</div> }
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
        </AccordionItem>
      </Accordion>
    );
  },
};

export const WithInitialExpanded: Story = {
  args: {
    initialExpanded: [ 'item1', 'item3' ],
  },
};

export const WithInitialExpandedNoAllowMultiple: Story = {
  args: {
    initialExpanded: [ 'item2', 'item3' ],
    allowMultiple: false,
  },
};

export const WithInitialDisabled: Story = {
  args: {
    initialDisabled: [ 'item2', 'item3' ],
  },
};

export const WithToggleExpandedCallback: Story = {
  args: {
    onToggleExpanded: (expandedItems) => {
      //eslint-disable-next-line no-console
      console.log(expandedItems);
    },
  },
};

export const WithToggleDisabledCallback: Story = {
  args: {
    onToggleDisabled: (disabledItems) => {
      //eslint-disable-next-line no-console
      console.log(disabledItems);
    },
  },
  render: (args) => {
    return (
      <Accordion { ...args }>
        <AccordionItem id="item1">
          <AccordionHeader>
            Item 1
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
        </AccordionItem>
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
          <button type="button" onClick={ handleToggleExpanded } value="item1">
            Expand/Collapse item1
          </button>
          <button type="button" onClick={ handleToggleExpanded } value="item2">
            Expand/Collapse item2
          </button>
          <button type="button" onClick={ handleToggleExpanded } value="item3">
            Expand/Collapse item3
          </button>
          <button type="button" onClick={ handleToggleDisabled } value="item1">
            Enable/Disable item1
          </button>
          <button type="button" onClick={ handleToggleDisabled } value="item2">
            Enable/Disable item2
          </button>
          <button type="button" onClick={ handleToggleDisabled } value="item3">
            Enable/Disable item3
          </button>
        </form>
        <ControlledAccordion contextValue={ contextValue }>
          <AccordionItem id="item1">
            <AccordionHeader>
              Basic Item
            </AccordionHeader>
            <AccordionPanel>
              Hello world!
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem id="item2">
            <AccordionHeader>
              Item With Interactive Elements
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
          </AccordionItem>
          <AccordionItem id="item3">
            <AccordionHeader>
              Item With Nested Accordion
            </AccordionHeader>
            <AccordionPanel>
              <Accordion headerLevel={ 2 }>
                <AccordionItem id="nested-item1">
                  <AccordionHeader>
                    Basic Item
                  </AccordionHeader>
                  <AccordionPanel>
                    Hello world!
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem id="nested-item2">
                  <AccordionHeader>
                    Item With Interactive Elements
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
                </AccordionItem>
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        </ControlledAccordion>
      </>
    );
  },
};

export default meta;
