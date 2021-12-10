/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

function createAccordionManager(Component) {
	return class AccordionHOC extends React.Component {
		static propTypes = {
			sections: PropTypes.arrayOf(PropTypes.shape({
				id: PropTypes.string.isRequired,
				header: PropTypes.node.isRequired,
				panel: PropTypes.node.isRequired,
			})).isRequired,
			allowMultiple: PropTypes.bool,
			allowToggle: PropTypes.bool,
		};

		static defaultProps = {
			allowMultiple: true,
			allowToggle: true,
		};

		constructor(props) {
			super(props);

			const { sections } = props;

			this.state = {
				expandedSections: new Set(),
			};

			this.triggerRefs = [];

			sections.forEach((section, i) => {
				this.triggerRefs[i] = React.createRef();
			});
		}

		//---- Events ----
		onTriggerKeyDown = (event) => {
			const { sections } = this.props;
			const { key } = event;
			const index = Number.parseInt(event.target.dataset.index, 10);

			switch(key) {
				case 'ArrowUp':
					event.preventDefault();

					if(index === 0)
						this.triggerRefs[sections.length - 1].current.focus();
					else
						this.triggerRefs[index - 1].current.focus();

					break;
				case 'ArrowDown':
					event.preventDefault();

					if(index === sections.length - 1)
						this.triggerRefs[0].current.focus();
					else
						this.triggerRefs[index + 1].current.focus();

					break;
				case 'Home':
					event.preventDefault();
					this.triggerRefs[0].current.focus();
					break;
				case 'End':
					event.preventDefault();
					this.triggerRefs[sections.length - 1].current.focus();
					break;
			}
		};

		//---- Rendering ----
		render() {
			const { expandedSections } = this.state;

			return (
				<Component
					toggleSection={ this.toggleSection }
					onTriggerKeyDown={ this.onTriggerKeyDown }
					getAllowToggle={ this.getAllowToggle }
					triggerRefs={ this.triggerRefs }
					expandedSections={ expandedSections }
					{ ...this.props }
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
