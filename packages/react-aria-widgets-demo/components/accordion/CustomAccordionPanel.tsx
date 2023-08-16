import { useAccordionContext } from 'react-aria-widgets/accordion';

//Types
import type { ReactNode } from 'react';

interface CustomAccordionPanelProps {
  children?: ReactNode;
  id: string;
}

export default function CustomAccordionPanel({
  children = null,
  id,
}: CustomAccordionPanelProps) {
  const { getIsExpanded } = useAccordionContext();
  const isExpanded = getIsExpanded(id);

  return (
    <section
      id={ `${id}-panel` }
      aria-labelledby={ id }
      className={ `my-accordion-panel ${isExpanded ? 'expanded' : 'collapsed'}` }
    >
      { children }
    </section>
  );
}
