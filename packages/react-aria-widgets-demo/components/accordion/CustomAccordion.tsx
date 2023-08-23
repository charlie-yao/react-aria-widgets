import { useAccordion, ControlledAccordion } from 'react-aria-widgets/accordion';

//Types
import type { UseAccordionOptions } from 'react-aria-widgets/accordion';
import type { ReactNode } from 'react';

interface CustomAccordionProps extends UseAccordionOptions {
  children?: ReactNode;
}

export default function CustomAccordion({
  children = null,
  ...rest
}: CustomAccordionProps) {
  const contextValue = useAccordion(rest);

  return (
    <ControlledAccordion contextValue={ contextValue }>
      { children }
    </ControlledAccordion>
  );
}
