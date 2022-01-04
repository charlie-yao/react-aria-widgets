import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';
import MenuItem from 'src/Menu/MenuItem';

//Misc.
import { MENU_ITEMS_PROPTYPE, REF_PROPTYPE } from 'src/utils/propTypes';
import { renderItem, renderMenuItem, renderParentMenuItem } from 'src/Menu/utils';

class _ParentMenuItem extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		items: MENU_ITEMS_PROPTYPE.isRequired,
		onKeyDown: PropTypes.func.isRequired,
		position: PropTypes.arrayOf(PropTypes.number).isRequired,
		forwardedRef: REF_PROPTYPE.isRequired,
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

		this.itemRefs = items.map(() => React.createRef());
	}

	//---- Events ----
	onItemKeyDown = (event) => {
		
	};

	//---- Rendering ----
	render() {
		const {
			children, items, isExpanded, isDisabled, isTabbable,
			orientation, renderItem, onKeyDown, position, forwardedRef,
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
					data-position={ position.toString() }
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
		const { position } = this.props;
		const { node, type, isDisabled, children, isExpanded, isTabbable, orientation } = item;

		if(type === 'menuitem') {
			return (
				<MenuItem
					key={ index }
					position={ position }
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
					position={ position }
					items={ children }
					orientation={ orientation }
					ref={ this.itemRefs[index] }
					onKeyDown={ this.onItemKeyDown }
					isExpanded={ isExpanded }
					isDisabled={ isDisabled }
					isTabbable={ isTabbable }
				>
					{ node }
				</ParentMenuItem>
			);
		}
	};
}

const ParentMenuItem = React.forwardRef((props, ref) => {
	return <_ParentMenuItem {...props} forwardedRef={ ref } />;
});

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
