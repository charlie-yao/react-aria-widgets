/* eslint-disable operator-linebreak */

export const basicAccordionExample =
`import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

export default function BasicAccordion() {
  return (
    <Accordion headerLevel={ 5 }>
      <AccordionSection id="basic-section1">
        <AccordionHeader>
          BasicAccordion - Section 1
        </AccordionHeader>
        <AccordionPanel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor lorem eu blandit
          placerat. Nam interdum metus id molestie elementum. Aenean lorem eros, facilisis eu sem
          in, porttitor vestibulum massa. Phasellus tempus condimentum hendrerit. Vestibulum sagittis
          metus arcu, id ultrices tellus cursus nec. In sit amet purus sed dolor tempus condimentum.
          Curabitur in sapien ex. Cras condimentum quam in facilisis dictum. Mauris eu pulvinar massa.
          Nulla facilisis et tellus ut pretium.
        </AccordionPanel>
      </AccordionSection>
      <AccordionSection id="basic-section2">
        <AccordionHeader>
          BasicAccordion - Section 2
        </AccordionHeader>
        <AccordionPanel>
          Vestibulum vestibulum finibus enim, et rutrum nibh fringilla at. Sed varius purus at
          vestibulum finibus. Nunc interdum neque vitae viverra faucibus. Nullam erat dui, iaculis
          sed libero eu, hendrerit volutpat nunc. Vestibulum vitae porttitor turpis. Donec consectetur
          a tellus vitae mollis. Phasellus egestas blandit purus. Duis tempus, nunc vel mollis efficitur,
          urna mauris condimentum lectus, ac porttitor orci lorem nec leo. Sed augue metus, laoreet in
          neque eu, pulvinar dignissim nulla. Nulla facilisi. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae;
        </AccordionPanel>
      </AccordionSection>
      <AccordionSection id="basic-section3">
        <AccordionHeader>
          BasicAccordion - Section 3
        </AccordionHeader>
        <AccordionPanel>
          Curabitur tempus vulputate massa imperdiet feugiat. Aenean eleifend lectus quis lorem
          condimentum aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Quisque rhoncus auctor eros a congue. Nullam interdum id nisl id
          cursus. Quisque et lobortis nisl. Integer pretium lorem lectus, vel imperdiet diam hendrerit
          in. Sed ac enim pretium, laoreet sem quis, viverra lectus. Sed sagittis faucibus tellus semper
          molestie. Aliquam in magna est. Suspendisse at pellentesque augue, facilisis accumsan est.
          Ut iaculis turpis nec gravida consectetur.
        </AccordionPanel>
      </AccordionSection>
    </Accordion>
  );
}`;

export const disableMultipleExample =
`import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

export default function DisableMultipleAccordion() {
  return (
    <Accordion headerLevel={ 6 } allowMultiple={ false }>
      <AccordionSection id="disable-multiple-section1">
        <AccordionHeader>
          DisableMultipleAccordion - Section 1
        </AccordionHeader>
        <AccordionPanel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor lorem eu blandit
          placerat. Nam interdum metus id molestie elementum. Aenean lorem eros, facilisis eu sem
          in, porttitor vestibulum massa. Phasellus tempus condimentum hendrerit. Vestibulum sagittis
          metus arcu, id ultrices tellus cursus nec. In sit amet purus sed dolor tempus condimentum.
          Curabitur in sapien ex. Cras condimentum quam in facilisis dictum. Mauris eu pulvinar massa.
          Nulla facilisis et tellus ut pretium.
        </AccordionPanel>
      </AccordionSection>
      <AccordionSection id="disable-multiple-section2">
        <AccordionHeader>
          DisableMultipleAccordion - Section 2
        </AccordionHeader>
        <AccordionPanel>
          Vestibulum vestibulum finibus enim, et rutrum nibh fringilla at. Sed varius purus at
          vestibulum finibus. Nunc interdum neque vitae viverra faucibus. Nullam erat dui, iaculis
          sed libero eu, hendrerit volutpat nunc. Vestibulum vitae porttitor turpis. Donec consectetur
          a tellus vitae mollis. Phasellus egestas blandit purus. Duis tempus, nunc vel mollis efficitur,
          urna mauris condimentum lectus, ac porttitor orci lorem nec leo. Sed augue metus, laoreet in
          neque eu, pulvinar dignissim nulla. Nulla facilisi. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae;
        </AccordionPanel>
      </AccordionSection>
      <AccordionSection id="disable-multiple-section3">
        <AccordionHeader>
          DisableMultipleAccordion - Section 3
        </AccordionHeader>
        <AccordionPanel>
          Curabitur tempus vulputate massa imperdiet feugiat. Aenean eleifend lectus quis lorem
          condimentum aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Quisque rhoncus auctor eros a congue. Nullam interdum id nisl id
          cursus. Quisque et lobortis nisl. Integer pretium lorem lectus, vel imperdiet diam hendrerit
          in. Sed ac enim pretium, laoreet sem quis, viverra lectus. Sed sagittis faucibus tellus semper
          molestie. Aliquam in magna est. Suspendisse at pellentesque augue, facilisis accumsan est.
          Ut iaculis turpis nec gravida consectetur.
        </AccordionPanel>
      </AccordionSection>
    </Accordion>
  );
}`;

