import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';
import MenuItemCheckbox from 'src/Menu/MenuItemCheckbox';
import MenuItemSeparator from 'src/Menu/MenuItemSeparator';
import MenuItemRadioGroup from 'src/Menu/MenuItemRadioGroup';
import MenuItemRadio from 'src/Menu/MenuItemRadio';
import createMenuFocusManager from 'src/Menu/createMenuFocusManager';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';

/*
 * Note:
 *
 * - If the menubar has a visible label, a labelId prop that points towards
 * the labeling element should be provided. Otherwise, one should pass in
 * a label via the label prop. In other words, one XOR the other must be provided.
 */
class MenuBar extends React.Component {
	static propTypes = {
		items: MENUITEMS_PROPTYPE.isRequired,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
		label: PropTypes.string,
		labelId: PropTypes.string,
		//From MenuFocusManager
		setManagerRef: PropTypes.func.isRequired,
		setItemRef: PropTypes.func.isRequired,
		focusItem: PropTypes.func.isRequired,
		focusPrevItem: PropTypes.func.isRequired,
		focusNextItem: PropTypes.func.isRequired,
		focusFirstItem: PropTypes.func.isRequired,
		focusLastItem: PropTypes.func.isRequired,
	};

	static defaultProps = {
		orientation: 'horizontal',
		label: undefined,
		labelId: undefined,
	};

