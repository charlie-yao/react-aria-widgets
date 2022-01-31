import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';
import MenuItem from 'src/Menu/MenuItem';
import MenuItemCheckbox from 'src/Menu/MenuItemCheckbox';
import MenuItemSeparator from 'src/Menu/MenuItemSeparator';
import MenuItemRadioGroup from 'src/Menu/MenuItemRadioGroup';
import MenuItemRadio from 'src/Menu/MenuItemRadio';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';

class ParentMenuItem extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		items: MENUITEMS_PROPTYPE.isRequired,
		position: PropTypes.arrayOf(PropTypes.number).isRequired,
		flattenedPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
		onKeyDown: PropTypes.func.isRequired,
		collapse: PropTypes.func.isRequired,
		focusPrevRootItem: PropTypes.func,
		focusNextRootItem: PropTypes.func,
		focusRootItem: PropTypes.func,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
		label: PropTypes.string,
		labelId: PropTypes.string,
		isExpanded: PropTypes.bool,
		isDisabled: PropTypes.bool,
		isTabbable: PropTypes.bool,
	};

	static defaultProps = {
		focusPrevRootItem: undefined,
		focusNextRootItem: undefined,
		focusRootItem: undefined,
		orientation: 'vertical',
		label: undefined,
		labelId: undefined,
		isExpanded: false,
		isDisabled: false,
		isTabbable: false,
	};

	constructor(props) {
		super(props);

		const { items } = props;

		this.state = {
			expandedIndex: undefined,
		};

		this.itemRef = React.createRef();
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
		const { items, collapse, focusPrevRootItem, focusNextRootItem, focusRootItem, orientation } = this.props;
		const { key, target } = event;
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const flattenedRootIndex = Number.parseInt(flattenedPosition[0], 10);
		const level = position.length - 1;
		const item = items[index];
		const { type, onActivate } = item;

		//console.log(position, flattenedPosition, index, flattenedIndex, level, item);

		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();
			event.stopPropagation();

			if(orientation === 'vertical') {
			}
			else {
			}
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();
			event.stopPropagation();

			if(orientation === 'vertical') {
			}
			else {
			}
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();
			event.stopPropagation();

			if(orientation === 'vertical') {
			}
			else {
			}
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();
			event.stopPropagation();

			if(orientation === 'vertical') {
			}
			else {
			}
		}
		else if(key === 'Enter') {
			event.preventDefault();
			event.stopPropagation();

			if(type === 'menu') {
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
			event.stopPropagation();

			if(type === 'menu') {
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
			event.stopPropagation();
		}
		else if(key === 'End') {
			event.preventDefault();
			event.stopPropagation();
		}
		else if(key === 'Escape' || key === 'Esc') {
			event.preventDefault();
			event.stopPropagation();
		}
		else if(key === 'Tab') {
			event.stopPropagation();
		}
	};

	onChildKeyDown = (event) => {
		const { items, collapse, focusPrevRootItem, focusNextRootItem, focusRootItem, orientation } = this.props;
		const { key, target } = event;
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const flattenedRootIndex = Number.parseInt(flattenedPosition[0], 10);
		const level = position.length - 1;
		const item = items[index];
		const { type, onActivate } = item;

		//console.log(position, flattenedPosition, index, flattenedIndex, level, item);

		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			if(orientation === 'vertical')
				this.focusPrevChild(flattenedIndex);
			else {
				collapse(false, () => {
					if(level === 1 && focusPrevRootItem)
						focusPrevRootItem(flattenedRootIndex, true);
					else
						this.focus();
				});
			}
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			if(orientation === 'vertical')
				this.focusNextChild(flattenedIndex);
			else {
				if(type === 'menu') {
					this.expandChild(flattenedIndex, () => {
						this.childItemRefs[flattenedIndex].current.focusFirstChild();
					});
				}
				else if(focusNextRootItem) {
					collapse(true, () => {
						focusNextRootItem(flattenedRootIndex, true);
					});
				}
			}
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();

			if(orientation === 'vertical') {
				collapse(false, () => {
					if(level === 1 && focusPrevRootItem)
						focusPrevRootItem(flattenedRootIndex, true);
					else
						this.focus();
				});
			}
			else
				this.focusPrevChild(flattenedIndex);
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();

			if(orientation === 'vertical') {
				if(type === 'menu') {
					this.expandChild(flattenedIndex, () => {
						this.childItemRefs[flattenedIndex].current.focusFirstChild();
					});
				}
				else if(focusNextRootItem) {
					collapse(true, () => {
						focusNextRootItem(flattenedRootIndex, true);
					});
				}
			}
			else
				this.focusNextChild(flattenedIndex);
		}
		else if(key === 'Enter') {
			event.preventDefault();

			if(type === 'menu') {
				this.expandChild(flattenedIndex, () => {
					this.childItemRefs[flattenedIndex].current.focusFirstChild();
				});
			}
			else if(type === 'checkbox') {
				if(typeof onActivate === 'function')
					onActivate(event);

				collapse(true, () => {
					focusRootItem(flattenedRootIndex);
				});
			}
			else if(type === 'radiogroup') {
				if(typeof onActivate === 'function')
					onActivate(event);

				collapse(true, () => {
					focusRootItem(flattenedRootIndex);
				});
			}
			else if(type === 'item') {
				if(typeof onActivate === 'function')
					onActivate(event);

				collapse(true, () => {
					focusRootItem(flattenedRootIndex);
				});
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

				collapse(true, () => {
					focusRootItem(flattenedRootIndex);
				});
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
		else if(key === 'Escape' || key === 'Esc') {
			event.preventDefault();

			collapse(false, () => {
				this.focus();
			});
		}
		else if(key === 'Tab')
			collapse(true);
	};

	//---- Rendering ----
	render() {
		const {
			children, position, flattenedPosition, onKeyDown,
			orientation, label, labelId,
			isExpanded, isDisabled, isTabbable,
		} = this.props;

		//console.log(this.props, this.state, this.itemRef, this.childItemRefs);

		return (
			<li role="none">
				<a
					href="#"
					role="menuitem"
					aria-haspopup="menu"
					data-position={ position }
					data-flattenedposition={ flattenedPosition }
					onKeyDown={ this.onKeyDown /*onKeyDown */ }
					aria-expanded={ isExpanded }
					aria-disabled={ isDisabled }
					tabIndex={ isTabbable ? '0' : '-1' }
					ref={ this.itemRef }
				>
					{ children }
				</a>
				<Menu
					orientation={ orientation }
					label={ label }
					labelId={ labelId }
				>
					{ this.renderItems() }
				</Menu>
			</li>
		);
	}

	renderItems = () => {
		/* eslint-disable react/no-array-index-key */

		const { items, focusPrevRootItem, focusNextRootItem, focusRootItem, position, flattenedPosition } = this.props;
		const { expandedIndex } = this.state;
		const level = position.length;
		const itemNodes = [];
		let _position = [];
		let _flattenedPosition = [];
		let flattenedIndex = 0;

		items.forEach((item, i) => {
			const { type, node, children, orientation, label, labelId, isDisabled, isChecked } = item;

			if(type === 'item') {
				_position = position.slice(0);
				_position[level] = i;
				_flattenedPosition = flattenedPosition.slice(0);
				_flattenedPosition[level] = flattenedIndex;

				itemNodes.push(
					<MenuItem
						key={ i }
						position={ _position }
						flattenedPosition={ _flattenedPosition }
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
				_position = position.slice(0);
				_position[level] = i;
				_flattenedPosition = flattenedPosition.slice(0);
				_flattenedPosition[level] = flattenedIndex;

				itemNodes.push(
					<ParentMenuItem
						key={ i }
						items={ children }
						position={ _position }
						flattenedPosition={ _flattenedPosition }
						onKeyDown={ this.onChildKeyDown }
						collapse={ this.collapseChild }
						focusPrevRootItem={ focusPrevRootItem }
						focusNextRootItem={ focusNextRootItem }
						focusRootItem={ focusRootItem }
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
				_position = position.slice(0);
				_position[level] = i;
				_flattenedPosition = flattenedPosition.slice(0);
				_flattenedPosition[level] = flattenedIndex;

				itemNodes.push(
					<MenuItemCheckbox
						key={ i }
						position={ _position }
						flattenedPosition={ _flattenedPosition }
						onKeyDown={ this.onChildKeyDown }
						isDisabled={ isDisabled }
						isChecked={ isChecked }
						ref={ this.childItemRefs[flattenedIndex] }
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

					_position = position.slice(0);
					_position[level] = i;
					_flattenedPosition = flattenedPosition.slice(0);
					_flattenedPosition[level] = flattenedIndex;

					radioNodes.push(
						<MenuItemRadio
							key={ j }
							position={ _position }
							flattenedPosition={ _flattenedPosition }
							onKeyDown={ this.onChildKeyDown }
							isDisabled={ isDisabled }
							isChecked={ isChecked }
							data-value={ value }
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

	//---- Misc. ---
	collapseChild = (collapseAll, callback) => {
		const { collapse } = this.props;

		this.setState({
			expandedIndex: undefined,
		}, () => {
			if(collapseAll)
				collapse(true, callback);
			else if(typeof callback === 'function')
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

	focusPrevChild = (flattenedIndex) => {
		this.focusChild(flattenedIndex === 0 ? this.childItemRefs.length - 1 : flattenedIndex - 1);
	};

	focusNextChild = (flattenedIndex) => {
		this.focusChild(flattenedIndex === this.childItemRefs.length - 1 ? 0 : flattenedIndex + 1);
	};

	focusFirstChild = () => {
		this.focusChild(0);
	};

	focusLastChild = () => {
		this.focusChild(this.childItemRefs.length - 1);
	};

	focusChild = (flattenedIndex) => {
		this.childItemRefs[flattenedIndex].current.focus();
	};

	focus = () => {
		this.itemRef.current.focus();
	};
}

export default ParentMenuItem;
