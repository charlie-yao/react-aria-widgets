import React from 'react';

export default function createMenuFocusManager(Component) {
	return class MenuFocusManager extends React.Component {
		constructor(props) {
			super(props);

			this.managerRef;
			this.itemRefs = [];
		}

		//---- Rendering ----
		render() {
			console.log(this.managerRef, this.itemRefs);

			return (
				<Component
					setManagerRef={ this.setManagerRef }
					setItemRef={ this.setItemRef }
					focusItem={ this.focusItem }
					focusPrevItem={ this.focusPrevItem }
					focusNextItem={ this.focusNextItem }
					focusFirstItem={ this.focusFirstItem }
					focusLastItem={ this.focusLastItem }
					{ ...this.props }
				/>
			);
		}

		//---- Misc. ----
		setManagerRef = (ref) => {
			console.log(ref);
			this.managerRef = ref;
		};

		setItemRef = (ref) => {
			console.log(ref);
			this.itemRefs.push(ref);
		};

		focusItem = (index) => {
			//TODO: autoexpand capabilities?
			this.itemRefs[index].focus();
		};

		focusPrevItem = (index) => {
			this.focusItem(index === 0 ? this.itemRefs.length - 1 : index - 1);
		};

		focusNextItem = (index) => {
			this.focusItem(index === this.itemRefs.length - 1 ? 0 : index + 1);
		};

		focusFirstItem = () => {
			this.focusItem(0);
		};

		focusLastItem = () => {
			this.focusItem(this.itemRefs.length - 1);
		};
	}
}
