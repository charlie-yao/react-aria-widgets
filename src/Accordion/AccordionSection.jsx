import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

//Components and Styles
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//HOCs
import { createNoOpHOC } from 'src/utils';

class AccordionSection extends React.Component {
	static propTypes = {
		index: PropTypes.number.isRequired,
		onTriggerClick: PropTypes.func.isRequired,
		onTriggerKeyDown: PropTypes.func.isRequired,
		id: PropTypes.string,
	};

	static defaultProps = {
		id: undefined,
	};

	constructor(props) {
		super(props);

		const { id } = props;

		this.state = {
			prevIdProp: id,
			id: id ? id : uuidv4(),
		};
	}

	//---- React Lifecycle Methods ----
	static getDerivedStateFromProps(props, state) {
		const { id } = props;
		const { prevIdProp } = state;

		if(id !== prevIdProp) {
			return {
				prevIdProp: id,
				id: id ? id : uuidv4(),
			};
		}
		else
			return null;
	}

	//---- Rendering ----
	render() {
		const { children, index, onTriggerClick, onTriggerKeyDown } = this.props;
		const { id } = this.state;
		const section = React.Children.map(children, (child) => {
			const { type, props } = child;

			if(type === AccordionHeader) {
				return React.cloneElement(child, {
					index,
					onClick: onTriggerClick,
					onKeyDown: onTriggerKeyDown,
					id,
				});
			}
			else if(type === AccordionPanel) {
				return React.cloneElement(child, {
					id,
				});
			}
			else
				throw new Error('Only <AccordionHeader> and <AccordionPanel> are valid children of <AccordionSection>.');
		});

		return section;
	}
}

export default createNoOpHOC(AccordionSection);
