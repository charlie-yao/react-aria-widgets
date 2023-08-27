import React from 'react';
import { render, screen } from '@testing-library/react';

//Components
import Accordion from '../components/Accordion';
import AccordionItem from '../components/AccordionItem';
import AccordionHeader from '../components/AccordionHeader';
import AccordionPanel from '../components/AccordionPanel';

//Types
import type { AccordionProps } from '../components/Accordion';
import type { RenderResult } from '@testing-library/react';

const ITEMS = [ 'item1', 'item2', 'item3' ];

describe('common Accordion functionality', () => {
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = render(<BasicAccordion headerLevel={ 1 } />);
  });

  it('initializes with all items collapsed', () => {
    const headers = screen.getAllByRole('heading');
    const buttons = screen.getAllByRole('button');
    const panels = screen.getAllByRole('region');

    headers.forEach(header => {
      expect(header).toHaveAttribute('data-expanded', 'false');
    });

    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    panels.forEach(panel => {
      expect(panel).toHaveAttribute('data-expanded', 'false');
    });
  });

  it('initializes with all items enabled', () => {
  });

});

describe('with allowMultiple === true and allowCollapseLast === true', () => {
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = render(<BasicAccordion headerLevel={ 1 } />);
  });
});

function BasicAccordion(props: AccordionProps) {
  return (
    <Accordion { ...props }>
      { ITEMS.map((id, index) => (
        <AccordionItem key={ id } id={ id }>
          <AccordionHeader>
            Accordion Item { index }
          </AccordionHeader>
          <AccordionPanel>
            { id }
          </AccordionPanel>
        </AccordionItem>
      )) }
    </Accordion>
  );
}