export const disableToggleExample =
`import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

export default function DisableToggleAccordion() {
  return (
    <Accordion headerLevel={ 6 } allowMultiple={ false } allowToggle={ false }>
      <AccordionSection id="disable-toggle-section1">
        <AccordionHeader>
          DisableToggleAccordion - Section 1
        </AccordionHeader>
        <AccordionPanel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor lorem eu blandit
          placerat. Nam interdum metus id molestie elementum. Aenean lorem eros, facilisis eu sem
          in, porttitor vestibulum massa. Phasellus tempus condimentum hendrerit. Vestibulum sagittis
          metus arcu, id ultrices tellus cursus nec. In sit amet purus sed dolor tempus condimentum.
          Curabitur in sapien ex. Cras condimentum quam in facilisis dictum. Mauris eu pulvinar massa.
          Nulla facilisis et tellus ut pretium.
        </AccordionPanel>
      </AccordionSection>
      <AccordionSection id="disable-toggle-section2">
        <AccordionHeader>
          DisableToggleAccordion - Section 2
        </AccordionHeader>
        <AccordionPanel>
          Vestibulum vestibulum finibus enim, et rutrum nibh fringilla at. Sed varius purus at
          vestibulum finibus. Nunc interdum neque vitae viverra faucibus. Nullam erat dui, iaculis
          sed libero eu, hendrerit volutpat nunc. Vestibulum vitae porttitor turpis. Donec consectetur
          a tellus vitae mollis. Phasellus egestas blandit purus. Duis tempus, nunc vel mollis efficitur,
          urna mauris condimentum lectus, ac porttitor orci lorem nec leo. Sed augue metus, laoreet in
          neque eu, pulvinar dignissim nulla. Nulla facilisi. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae;
        </AccordionPanel>
      </AccordionSection>
      <AccordionSection id="disable-toggle-section3">
        <AccordionHeader>
          DisableToggleAccordion - Section 3
        </AccordionHeader>
        <AccordionPanel>
          Curabitur tempus vulputate massa imperdiet feugiat. Aenean eleifend lectus quis lorem
          condimentum aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Quisque rhoncus auctor eros a congue. Nullam interdum id nisl id
          cursus. Quisque et lobortis nisl. Integer pretium lorem lectus, vel imperdiet diam hendrerit
          in. Sed ac enim pretium, laoreet sem quis, viverra lectus. Sed sagittis faucibus tellus semper
          molestie. Aliquam in magna est. Suspendisse at pellentesque augue, facilisis accumsan est.
          Ut iaculis turpis nec gravida consectetur.
        </AccordionPanel>
      </AccordionSection>
    </Accordion>
  );
}`;

