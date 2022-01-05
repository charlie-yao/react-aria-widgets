import React from 'react';
import PropTypes from 'prop-types';

//TODO: navigation-specific menu item?
class MenuItem extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		index: PropTypes.number.isRequired,
		level: PropTypes.number.isRequired,
		isDisabled: PropTypes.bool,
	};

	static defaultProps = {
		isDisabled: false,
	};

	constructor(props) {
		super(props);

		const { index, level } = props;

		this.state = {
			isTabbable: index === 0 && level === 0,
		};
	}

	//---- Events ----
	onKeyDown = (event) => {
		const { level } = this.props;
		const { key, target } = event;
		const index = Number.parseInt(target.dataset.index);

		console.log(index, level);

		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			if(level > 0) {
			}
			else {
			}
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();

			if(level === 0) {
			}
			else {
			}
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();
			//TODO
		}
		else if(key === 'Enter') {
			event.preventDefault();
			
		}
		else if(key === ' ' || key === 'Spacebar') {
			event.preventDefault();

			if(type === 'parentmenuitem') {
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
		}
		else if(key === 'End') {
			event.preventDefault();
		}
		else if(key === 'Escape' || key === 'Esc') {
			event.preventDefault();

		}
		else if(key === 'Tab') {

		}
		else {
			//TODO: Any key that corresponds to a printable character (Optional):
			//Move focus to the next menu item in the current menu whose label begins
			//with that printable character.
		}

	};

	//---- Rendering ----
	render() {
		const { children, isDisabled, index } = this.props;
		const { isTabbable } = this.state;

		return (
			<li
				role="menuitem"
				aria-disabled={ isDisabled }
				tabIndex={ isTabbable ? '0' : '-1' }
				onKeyDown={ this.onKeyDown }
				data-index={ index }
			>
				{ children }
			</li>
		);
	}
}

export default MenuItem;

/*
const MenuItem = React.forwardRef(function MenuItem(props, ref) {
	const { children, isDisabled, isTabbable, onKeyDown, index } = props;

	return (
		<li
			role="menuitem"
			aria-disabled={ isDisabled }
			tabIndex={ isTabbable ? '0' : '-1' }
			ref={ ref }
			onKeyDown={ onKeyDown }
			data-index={ index }
		>
			{ children }
		</li>
	);
});

MenuItem.propTypes = {
	children: PropTypes.node.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	isDisabled: PropTypes.bool,
	isTabbable: PropTypes.bool,
};

MenuItem.defaultProps = {
	isDisabled: false,
	isTabbable: false,
};

export default MenuItem;
*/
