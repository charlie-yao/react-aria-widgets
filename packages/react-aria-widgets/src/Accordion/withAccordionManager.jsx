/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

export default function withAccordionManager(Component) {
	return class AccordionManager extends React.Component {
		static propTypes = {
			allowMultiple: PropTypes.bool,
			allowToggle: PropTypes.bool,
		};

		static defaultProps = {
			allowMultiple: true,
			allowToggle: true,
		};

		constructor(props) {
			super(props);

			this.state = {
				expandedSections: new Set(),
			};

			this.sectionRefs = [];
		}

		//---- Rendering ----
		render() {
			const { allowMultiple, allowToggle: atIgnored, ...rest } = this.props;

			return (
				<Component
					allowMultiple={ allowMultiple }
					allowToggle={ this.getAllowToggle() }
					getIsExpanded={ this.getIsExpanded }
					getIsDisabled={ this.getIsDisabled }
					toggleSection={ this.toggleSection }
					setSectionRef={ this.setSectionRef }
					focusSection={ this.focusSection }
					focusPrevSection={ this.focusPrevSection }
					focusNextSection={ this.focusNextSection }
					focusFirstSection={ this.focusFirstSection }
					focusLastSection={ this.focusLastSection }
					{ ...rest }
				/>
			);
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

		getIsExpanded = (id) => {
			const { expandedSections } = this.state;
			return expandedSections.has(id);
		};

		getIsDisabled = (id) => {
			return !this.getAllowToggle() && this.getIsExpanded(id);
		};

		toggleSection = (id) => {
			const { allowMultiple } = this.props;
			const allowToggle = this.getAllowToggle();
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

		setSectionRef = (ref) => {
			this.sectionRefs.push(ref);
		};

		focusSection = (index) => {
			this.sectionRefs[index].focus();
		};

		focusPrevSection = (index) => {
			this.focusSection(index === 0 ? this.sectionRefs.length - 1 : index - 1);
		};

		focusNextSection = (index) => {
			this.focusSection(index === this.sectionRefs.length - 1 ? 0 : index + 1);
		};

		focusFirstSection = () => {
			this.focusSection(0);
		};

		focusLastSection = () => {
			this.focusSection(this.sectionRefs.length - 1);
		};
	};
}