export const CustomAccordionExample =
`import {
  Accordion,
  AccordionSection,
  AccordionHeader,
  AccordionPanel,
} from 'react-aria-widgets/accordion';

//Components
import StyledAccordionHeader from './StyledAccordionHeader';
import StyledAccordionPanel from './StyledAccordionPanel';
import CustomAccordionHeader from './CustomAccordionHeader';
import CustomAccordionPanel from './CustomAccordionPanel';
import customRenderFunction from './customRenderFunction';

export default function CustomAccordion(props) {
  return (
    <Accordion headerLevel={ 4 }>
      <AccordionSection id="custom-accordion-section1">
        <AccordionHeader
          headerProps={{ className: 'defaultHeaderClass' }}
          buttonProps={{ className: 'defaultButtonClass' }}
        >
          CustomAccordion - Section 1 
        </AccordionHeader>
        <AccordionPanel className="defaultPanelClass">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor lorem eu blandit
          placerat. Nam interdum metus id molestie elementum. Aenean lorem eros, facilisis eu sem
          in, porttitor vestibulum massa. Phasellus tempus condimentum hendrerit. Vestibulum sagittis
          metus arcu, id ultrices tellus cursus nec. In sit amet purus sed dolor tempus condimentum.
          Curabitur in sapien ex. Cras condimentum quam in facilisis dictum. Mauris eu pulvinar massa.
          Nulla facilisis et tellus ut pretium.
        </AccordionPanel>
      </AccordionSection>
      <AccordionSection id="custom-accordion-section2">
        <StyledAccordionHeader>
          CustomAccordion - Section 2
        </StyledAccordionHeader>
        <StyledAccordionPanel>
          Vestibulum vestibulum finibus enim, et rutrum nibh fringilla at. Sed varius purus at
          vestibulum finibus. Nunc interdum neque vitae viverra faucibus. Nullam erat dui, iaculis
          sed libero eu, hendrerit volutpat nunc. Vestibulum vitae porttitor turpis. Donec consectetur
          a tellus vitae mollis. Phasellus egestas blandit purus. Duis tempus, nunc vel mollis efficitur,
          urna mauris condimentum lectus, ac porttitor orci lorem nec leo. Sed augue metus, laoreet in
          neque eu, pulvinar dignissim nulla. Nulla facilisi. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae;
        </StyledAccordionPanel>
      </AccordionSection>
      <AccordionSection id="custom-accordion-section3">
        <CustomAccordionHeader>
          CustomAccordion - Section 3
        </CustomAccordionHeader>
        <CustomAccordionPanel>
          Curabitur tempus vulputate massa imperdiet feugiat. Aenean eleifend lectus quis lorem
          condimentum aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Quisque rhoncus auctor eros a congue. Nullam interdum id nisl id
          cursus. Quisque et lobortis nisl. Integer pretium lorem lectus, vel imperdiet diam hendrerit
          in. Sed ac enim pretium, laoreet sem quis, viverra lectus. Sed sagittis faucibus tellus semper
          molestie. Aliquam in magna est. Suspendisse at pellentesque augue, facilisis accumsan est.
          Ut iaculis turpis nec gravida consectetur.
        </CustomAccordionPanel>
      </AccordionSection>
      <AccordionSection id="custom-accordion-section4">
        { customRenderFunction }
      </AccordionSection>
    </Accordion>
  );
}`;

export const StyledAccordionHeaderExample =
`import React from 'react';
import PropTypes from 'prop-types';
import { AccordionHeader } from 'react-aria-widgets/accordion';

function StyledAccordionHeader(props) {
  const { headerProps, buttonProps, ...rest } = props;
  const { className: suppliedHeaderClass } = headerProps;
  const { className: suppliedButtonClass } = buttonProps;
  
  const _headerProps = Object.assign({}, headerProps, {
    className: \`defaultHeaderClass \${suppliedHeaderClass ? suppliedHeaderClass : ''}\`,
  });

  const _buttonProps = Object.assign({}, headerProps, {
    className: \`defaultButtonClass \${suppliedButtonClass ? suppliedButtonClass : ''}\`,
  });

  return (
    <AccordionHeader
      headerProps={ _headerProps }
      buttonProps={ _buttonProps }
      {...rest}
    />
  );
}

StyledAccordionHeader.propTypes = {
  headerProps: PropTypes.object,
  buttonProps: PropTypes.object,
};

StyledAccordionHeader.defaultProps = {
  headerProps: {},
  buttonProps: {},
};

export default StyledAccordionHeader;`;

export const StyledAccordionPanelExample =
`import React from 'react';
import { AccordionPanel } from 'react-aria-widgets/accordion';

export default function StyledAccordionPanel(props) {
  return (
    <AccordionPanel
      className="defaultPanelClass"
      {...props}
    />
  );
}`;

export const CustomAccordionHeaderExample =
`import React from 'react';
import PropTypes from 'prop-types';
import { BaseAccordionHeader } from 'react-aria-widgets/accordion';

function CustomAccordionHeader(props) {
  const {
    children,
    id,
    index,
    headerLevel,
    setHeaderRef,
    onClick,
    onKeyDown,
    getIsExpanded,
    getIsDisabled,
    headerProps,
    buttonProps,
  } = props;
  const { className: suppliedHeaderClass } = headerProps;
  const { className: suppliedButtonClass } = buttonProps; 
  const isExpanded = getIsExpanded(id);
  const isDisabled = getIsDisabled(id);
  const panelId = \`\${id}-panel\`;
  
  const _headerProps = Object.assign({}, headerProps, {
    className: \`defaultHeaderClass \${suppliedHeaderClass ? suppliedHeaderClass : ''}\`,
  });

  const _buttonProps = Object.assign({}, buttonProps, {
    'data-index': index,
    className: \`defaultButtonClass \${suppliedButtonClass ? suppliedButtonClass: ''}\`,
  });

  return (
    <BaseAccordionHeader
      id={ id }
      controlsId={ panelId }
      headerLevel={ headerLevel }
      onClick={ onClick }
      onKeyDown={ onKeyDown }
      isExpanded={ isExpanded }
      isDisabled={ isDisabled }
      headerProps={ _headerProps }
      buttonProps={ _buttonProps }
      ref={ setHeaderRef }
    >
      { children }
    </BaseAccordionHeader>
  );
}

CustomAccordionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  headerLevel: PropTypes.number.isRequired,
  setHeaderRef: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  getIsExpanded: PropTypes.func.isRequired,
  getIsDisabled: PropTypes.func.isRequired,
  headerProps: PropTypes.object,
  buttonProps: PropTypes.object,
};

CustomAccordionHeader.defaultProps = {
  headerProps: {},
  buttonProps: {},
};

export default CustomAccordionHeader;`;

