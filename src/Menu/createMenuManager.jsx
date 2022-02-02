/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

export default function createMenuManager(Component) {
	class MenuManager extends React.Component {
		static propTypes = {
			forwardedRef: PropTypes.oneOfType([
				PropTypes.func,
				PropTypes.object,
			]),
			collapse: PropTypes.func,
		};

		static defaultProps = {
			forwardedRef: null, //seems to be React's default
			collapse: undefined,
		};

		constructor(props) {
			super(props);

			//Note: tabbableIndex is only really relevant to the
			//root menuitems in a menubar. Submenus should ignore
			//it.
			this.state = {
				tabbableIndex: 0,
				expandedIndex: -1,
			};

			this.managerRef = undefined;
			this.itemRefs = [];
		}

		//---- Rendering ----
		render() {
			const { forwardedRef, ...rest } = this.props;
			const { tabbableIndex, expandedIndex } = this.state;

			return (
				<Component
					setManagerRef={ this.setManagerRef }
					setItemRef={ this.setItemRef }
					tabbableIndex={ tabbableIndex }
					expandedIndex={ expandedIndex }
					collapseItem={ this.collapseItem }
					expandItem={ this.expandItem }
					focus={ this.focus }
					focusItem={ this.focusItem }
					focusPrevItem={ this.focusPrevItem }
					focusNextItem={ this.focusNextItem }
					focusFirstItem={ this.focusFirstItem }
					focusLastItem={ this.focusLastItem }
					focusItemFirstChild={ this.focusItemFirstChild }
					focusItemLastChild={ this.focusItemLastChild }
					ref={ forwardedRef }
					{ ...rest }
				/>
			);
		}

		//---- Misc. ----
		setManagerRef = (ref) => {
			this.managerRef = ref;
		};

		setItemRef = (ref) => {
			this.itemRefs.push(ref);
		};
		
		collapseItem = (collapseAllParents, callback) => {
			const { collapse } = this.props;

			this.setState({
				expandedIndex: -1,
			}, () => {
				if(collapseAllParents) {
					if(typeof collapse === 'function')
						collapse(true, callback); //FIXME currently broken for MenuButton
					else if(typeof callback === 'function')
						callback();
				}
				else if(typeof callback === 'function')
					callback();
			});
		};

		expandItem = (index, callback) => {
			this.setState({
				expandedIndex: index,
			}, () => {
				if(typeof callback === 'function')
					callback();
			});
		};

		focus = () => {
			this.managerRef.focus();
		};

		focusItem = (index, autoExpand = false) => {
			const itemRef = this.itemRefs[index];
			const isMenu = !(itemRef instanceof HTMLElement); //this feels rather fragile

			this.setState(state => {
				const { expandedIndex } = state;
				const wasExpanded = expandedIndex !== -1;
				const _autoExpand = isMenu && (autoExpand || wasExpanded);

				return {
					tabbableIndex: index,
					expandedIndex: _autoExpand ? index : -1,
				};
			}, () => {
				if(isMenu)
					itemRef.props.focus();
				else
					itemRef.focus();
			});
		};

		focusPrevItem = (index, autoExpand) => {
			this.focusItem(index === 0 ? this.itemRefs.length - 1 : index - 1, autoExpand);
		};

		focusNextItem = (index, autoExpand) => {
			this.focusItem(index === this.itemRefs.length - 1 ? 0 : index + 1, autoExpand);
		};

		focusFirstItem = () => {
			this.focusItem(0);
		};

		focusLastItem = () => {
			this.focusItem(this.itemRefs.length - 1);
		};

		focusItemFirstChild = (index) => {
			this.itemRefs[index].props.focusFirstItem();
		};

		focusItemLastChild = (index) => {
			this.itemRefs[index].props.focusLastItem();
		};
	}

	return React.forwardRef((props, ref) => {
		return <MenuManager { ...props } forwardedRef={ ref } />;
	});
}
