/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

function createAccordionManager(Component) {
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
			const { allowMultiple: amIgnored, allowToggle: atIgnored, ...rest } = this.props;
			const { expandedSections } = this.state;

			return (
				<Component
					toggleSection={ this.toggleSection }
					getIsExpanded={ this.getIsExpanded }
					getIsDisabled={ this.getIsDisabled }
					setSectionRef={ this.setSectionRef }
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

		toggleSection = (sectionId) => {
			const { allowMultiple } = this.props;
			const allowToggle = this.getAllowToggle();

			this.setState(prevState => {
				const { expandedSections } = prevState;
				const alreadyExpanded = expandedSections.has(sectionId);

				if(allowMultiple) {
					if(alreadyExpanded)
						expandedSections.delete(sectionId);
					else
						expandedSections.add(sectionId);
				}
				else {
					expandedSections.clear();

					if(!alreadyExpanded || (alreadyExpanded && !allowToggle))
						expandedSections.add(sectionId);
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

export default createAccordionManager;
