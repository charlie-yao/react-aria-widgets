/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Types
import type {
  HeaderRef,
  SetHeaderRef,
  AccordionManagerConsumerProps,
  AccordionManagerProps,
} from 'src/Accordion/types';

export default function withAccordionManager<P extends AccordionManagerConsumerProps>(Component: React.ComponentType<P>) {
  return class AccordionManager extends React.Component<Omit<P, keyof AccordionManagerConsumerProps> & AccordionManagerProps> {
    //---- Static Fields ----
    static propTypes = {
      allowMultiple: PropTypes.bool,
      allowToggle: PropTypes.bool,
    };

    static defaultProps = {
      allowMultiple: true,
      allowToggle: true,
    };

    //---- Fields ----
    sectionRefs: HeaderRef[] = [];

    //---- Rendering ----
    render() {
      const { allowMultiple, allowToggle, ...rest } = this.props;
      const props = {
        allowMultiple,
        allowToggle,
        setHeaderRef: this.setHeaderRef,
        focusHeader: this.focusHeader,
        focusPrevHeader: this.focusPrevHeader,
        focusNextHeader: this.focusNextHeader,
        focusFirstHeader: this.focusFirstHeader,
        focusLastHeader: this.focusLastHeader,
        ...rest,
      } as P;

      return <Component { ...props } />;
    }

    //---- Methods ----
    setHeaderRef: SetHeaderRef = (ref) => {
      this.sectionRefs.push(ref);
    };

    focusHeader = (index: number) => {
      const ref = this.sectionRefs[index];

      if(!ref)
        return;

      ref.focus();
    };

    focusPrevHeader = (index: number) => {
      this.focusHeader(index === 0 ? this.sectionRefs.length - 1 : index - 1);
    };

    focusNextHeader = (index: number) => {
      this.focusHeader(index === this.sectionRefs.length - 1 ? 0 : index + 1);
    };

    focusFirstHeader = () => {
      this.focusHeader(0);
    };

    focusLastHeader = () => {
      this.focusHeader(this.sectionRefs.length - 1);
    };
  };
}
