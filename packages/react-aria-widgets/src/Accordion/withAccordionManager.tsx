/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

interface AccordionManagerProps {
  allowMultiple: boolean;
  allowToggle: boolean;
};

interface AccordionManagerState {
  expandedSections: Set<string>;
};

export interface AccordionManagerConsumerProps extends AccordionManagerProps {
  getIsExpanded: (id: string) => boolean;
  getIsDisabled: (id: string) => boolean;
  toggleSection: (id: string) => void;
  setHeaderRef: (ref: HTMLButtonElement | HTMLElement) => void;
  focusHeader: (index: number) => void;
  focusPrevHeader: (index: number) => void;
  focusNextHeader: (index: number) => void;
  focusFirstHeader: () => void;
  focusLastHeader: () => void;
};

export default function withAccordionManager<P extends AccordionManagerConsumerProps>(Component: React.ComponentType<P>) {
  return class AccordionManager extends React.Component<AccordionManagerProps, AccordionManagerState> {
    sectionRefs: (HTMLButtonElement | HTMLElement)[];

    static propTypes = {
      allowMultiple: PropTypes.bool,
      allowToggle: PropTypes.bool,
    };

    static defaultProps = {
      allowMultiple: true,
      allowToggle: true,
    };

    constructor(props: AccordionManagerProps) {
      super(props);

      this.state = {
        expandedSections: new Set(),
      };

      this.sectionRefs = [];
    }

    //---- Rendering ----
    render() {
      const { allowMultiple, allowToggle: atIgnored, ...rest } = this.props;
      const props = {
        allowMultiple,
        allowToggle: this.getAllowToggle(),
        getIsExpanded: this.getIsExpanded,
        getIsDisabled: this.getIsDisabled,
        toggleSection: this.toggleSection,
        setHeaderRef: this.setHeaderRef,
        focusHeader: this.focusHeader,
        focusPrevHeader: this.focusPrevHeader,
        focusNextHeader: this.focusNextHeader,
        focusFirstHeader: this.focusFirstHeader,
        focusLastHeader: this.focusLastHeader,
        ...rest
      } as P;

      return <Component { ...props } />;
    }

    //---- Misc. ----
    getAllowToggle = () => {
      //Even though this component accepts allowMultiple and allowToggle
      //as independent props, the case of allowMultiple && !allowToggle
      //doesn't make much sense because we'd end up in a situation where
      //multiple accordion sections are expanded with no way of closing them.
      const { allowToggle, allowMultiple } = this.props;
      return allowMultiple ? true : allowToggle;
    };

    getIsExpanded = (id: string) => {
      const { expandedSections } = this.state;
      return expandedSections.has(id);
    };

    getIsDisabled = (id: string) => {
      return !this.getAllowToggle() && this.getIsExpanded(id);
    };

    toggleSection = (id: string) => {
      const { allowMultiple } = this.props;
      const isExpanded = this.getIsExpanded(id);
      const isDisabled = this.getIsDisabled(id);

      this.setState(prevState => {
        const { expandedSections } = prevState;

        if(allowMultiple) {
          if(isExpanded)
            expandedSections.delete(id);
          else
            expandedSections.add(id);
        }
        else {
          expandedSections.clear();

          //Expand the section if it was originally collapsed,
          //or if it shouldn't have been collapsed as a result
          //of the indiscriminate call to clear() that we just made.
          if(!isExpanded || isDisabled)
            expandedSections.add(id);
        }

        return {
          expandedSections,
        };
      });
    };

    setHeaderRef = (ref: HTMLButtonElement | HTMLElement) => {
      this.sectionRefs.push(ref);
    };

    focusHeader = (index: number) => {
      this.sectionRefs[index].focus();
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
