import React from 'react';
import PropTypes from 'prop-types';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';

/*
 * Note:
 *
 * - The menu should either have a labelId prop that points to the menuitem or
 * button that controls its display XOR a label prop.
 */
class Menu extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		items: MENUITEMS_PROPTYPE.isRequired,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
		label: PropTypes.string,
		labelId: PropTypes.string,
		id: PropTypes.string,
		className: PropTypes.string,
	};

	static defaultProps = {
		orientation: 'vertical',
		label: undefined,
		labelId: undefined,
		id: undefined,
		className: undefined,
	};

	//---- Events ----
	onKeyDown = (event) => {
		return;

		const { items, orientation } = this.props;
		const { key, target } = event;
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const flattenedRootIndex = Number.parseInt(flattenedPosition[0], 10);
		const level = position.length - 1;
		const item = items[index];
		const { type, onActivate } = item;

		console.log(orientation, position, flattenedPosition, index, flattenedIndex, level, item);

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


	//---- Rendering ----
	render() {
		const { children, orientation, label, labelId, id, className } = this.props;

		return (
			<ul
				role="menu"
				aria-orientation={ orientation }
				aria-label={ label }
				aria-labelledby={ labelId }
				id={ id }
				className={ className }
				onKeyDown={ this.onKeyDown }
			>
				{ children }
			</ul>
		);
	}
}

export default Menu;