	constructor(props) {
		super(props);

		const { items } = props;

		this.state = {
			tabbableIndex: 0,
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
	onChildKeyDown = (event) => {
		const { items, orientation } = this.props;
		const { key, target } = event;
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const subIndex = Number.parseInt(target.dataset.subindex, 10);
		const item = items[index];
		const { type, onActivate: itemOnActivate } = item;
		let onActivate;

		if(type === 'radiogroup') {
			const radioOption = item.children[subIndex];
			const { onActivate: radioOptionOnActivate } = radioOption;
			onActivate = radioOptionOnActivate ? radioOptionOnActivate : itemOnActivate;
		}
		else
			onActivate = itemOnActivate;

		//console.log(position, flattenedPosition, index, flattenedIndex, item);

		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			if(orientation === 'horizontal') {
				if(type === 'menu') {
					this.expandChild(flattenedIndex, () => {
						//this.childItemRefs[flattenedIndex].current.focusLastChild();
					});
				}
			}
			else {
				this.props.focusPrevItem(flattenedIndex);
				//this.focusPrevChild(flattenedIndex);
			}
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			if(orientation === 'horizontal') {
				if(type === 'menu') {
					this.expandChild(flattenedIndex, () => {
						//this.childItemRefs[flattenedIndex].current.focusFirstChild();
					});
				}
			}
			else {
				this.props.focusNextItem(flattenedIndex);
				//this.focusNextChild(flattenedIndex);
			}
		}
		else if(key === 'ArrowLeft' || key === 'Left') { 
			event.preventDefault();

			if(orientation === 'horizontal') {
				this.props.focusPrevItem(flattenedIndex);
				//this.focusPrevChild(flattenedIndex);
			}
			else {
				if(type === 'menu') {
					this.expandChild(flattenedIndex, () => {
						//this.childItemRefs[flattenedIndex].current.focusLastChild();
					});
				}
			}
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();

			if(orientation === 'horizontal') {
				this.props.focusNextItem(flattenedIndex);
				//this.focusNextChild(flattenedIndex);
			}
			else {
				if(type === 'menu') {
					this.expandChild(flattenedIndex, () => {
						//this.childItemRefs[flattenedIndex].current.focusFirstChild();
					});
				}
			}
		}
		else if(key === 'Enter') {
			event.preventDefault();

			if(type === 'menu') {
				this.expandChild(flattenedIndex, () => {
					//this.childItemRefs[flattenedIndex].current.focusFirstChild();
				});
			}
			else if(type === 'checkbox') {
				if(typeof onActivate === 'function')
					onActivate(event);
			}
			else if(type === 'radiogroup') {
				if(typeof onActivate === 'function')
					onActivate(event);
			}
			else if(type === 'item') {
				if(typeof onActivate === 'function')
					onActivate(event);
			}
		}
		else if(key === ' ' || key === 'Spacebar') {
			event.preventDefault();

			if(type === 'menu') {
				this.expandChild(flattenedIndex, () => {
					//this.childItemRefs[flattenedIndex].current.focusFirstChild();
				});
			}
			else if(type === 'checkbox') {
				if(typeof onActivate === 'function')
					onActivate(event);
			}
			else if(type === 'radiogroup') {
				if(typeof onActivate === 'function')
					onActivate(event);
			}
			else if(type === 'item') {
				if(typeof onActivate === 'function')
					onActivate(event);
			}
		}
		else if(key === 'Home') {
			event.preventDefault();
			//this.focusFirstChild();
			this.props.focusFirstItem();
		}
		else if(key === 'End') {
			event.preventDefault();
			//this.focusLastChild();
			this.props.focusLastItem();
		}
		else if(key === 'Tab')
			this.collapseChild();
	};

	//---- Rendering ----
	render() {
		const { orientation, label, labelId } = this.props;

		//console.log(this.props, this.state, this.childItemRefs);

		return (
			<ul
				role="menubar"
				aria-orientation={ orientation }
				aria-labelledby={ labelId }
				aria-label={ label }
			>
				{ this.renderItems() }
			</ul>
		);
	}

	renderItems = () => {
		/* eslint-disable react/no-array-index-key */

		const { items } = this.props;
		const { tabbableIndex, expandedIndex } = this.state;
		const itemNodes = [];
		let position = [];
		let flattenedPosition = [];
		let flattenedIndex = 0;

		items.forEach((item, i) => {
			const { type, node, children, orientation, label, labelId, isDisabled, isChecked } = item;

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
						onKeyDown={ undefined /*this.onChildKeyDown*/ }
						isDisabled={ isDisabled }
						isTabbable={ undefined /*flattenedIndex === tabbableIndex*/ }
						ref={ this.props.setItemRef /*this.childItemRefs[flattenedIndex]*/ }
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
						onKeyDown={ undefined /*this.onChildKeyDown*/ }
						collapse={ undefined /*this.collapseChild*/ }
						focusPrevRootItem={ undefined /*this.props.focusPrevItem*/ /*this.focusPrevChild*/ }
						focusNextRootItem={ undefined /*this.props.focusNextItem*/ /*this.focusNextChild*/ }
						focusRootItem={ undefined /*this.props.focusItem*/ /*this.focusChild*/ }
						orientation={ orientation }
						label={ label }
						labelId={ labelId }
						isExpanded={ undefined /*flattenedIndex === expandedIndex*/ }
						isDisabled={ isDisabled }
						isTabbable={ undefined /*flattenedIndex === tabbableIndex*/ }
						ref={ this.props.setItemRef /*this.childItemRefs[flattenedIndex]*/ }
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

				itemNodes.push(
					<MenuItemCheckbox
						key={ i }
						position={ position }
						flattenedPosition={ flattenedPosition }
						onKeyDown={ undefined /*this.onChildKeyDown*/ }
						isDisabled={ isDisabled }
						isTabbable={ undefined /*flattenedIndex === tabbableIndex*/ }
						isChecked={ isChecked }
						ref={ this.props.setItemRef /*this.childItemRefs[flattenedIndex]*/ }
					>
						{ node }
					</MenuItemCheckbox>
				);

				flattenedIndex++;
			}
			else if(type === 'separator') {
				itemNodes.push(
					<MenuItemSeparator key={ i } orientation={ orientation }>
						{ node }
					</MenuItemSeparator>
				);
			}
			else if(type === 'radiogroup') {
				const radioNodes = [];

				children.forEach((radioItem, j) => {
					const { node, isDisabled, isChecked, value } = radioItem;

					position = position.slice(0);
					position[0] = i;
					flattenedPosition = flattenedPosition.slice(0);
					flattenedPosition[0] = flattenedIndex;

					radioNodes.push(
						<MenuItemRadio
							key={ j }
							subIndex={ j }
							position={ position }
							flattenedPosition={ flattenedPosition }
							onKeyDown={ undefined /*this.onChildKeyDown*/ }
							isDisabled={ isDisabled }
							isTabbable={ undefined /*flattenedIndex === tabbableIndex*/ }
							isChecked={ isChecked }
							data-value={ value }
							ref={ this.props.setItemRef /*this.childItemRefs[flattenedIndex]*/ }
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
		this.focusChild(flattenedIndex === 0 ? this.childItemRefs.length - 1 : flattenedIndex - 1, autoExpand);
	};

	focusNextChild = (flattenedIndex, autoExpand = false) => {
		this.focusChild(flattenedIndex === this.childItemRefs.length - 1 ? 0 : flattenedIndex + 1, autoExpand);
	};

	focusFirstChild = () => {
		this.focusChild(0);
	};

	focusLastChild = () => {
		this.focusLastChild(this.childItemRefs.length - 1);
	};

	focusChild = (flattenedIndex, autoExpand) => {
		const targetRef = this.childItemRefs[flattenedIndex];

		this.setState(state => {
			const { expandedIndex } = state;
			const wasExpanded = expandedIndex !== undefined && expandedIndex !== null;
			const _autoExpand = targetRef.current instanceof ParentMenuItem && (wasExpanded || autoExpand);

			return {
				tabbableIndex: flattenedIndex,
				expandedIndex: _autoExpand ? flattenedIndex : undefined,
			};
		}, () => {
			targetRef.current.focus();
		});
	};
}

export default createMenuFocusManager(MenuBar);
