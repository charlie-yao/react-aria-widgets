import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';
import MenuItemCheckbox from 'src/Menu/MenuItemCheckbox';
import MenuItemSeparator from 'src/Menu/MenuItemSeparator';
import MenuItemRadioGroup from 'src/Menu/MenuItemRadioGroup';
import MenuItemRadio from 'src/Menu/MenuItemRadio';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';

class MenuButton extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		items: MENUITEMS_PROPTYPE.isRequired,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal']),
		menuLabel: PropTypes.string,
		menuId: PropTypes.string,
		id: PropTypes.string,
	};

	static defaultProps = {
		orientation: 'vertical',
		menuLabel: undefined,
		menuId: undefined,
		id: undefined,
	};

	constructor(props) {
		super(props);

		const { items } = props;

		this.state = {
			isExpanded: false,
			expandedIndex: undefined,
		};

		this.childItemRefs = [];

		items.forEach(item => {
			const { type, children } = item;

			if(type === 'separator')
				return;
			if(type === 'radiogroup') {
				children.forEach(() => {
					this.childItemRefs.push(React.createRef());
				});
			}
			else
				this.childItemRefs.push(React.createRef());
		});
	}

	//---- Events ----
	onKeyDown = (event) => {
	};

	onChildKeyDown = (event) => {
	};

	//---- Rendering ----
	render() {
		const { children, orientation, menuLabel, menuId, id } = this.props;
		const { isExpanded } = this.state;

		return (
			<Fragment>
				<button
					type="button"
					aria-haspopup="menu"
					aria-controls={ menuId }
					id={ id }
					aria-expanded={ isExpanded }
				>
					{ children }
				</button>
				<Menu
					orientation={ orientation }
					label={ menuLabel }
					labelId={ id }
					id={ menuId }
					className={ isExpanded ? undefined : 'hidden' }
				>
					{ this.renderItems() }
				</Menu>
			</Fragment>
		);
	}

	renderItems = () => {
		/* eslint-disable react/no-array-index-key */

		const { items } = this.props;
		const { expandedIndex } = this.state;
		const itemNodes = [];
		let position = [];
		let flattenedPosition = [];
		let flattenedIndex = 0;

		items.forEach((item, i) => {
			const { type, node, children, orientation, label, labelId, isDisabled } = item;

			if(type === 'item') {
				position = position.slice(0);
				position[0] = i;
				flattenedPosition = flattenedPosition.slice(0);
				flattenedPosition[0] = flattenedIndex;

				itemNodes.push(
					<MenuItem
						key={ i }
						position={ position }
						flattenedPosition={ flattenedPosition }
						onKeyDown={ this.onChildKeyDown }
						isDisabled={ isDisabled }
						ref={ this.childItemRefs[flattenedIndex] }
					>
						{ node }
					</MenuItem>
				);

				flattenedIndex++;
			}
			else if(type === 'menu') {
				position = position.slice(0);
				position[0] = i;
				flattenedPosition = flattenedPosition.slice(0);
				flattenedPosition[0] = flattenedIndex;

				itemNodes.push(
					<ParentMenuItem
						key={ i }
						items={ children }
						position={ position }
						flattenedPosition={ flattenedPosition }
						onKeyDown={ this.onChildKeyDown }
						collapse={ this.collapseChild }
						focusPrevMenubarItem={ this.focusPrevChild }
						focusNextMenubarItem={ this.focusNextChild }
						orientation={ orientation }
						label={ label }
						labelId={ labelId }
						isExpanded={ flattenedIndex === expandedIndex }
						isDisabled={ isDisabled }
						ref={ this.childItemRefs[flattenedIndex] }
					>
						{ node }
					</ParentMenuItem>
				);

				flattenedIndex++;
			}
			else if(type === 'checkbox') {
				position = position.slice(0);
				position[0] = i;
				flattenedPosition = flattenedPosition.slice(0);
				flattenedPosition[0] = flattenedIndex;

				//TODO isChecked?
				itemNodes.push(
					<MenuItemCheckbox
						key={ i }
						position={ position }
						flattenedPosition={ flattenedPosition }
						onKeyDown={ this.onChildKeyDown }
						isDisabled={ isDisabled }
						ref={ this.childItemRefs[flattenedIndex] }
					>
						{ node }
					</MenuItemCheckbox>
				);

				flattenedIndex++;
			}
			else if(type === 'separator') {
				itemNodes.push(
					<MenuItemSeparator
						key={ i }
						onKeyDown={ this.onChildKeyDown }
						orientation={ orientation }
					>
						{ node }
					</MenuItemSeparator>
				);
			}
			else if(type === 'radiogroup') {
				const radioNodes = [];

				children.forEach((radioItem, j) => {
					const { node, isDisabled } = radioItem;

					position = position.slice(0);
					position[0] = i;
					flattenedPosition = flattenedPosition.slice(0);
					flattenedPosition[0] = flattenedIndex;

					//TODO isChecked?
					radioNodes.push(
						<MenuItemRadio
							key={ j }
							subIndex={ j }
							position={ position }
							flattenedPosition={ flattenedPosition }
							onKeyDown={ this.onChildKeyDown }
							isDisabled={ isDisabled }
							ref={ this.childItemRefs[flattenedIndex] }
						>
							{ node }
						</MenuItemRadio>
					);

					flattenedIndex++;
				});

				itemNodes.push(
					<MenuItemRadioGroup
						key={ i }
						label={ label }
						labelId={ labelId }
					>
						{ radioNodes }
					</MenuItemRadioGroup>
				);
			}
		});

		return itemNodes;

		/* eslint-enable react/no-array-index-key */
	};
}

export default MenuButton;
