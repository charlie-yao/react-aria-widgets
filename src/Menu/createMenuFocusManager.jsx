import React from 'react';
import PropTypes from 'prop-types';

export default function createMenuFocusManager(Component) {
	class _MenuFocusManager extends React.Component {
		static propTypes = {
			forwardedRef: PropTypes.oneOfType([
				PropTypes.func,
				PropTypes.object,
			]),
		};

		constructor(props) {
			super(props);

			this.managerRef;
			this.itemRefs = [];
		}

		//---- Rendering ----
		render() {
			const { forwardedRef, ...rest } = this.props;

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
					ref={ forwardedRef }
					{ ...rest }
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

	return React.forwardRef(function MenuFocusManager(props, ref) {
		return <_MenuFocusManager {...props} forwardedRef={ ref } />;
	});
}
