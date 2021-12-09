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

			this.state = {};
			this.triggerRefs = [];

			sections.forEach((section, i) => {
				const { id } = section;
				const isExpandedKey = this.getIsExpandedKey(id);

				this.state[isExpandedKey] = false;
				this.triggerRefs[i] = React.createRef();
			});
		}

		//---- Events ----
		onTriggerClick = (event) => {
			const { allowMultiple, sections } = this.props;
			const allowToggle = this.getAllowToggle();
			const index = Number.parseInt(event.target.dataset.index, 10);

			if(allowMultiple) {
				this.setState(prevState => {
					const section = sections[index];
					const { id } = section;
					const isExpandedKey = this.getIsExpandedKey(id);

					return {
						[isExpandedKey]: !prevState[isExpandedKey],
					};
				});
			}
			else {
				this.setState(prevState => {
					const newState = {};

					sections.forEach((section, i) => {
						const { id } = section;
						const isExpandedKey = this.getIsExpandedKey(id);
						let isExpanded;

						if(i === index)
							isExpanded = allowToggle ? !prevState[isExpandedKey] : true;
						else
							isExpanded = false;

						newState[isExpandedKey] = isExpanded;
					});

					return Object.assign({}, prevState, newState);
				});
			}
		};

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
			return (
				<Component
					onTriggerClick={ this.onTriggerClick }
					onTriggerKeyDown={ this.onTriggerKeyDown }
					getAllowToggle={ this.getAllowToggle }
					getIsExpandedKey={ this.getIsExpandedKey }
					triggerRefs={ this.triggerRefs }
					{ ...this.state }
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

		getIsExpandedKey = (sectionId) => {
			return `is${sectionId}Expanded`;
		};
	};
}

export default createAccordionManager;
