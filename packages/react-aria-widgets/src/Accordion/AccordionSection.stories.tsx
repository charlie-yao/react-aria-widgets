import React, { Fragment } from 'react';

//Components
import Accordion from 'src/Accordion/Accordion';
import AccordionSection from 'src/Accordion/AccordionSection';
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

export default {
  title: 'Accordion/AccordionSection',
  component: AccordionSection,
  args: {
    id: 'accordionId',
  },
  decorators: [
    (story) => (
      <Accordion headerLevel={ 2 }>
        { story() }
      </Accordion>
    ),
  ],
};

function Template(args) {
  return <AccordionSection { ...args } />;
}

export const Default = Template.bind({});
Default.args = {
  children: [
    (
      <AccordionHeader key={ 0 }>
        Header
      </AccordionHeader>
    ),
    (
      <AccordionPanel key={ 1 }>
        Hello world!
      </AccordionPanel>
    ),
  ],
};

export const RenderFunction = Template.bind({});
RenderFunction.args = {
  children: (args) => {
    const {
      id,
      index,
      headerLevel,
      getIsExpanded,
      getIsDisabled,
      setHeaderRef,
      onClick,
      onKeyDown,
    } = args;

    return (
      <Fragment>
        <AccordionHeader
          id={ id }
          index={ index }
          headerLevel={ headerLevel }
          setHeaderRef={ setHeaderRef }
          onClick={ onClick }
          onKeyDown={ onKeyDown }
          getIsExpanded={ getIsExpanded }
          getIsDisabled={ getIsDisabled }
        >
          Header
        </AccordionHeader>
        <AccordionPanel id={ id } getIsExpanded={ getIsExpanded }>
          Hello world!
        </AccordionPanel>
      </Fragment>
    );
  },
};
