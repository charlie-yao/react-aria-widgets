import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';

//Misc.
import { MENU_ITEMS_PROPTYPE } from 'src/utils/propTypes';

/*
 * Note:
 *
 * - If the menubar has a visible label, a labelId prop that points towards
 * the labeling element should be provided. Otherwise, one should pass in
 * a label via the label prop. In other words, one XOR the other must be provided.
 */
class MenuBar extends React.Component {
	static propTypes = {
		items: MENU_ITEMS_PROPTYPE.isRequired,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
		label: PropTypes.string,
		labelId: PropTypes.string,
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

		this.itemRefs = items.map(() => React.createRef());
	}

	//---- Events ----
	onChildKeyDown = (event) => {
		const { items } = this.props;
		const { key, target } = event;
		const index = Number.parseInt(target.dataset.index, 10);
		const item = items[index];
		const { type } = item;

		console.log(index, item);

		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			if(type === 'parentmenuitem') {
				this.setState({
					expandedIndex: index,
				}, () => {
					this.itemRefs[index].current.focusLastChild();
				});
			}
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			if(type === 'parentmenuitem') {
				this.setState({
					expandedIndex: index,
				}, () => {
					this.itemRefs[index].current.focusFirstChild();
				});
			}
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();
			const prevIndex = index === 0 ? items.length - 1 : index - 1;
			const prevItem = items[prevIndex];
			const { type: prevType } = prevItem;
			
			this.setState(prevState => {
				const { expandedIndex } = prevState;
				const isExpanded = expandedIndex !== undefined && expandedIndex !== null;

				return {
					tabbableIndex: prevIndex,
					expandedIndex: isExpanded && prevType === 'parentmenuitem' ? prevIndex : undefined,
				};
			}, () => {
				this.itemRefs[prevIndex].current.focus();
			});
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();
			const nextIndex = index === items.length - 1 ? 0 : index + 1;
			const nextItem = items[nextIndex];
			const { type: nextType } = nextItem;

			this.setState(prevState => {
				const { expandedIndex } = prevState;
				const isExpanded = expandedIndex !== undefined && expandedIndex !== null;

				return {
					tabbableIndex: nextIndex,
					expandedIndex: isExpanded && nextType === 'parentmenuitem' ? nextIndex : undefined,
				};
			}, () => {
				this.itemRefs[nextIndex].current.focus();
			});
		}
		else if(key === 'Enter') {
			event.preventDefault();

			if(type === 'parentmenuitem') {
				this.setState({
					expandedIndex: index,
				}, () => {
					this.itemRefs[index].current.focusFirstChild();
				});
			}
			else {
				//TODO activate the item and close the (whole?) menu
			}
		}
		else if(key === ' ' || key === 'Spacebar') {
			event.preventDefault();

			if(type === 'parentmenuitem') {
				this.setState({
					expandedIndex: index,
				}, () => {
					this.itemRefs[index].current.focusFirstChild();
				});
			}
			else if(type === 'menuitemcheckbox') {
				//TODO change state without closing the menu
			}
			else if(type === 'menuitemradio') {
				//TODO change state without closing the menu
			}
			else if(type === 'menuitem') {
				//TODO activate the item and close the (whole?) menu
			}
		}
		else if(key === 'Home') {
			event.preventDefault();
			const firstIndex = 0;
			const firstItem = items[firstIndex];
			const { type: firstType } = firstItem;

			this.setState(prevState => {
				const { expandedIndex } = prevState;
				const isExpanded = expandedIndex !== undefined && expandedIndex !== null;

				return {
					tabbableIndex: firstIndex,
					expandedIndex: isExpanded && firstType === 'parentmenuitem' ? firstIndex : undefined,
				};
			}, () => {
				this.itemRefs[0].current.focus();
			});
		}
		else if(key === 'End') {
			event.preventDefault();
			const lastIndex = items.length - 1;
			const lastItem = items[lastIndex];
			const { type: lastType } = lastItem;

			this.setState(prevState => {
				const { expandedIndex } = prevState;
				const isExpanded = expandedIndex !== undefined && expandedIndex !== null;

				return {
					tabbableIndex: items.length - 1,
					expandedIndex: isExpanded && lastType === 'parentmenuitem' ? lastIndex : undefined,
				};
			}, () => {
				this.itemRefs[items.length - 1].current.focus();
			});
		}
		else if(key === 'Tab') {
			this.collapseMenu();
		}
		else {
			//TODO: Any key that corresponds to a printable character (Optional):
			//Move focus to the next menu item in the current menu whose label begins
			//with that printable character.
		}
	};

	//---- Rendering ----
	render() {
		const { items, orientation, label, labelId } = this.props;
		const itemNodes = items.map(this.renderItem);

		console.log(this.props, this.state);

		return (
			<ul
				role="menubar"
				aria-orientation={ orientation }
				aria-labelledby={ labelId }
				aria-label={ label }
			>
				{ itemNodes }
			</ul>
		);
	}

	renderItem = (item, index) => {
		const { tabbableIndex, expandedIndex } = this.state
		const { type, node, children, orientation, label, labelId, isDisabled } = item;

		if(type === 'menuitem') {
			return (
				<MenuItem
					key={ index }
					index={ index }
					level={ 0 }
					onKeyDown={ this.onChildKeyDown }
					collapseParent={ this.collapseMenu }
					isDisabled={ isDisabled }
					isTabbable={ index === tabbableIndex }
					ref={ this.itemRefs[index] }
				>
					{ node }
				</MenuItem>
			);
		}
		else if(type === 'parentmenuitem') {
			return (
				<ParentMenuItem
					key={ index }
					items={ children }
					index={ index }
					level={ 0 }
					onKeyDown={ this.onChildKeyDown }
					collapseParent={ this.collapseMenu }
					focusPrevSibling={ this.focusPrevSibling }
					focusNextMenubarItem={ this.focusNextSibling }
					orientation={ orientation }
					label={ label }
					labelId={ labelId }
					isDisabled={ isDisabled }
					isExpanded={ index === expandedIndex }
					isTabbable={ index === tabbableIndex }
					ref={ this.itemRefs[index] }
				>
					{ node }
				</ParentMenuItem>
			);
		}
	};

	//---- Misc. ----
	collapseMenu = (collapseAll, callback) => {
		console.log('in menubar');

		this.setState({
			expandedIndex: undefined,
		}, () => {
			if(typeof callback === 'function')
				callback();
		});
	};

	focusPrevSibling = (index, autoExpand) => {
		const { items } = this.props;
		const prevIndex = index === 0 ? items.length - 1 : index - 1;

		this.setState({
			tabbableIndex: prevIndex,
			expandedIndex: autoExpand ? prevIndex : undefined,
		}, () => {
			this.itemRefs[prevIndex].current.focus();
		});
	};
	
	//TODO not very flexible, assuming the current index is
	//what is currently expanded...
	focusNextSibling = () => {
		const { items } = this.props;
		const { expandedIndex } = this.state;
		const nextIndex = expandedIndex === items.length - 1 ? 0 : expandedIndex + 1;

		console.log(expandedIndex, nextIndex);

		this.setState({
			tabbableIndex: nextIndex,
			expandedIndex: nextIndex,
		}, () => {
			this.itemRefs[nextIndex].current.focus();
		});
	};
}

export default MenuBar;
