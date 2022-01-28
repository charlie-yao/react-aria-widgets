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

/*
 * Note about labels and IDs:
 *
 * 1) Passing in an id prop means giving the menu an aria-labelledby attribute
 * that points to the <button>. Passing a menuLabel prop means giving the menu
 * an aria-label attribute. However, since the menu is controlled by the <button>
 * and the <button> is likely going to contain accessible label text, chances are,
 * you should be using the id prop to label the menu instead of the menuLabel prop.
 *
 * See:
 * https://www.w3.org/TR/wai-aria-1.1/#aria-label
 *
 * This also means that, as it's current programmed, the menu's aria-labelledby
 * attribute cannot point to any other HTML element other than the <button>
 * controlling it.
 *
 * 2) One can optionally pass in a menuId prop, giving the <button> an
 * aria-controls attribute that points to the menu.
 */
class MenuButton extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		items: MENUITEMS_PROPTYPE.isRequired,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
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

		this.buttonRef = React.createRef();
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

		if(key === 'Enter' || key === ' ' || key === 'Spacebar') {
			event.preventDefault();

			this.expandButton(() => {
				this.focusFirstChild();
			});
		}
		else if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			this.expandButton(() => {
				this.focusLastChild();
			});
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			this.expandButton(() => {
				this.focusFirstChild();
			});
		}
	};

	onChildKeyDown = (event) => {
		const { items, orientation } = this.props;
		const { key, target } = event;
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const subIndex = Number.parseInt(target.dataset.subindex, 10);
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
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

			if(orientation === 'vertical')
				this.focusPrevChild(flattenedIndex);
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
			}
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();

			if(orientation === 'horizontal')
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

				this.collapseButton(() => {
					this.focus();
				});
			}
			else if(type === 'radiogroup') {
				if(typeof onActivate === 'function')
					onActivate(event);

				this.collapseButton(() => {
					this.focus();
				});
			}
			else if(type === 'item') {
				if(typeof onActivate === 'function')
					onActivate(event);

				this.collapseButton(() => {
					this.focus();
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

				this.collapseButton(() => {
					this.focus();
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
			this.collapseButton(() => {
				this.focus();
			});
		}
		else if(key === 'Tab')
			this.collapseButton();
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
					ref={ this.buttonRef }
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
						focusRootItem={ this.focus }
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

				itemNodes.push(
					<MenuItemCheckbox
						key={ i }
						position={ position }
						flattenedPosition={ flattenedPosition }
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

	//---- Misc. ----
	collapseButton = (callback) => {
		this.setState({
			isExpanded: false,
		}, () => {
			if(typeof callback === 'function')
				callback();
		});
	};

	expandButton = (callback) => {
		this.setState({
			isExpanded: true,
		}, () => {
			if(typeof callback === 'function')
				callback();
		});
	};

	collapseChild = (collapseAll, callback) => {
		this.setState({
			expandedIndex: undefined,
		}, () => {
			if(collapseAll)
				this.collapseButton(callback);
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
		this.buttonRef.current.focus();
	};
}

export default MenuButton;
