import { useAccordionContext } from 'react-aria-widgets/accordion';

//Types
import { ReactNode, ElementType, MouseEventHandler, KeyboardEventHandler } from 'react';

interface CustomAccordionHeaderProps {
  children?: ReactNode;
  id: string;
}

export default function CustomAccordionHeader({
  children = null,
  id
}: CustomAccordionHeaderProps) {
  const {
    headerLevel,
    getIsExpanded,
    getIsDisabled,
    toggleExpanded,
    pushItemRef,
    focusPrevItem,
    focusNextItem,
    focusFirstItem,
    focusLastItem,
  } = useAccordionContext();
  const HeaderElement: ElementType = `h${headerLevel}`;
  const isExpanded = getIsExpanded(id);
  const isDisabled = getIsDisabled(id);

  const refCallback = (ref: HTMLButtonElement) => {
    pushItemRef(ref, id);
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    toggleExpanded(id);
  };

  const onKeyDown: KeyboardEventHandler<HTMLButtonElement> = (event) => {
    const { key } = event;

    if(key === 'ArrowUp') {
      event.preventDefault();
      focusPrevItem(id);
    }
    else if(key === 'ArrowDown') {
      event.preventDefault();
      focusNextItem(id);
    }
    else if(key === 'Home') {
      event.preventDefault();
      focusFirstItem();
    }
    else if(key === 'End') {
      event.preventDefault();
      focusLastItem();
    }
  };

  return (
    <HeaderElement className="my-accordion-header">
      <button
        type="button"
        className="my-accordion-button"
        id={ id }
        onClick={ onClick }
        onKeyDown={ onKeyDown }
        aria-controls={ `${id}-panel` }
        aria-expanded={ isExpanded }
        aria-disabled={ isDisabled }
        ref={ refCallback }
      >
        { children }
      </button>
    </HeaderElement>
  );
}
