import React from 'react';
import { render, screen } from '@testing-library/react';

//Components
import Accordion from '../components/Accordion';
import AccordionItem from '../components/AccordionItem';
import AccordionHeader from '../components/AccordionHeader';

//Misc.
import { DEFAULT_ACCORDION_HEADER_ELEMENT_CSS_CLASS, DEFAULT_ACCORDION_BUTTON_ELEMENT_CSS_CLASS } from '../utils';

//Types
import type { AccordionHeaderProps } from '../components/AccordionHeader';

describe('AccordionHeader', () => {
  test('use the default header class if `headerProps` has no `className`', () => {
    const { rerender } = render(<TestAccordion />);
    let heading = screen.getByRole('heading');
    expect(heading).toHaveClass(DEFAULT_ACCORDION_HEADER_ELEMENT_CSS_CLASS);

    rerender(<TestAccordion headerProps={{ 'data-irrelevant': 'hello-world' }} />);
    heading = screen.getByRole('heading');
    expect(heading).toHaveClass(DEFAULT_ACCORDION_HEADER_ELEMENT_CSS_CLASS);
  });

  test('use the default button class if `buttonProps` has no `className`', () => {
    const { rerender } = render(<TestAccordion />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass(DEFAULT_ACCORDION_BUTTON_ELEMENT_CSS_CLASS);

    rerender(<TestAccordion buttonProps={{ 'data-irrelevant': 'hello-world' }} />);
    button = screen.getByRole('button');
    expect(button).toHaveClass(DEFAULT_ACCORDION_BUTTON_ELEMENT_CSS_CLASS);
  });

  test('use the supplied `className` string in headerProps or buttonProps', () => {
    render(
      <TestAccordion
        headerProps={{ className: 'headerClass' }}
        buttonProps={{ className: 'buttonClass' }}
      />
    );

    const header = screen.getByRole('heading');
    const button = screen.getByRole('button');

    expect(header).toHaveClass('headerClass');
    expect(button).toHaveClass('buttonClass');
  });
});

function TestAccordion(props: AccordionHeaderProps) {
  return (
    <Accordion headerLevel={ 1 }>
      <AccordionItem id="item1">
        <AccordionHeader { ...props }>
          Test Header 1
        </AccordionHeader>
      </AccordionItem>
    </Accordion>
  );
}
