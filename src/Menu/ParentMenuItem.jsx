import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';
import MenuItem from 'src/Menu/MenuItem';

//Misc.
import { MENU_ITEMS_PROPTYPE, REF_PROPTYPE } from 'src/utils/propTypes';
import { renderItem, renderMenuItem, renderParentMenuItem } from 'src/Menu/utils';

class ParentMenuItem extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		items: MENU_ITEMS_PROPTYPE.isRequired,
		onKeyDown: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		isExpanded: PropTypes.bool,
		isDisabled: PropTypes.bool,
		isTabbable: PropTypes.bool,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
		renderItem: PropTypes.func,
		renderMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
		renderParentMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
	};

	static defaultProps = {
		isExpanded: false,
		isDisabled: false,
		isTabbable: false,
		orientation: 'horizontal',
		renderItem,
		renderMenuItem,
		renderParentMenuItem,
	};

	constructor(props) {
		super(props);

		const { items } = props;

		this.state = {
			expandedIndex: undefined,
		};

		this.itemRefs = items.map(() => React.createRef());
	}

	//---- Events ----
	onItemKeyDown = (event) => {
		const { orientation, items } = this.props;
		const { key, target } = event;
		const index = Number.parseInt(target.dataset.index);
		const item = items[index];

		console.log(index, item, items);

		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();

		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();

		}
		else if(key === 'Enter') {
			event.preventDefault();

		}
		else if(key === ' ' || key === 'Spacebar') {
			event.preventDefault();

		}
		else if(key === 'Home') {
			event.preventDefault();

		}
		else if(key === 'End') {
			event.preventDefault();

		}
		else if(key === 'Escape' || key === 'Esc') {
			event.preventDefault();

		}
		else if(key === 'Tab') {

		}
		else {
			//TODO: Any key that corresponds to a printable character (Optional):
			//Move focus to the next menu item in the current menu whose label begins
			//with that printable character.
		}


	};

	//---- Rendering ----
	render() {
		const {
			children, items, isExpanded, isDisabled, isTabbable,
			orientation, renderItem, onKeyDown, index, forwardedRef,
		} = this.props;
		const itemNodes = items.map(this.renderItem);

		return (
			<li role="none">
				<a
					href="#"
					role="menuitem"
					aria-haspopup="menu"
					aria-expanded={ isExpanded }
					aria-disabled={ isDisabled }
					tabIndex={ isTabbable ? '0' : '-1' }
					ref={ forwardedRef }
					onKeyDown={ onKeyDown }
					data-index={ index }
				>
					{ children }
				</a>
				<Menu orientation={ orientation }>
					{ itemNodes }
				</Menu>
			</li>
		);
	}

	renderItem = (item, index, items) => {
		const { node, type, isDisabled, children, orientation } = item;
		const { expandedIndex } = this.state;

		if(type === 'menuitem') {
			return (
				<MenuItem
					key={ index }
					index={ index }
					ref={ this.itemRefs[index] }
					onKeyDown={ this.onItemKeyDown }
					isDisabled={ isDisabled }
				>
					{ node }
				</MenuItem>
			);
		}
		else if(type === 'parentmenuitem') {
			return (
				<ParentMenuItem
					key={ index }
					index={ index }
					items={ children }
					orientation={ orientation }
					ref={ this.itemRefs[index] }
					onKeyDown={ this.onItemKeyDown }
					isExpanded={ index === expandedIndex }
					isDisabled={ isDisabled }
				>
					{ node }
				</ParentMenuItem>
			);
		}
	};
}

export default ParentMenuItem;

//TODO: this is straying further and further away
//from the idea of a "base" component - might be a good
//idea to separate the opinionated stuff I'm adding on?
/*
const ParentMenuItem = React.forwardRef(function ParentMenuItem(props, ref) {
	const {
		children, items, isExpanded, isDisabled, isTabbable,
		orientation, renderItem, onKeyDown, position,
	} = props;
	const itemNodes = items.map((item, index, _items) => {
		return renderItem(item, index, _items, props, onKeyDown);
	});

	return (
		<li role="none">
			<a
				href="#"
				role="menuitem"
				aria-haspopup="menu"
				aria-expanded={ isExpanded }
				aria-disabled={ isDisabled }
				tabIndex={ isTabbable ? '0' : '-1' }
				ref={ ref }
				onKeyDown={ onKeyDown }
				data-position={ position.toString() }
			>
				{ children }
			</a>
			<Menu orientation={ orientation }>
				{ itemNodes }
			</Menu>
		</li>
	);
});

ParentMenuItem.propTypes = {
	children: PropTypes.node.isRequired,
	items: MENU_ITEMS_PROPTYPE.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
	isExpanded: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isTabbable: PropTypes.bool,
	orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
	renderItem: PropTypes.func,
	renderMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
	renderParentMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
};

ParentMenuItem.defaultProps = {
	isExpanded: false,
	isDisabled: false,
	isTabbable: false,
	orientation: 'horizontal',
	renderItem,
	renderMenuItem,
	renderParentMenuItem,
};

export default ParentMenuItem;
*/
