/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

function createAccordionManager(Component) {
	return class AccordionHOC extends React.Component {
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
		}

		//---- Rendering ----
		render() {
			const { allowMultiple: amIgnored, allowToggle: atIgnored, ...rest } = this.props;
			const { expandedSections } = this.state;

			return (
				<Component
					toggleSection={ this.toggleSection }
					allowToggle={ this.getAllowToggle() }
					expandedSections={ expandedSections }
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
	};
}

export default createAccordionManager;
