import React from 'react';
import { render, screen } from '@testing-library/react';

//Components
import BaseAccordionHeader from '../components/BaseAccordionHeader';

describe('BaseAccordionHeader structure', () => {
  beforeEach(() => {
    render(<TestBaseAccordionHeader />);
  });

  test('there is an element with a heading role', () => {
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });

  test('the element with a heading role contains a button', () => {
    const heading = screen.getByRole('heading');
    const button = screen.getByRole('button');
    expect(heading).toContainElement(button);
  });

  test('the button is the only element within the heading', () => {
    const heading = screen.getByRole('heading');
    expect(heading.children).toHaveLength(1);
    expect(heading.children[0].tagName).toBe('BUTTON');
  });
  
  test('the title of the accordion header is contained in the button', () => {
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Test Header');
  });
});

function TestBaseAccordionHeader() {
  return (
    <BaseAccordionHeader
      headerLevel={ 1 }
      onClick={ () => {} }
      aria-controls=""
      aria-disabled={ false }
      aria-expanded={ false }
    >
      Test Header
    </BaseAccordionHeader>
  );
}