export const CustomAccordionPanelExample =
`import React from 'react';
import PropTypes from 'prop-types';
import { BaseAccordionPanel } from 'react-aria-widgets/accordion';

function CustomAccordionPanel(props) {
  const {
    children,
    id,
    getIsExpanded,
    className,
    //Pull out the props from <AccordionSection> that shouldn't get passed down
    index,
    headerLevel,
    onClick,
    onKeyDown,
    allowMultiple,
    allowToggle,
    getIsDisabled,
    toggleSection,
    setHeaderRef,
    focusHeader,
    focusPrevHeader,
    focusNextHeader,
    focusFirstHeader,
    focusLastHeader,
    ...rest
  } = props;
  const panelId = \`\${id}-panel\`;
  const isExpanded = getIsExpanded(id);
  const _className = \`defaultPanelClass \${className} \${isExpanded ? '' : 'react-aria-widgets-hidden'}\`;

  return (
    <BaseAccordionPanel
      id={ panelId }
      labelId={ id }
      className={ _className }
      { ...rest }
    >
      { children }
    </BaseAccordionPanel>
  );
}

CustomAccordionPanel.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  getIsExpanded: PropTypes.func.isRequired,
  className: PropTypes.string,
};

CustomAccordionPanel.defaultProps = {
  className: '',
};

export default CustomAccordionPanel;`;

export const customRenderFunctionExample =
`import React from 'react';

export default function renderFunction(props) {
  const {
    id,
    index,
    headerLevel,
    getIsExpanded,
    getIsDisabled,
    setHeaderRef,
    toggleSection,
    focusPrevHeader,
    focusNextHeader,
    focusFirstHeader,
    focusLastHeader,
  } = props;
  const isExpanded = getIsExpanded(id);
  const isDisabled = getIsDisabled(id);
  const HeaderElement = \`h\${headerLevel}\`;
  const contentId = \`\${id}-panel\`;
  const style = {};

  const onClick = () => {
    toggleSection(id);  
  };

  const onKeyDown = (event) => {
    const { key } = event;

    if(key === 'ArrowUp') {
      event.preventDefault();
      focusPrevHeader(index);
    }
    else if(key === 'ArrowDown') {
      event.preventDefault();
      focusNextHeader(index);
    }
    else if(key === 'Home') {
      event.preventDefault();
      focusFirstHeader();
    }
    else if(key === 'End') {
      event.preventDefault();
      focusLastHeader();
    }
  };

  if(!isExpanded)
    style.display = 'none';

  return (
    <> 
      <HeaderElement className="defaultHeaderClass">
        <button
          type="button"
          className="defaultButtonClass"
          id={ id }
          aria-controls={ contentId }
          aria-expanded={ isExpanded }
          aria-disabled={ isDisabled }
          onClick={ onClick }
          onKeyDown={ onKeyDown }
          ref={ setHeaderRef }
        >
          CustomAccordion - Section 4
        </button>
      </HeaderElement>
      <section
        id={ contentId }
        aria-labelledby={ id }
        className="defaultPanelClass"
        style={ style }
      >
        Aenean eu metus sollicitudin, sollicitudin metus vitae, tempor magna.
        Quisque faucibus massa efficitur lorem consectetur, quis sodales nunc pretium.
        Nunc rutrum risus id nisl facilisis, eu gravida ex vestibulum. Curabitur varius auctor
        magna a maximus. Aenean tortor nulla, posuere vitae sollicitudin a, semper vitae nulla.
        Praesent ullamcorper magna vitae dui faucibus, lacinia cursus augue sagittis. Phasellus
        elementum tempor iaculis. Vivamus vehicula ex eu nunc volutpat, in ultrices magna finibus.
        Fusce egestas velit in lobortis vestibulum. Vestibulum sodales venenatis turpis, eu convallis
        nisi suscipit sit amet. Aenean placerat ullamcorper nulla quis varius. In in consectetur
        augue, ac consequat sem. Quisque at ultrices arcu, et aliquam purus. Donec varius justo non
        suscipit fermentum. Etiam a nisl at ipsum imperdiet faucibus.       
      </section>
    </>
  );
}`;
