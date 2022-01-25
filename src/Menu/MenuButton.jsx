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
		const { key } = event;
		
		//TODO" should we account for menu orientation when doing arrow keys?
		if(key === 'Enter' || key === ' ' || key === 'Spacebar') {
			event.preventDefault();

			this.setState({
				isExpanded: true,
			}, () => {
				this.childItemRefs[0].current.focus();
			});
		}
		else if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			this.setState({
				isExpanded: true,
			}, () => {
				this.childItemRefs[this.childItemRefs.length - 1].current.focus();
			});
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			this.setState({
				isExpanded: true,
			}, () => {
				this.childItemRefs[0].current.focus();
			});
		}
	};

	onChildKeyDown = (event) => {
		const { items, orientation } = this.props;
		const { key, target } = event;
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const item = items[index];
		const { type } = item;

		//console.log(position, flattenedPosition, index, flattenedIndex, item);

		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			if(orientation === 'horizontal') {
				if(type === 'menu') {
					this.expandChild(flattenedIndex, () => {
						this.childItemRefs[flattenedIndex].current.focusLastChild();
					});
				}
			}
			else
				this.focusPrevChild(flattenedIndex);
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			if(orientation === 'horizontal') {
				if(type === 'menu') {
					this.expandChild(flattenedIndex, () => {
						this.childItemRefs[flattenedIndex].current.focusFirstChild();
					});
				}
			}
			else
				this.focusNextChild(flattenedIndex);
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();

			if(orientation === 'horizontal')
				this.focusPrevChild(flattenedIndex);
			else {
				if(type === 'menu') {
					this.expandChild(flattenedIndex, () => {
						this.childItemRefs[flattenedIndex].current.focusLastChild();
					});
				}
			}
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();

			if(orientation === 'horizontal')
				this.focusNextChild(flattenedIndex);
			else {
				if(type === 'menu') {
					this.expandChild(flattenedIndex, () => {
						this.childItemRefs[flattenedIndex].current.focusFirstChild();
					});
				}
			}
		}
		else if(key === 'Enter') {
			event.preventDefault();

			if(type === 'menu') {
				this.expandChild(flattenedIndex, () => {
					this.childItemRefs[flattenedIndex].current.focusFirstChild();
				});
			}
			else {
				//TODO activate the item and close the (whole?) menu
			}
		}
		else if(key === ' ' || key === 'Spacebar') {
			event.preventDefault();

			if(type === 'menu') {
				this.expandChild(flattenedIndex, () => {
					this.childItemRefs[flattenedIndex].current.focusFirstChild();
				});
			}
			else if(type === 'checkbox') {
				//TODO change state without closing the menu
			}
			else if(type === 'radiogroup') {
				//TODO change state without closing the menu
			}
			else if(type === 'item') {
				//TODO activate the item and close the (whole?) menu
			}
		}
		else if(key === 'Home') {
			event.preventDefault();
			this.focusFirstChild();
		}
		else if(key === 'End') {
			event.preventDefault();
			this.focusLastChild();
		}
		else if(key === 'Tab')
			this.collapseChild();
		else {
			//TODO: Any key that corresponds to a printable character (Optional):
			//Move focus to the next menu item in the current menu whose label begins
			//with that printable character.
		}
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
					onKeyDown={ this.onKeyDown }
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

	//---- Misc. ----
	collapseChild = (collapseAll, callback) => {
		this.setState({
			expandedIndex: undefined,
		}, () => {
			if(typeof callback === 'function')
				callback();
		});
	};

	expandChild = (flattenedIndex, callback) => {
		this.setState({
			expandedIndex: flattenedIndex,
		}, () => {
			if(typeof callback === 'function')
				callback();
		});
	};

	focusPrevChild = (flattenedIndex, autoExpand = false) => {
		const prevIndex = flattenedIndex === 0 ? this.childItemRefs.length - 1 : flattenedIndex - 1;
		const prevRef = this.childItemRefs[prevIndex];

		this.setState(state => {
			const { expandedIndex } = state;
			const wasExpanded = expandedIndex !== undefined && expandedIndex !== null;
			const _autoExpand = prevRef.current instanceof ParentMenuItem && (wasExpanded || autoExpand);

			//TODO would be nice if there was a better way to map ref indices to item indices
			//and vice-versa, checking instanceof ParentMenuItem almost feels sort of abusive
			//wrt using refs
			return {
				tabbableIndex: prevIndex,
				expandedIndex: _autoExpand ? prevIndex : undefined,
			};
		}, () => {
			prevRef.current.focus();
		});
	};

	focusNextChild = (flattenedIndex, autoExpand = false) => {
		const nextIndex = flattenedIndex === this.childItemRefs.length - 1 ? 0 : flattenedIndex + 1;
		const nextRef = this.childItemRefs[nextIndex];

		this.setState(state => {
			const { expandedIndex } = state;
			const wasExpanded = expandedIndex !== undefined && expandedIndex !== null;
			const _autoExpand = nextRef.current instanceof ParentMenuItem && (wasExpanded || autoExpand);

			return {
				tabbableIndex: nextIndex,
				expandedIndex: _autoExpand ? nextIndex : undefined,
			};
		}, () => {
			nextRef.current.focus();
		});
	};

	focusFirstChild = () => {
		this.focusNextChild(this.childItemRefs.length - 1);
	};

	focusLastChild = () => {
		this.focusPrevChild(0);
	};
}

export default MenuButton;
