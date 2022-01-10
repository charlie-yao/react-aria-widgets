import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import MenuItemRadio from 'src/Menu/MenuItemRadio';

//Misc.
import { MENUITEM_RADIO_PROPTYPE } from 'src/utils/propTypes';

/*
 * Note that if a menu or menubar contains more than one group of
 * menuitemradio elements or if the menu has a group of menuitemradio
 * elements alongside other unrelated menu items:
 *
 * - the menuitemradio elements should be nested in an element with the "group" role
 * - menuitemradio groups should be delimited with an element with the "separator" role
 *
 * See:
 * https://www.w3.org/TR/wai-aria-1.1/#menuitemradio
 *
 * TODO: how should this component accept refs? as it currently stands,
 * the renderItem functions that map items to components can't just
 * blindly accept something from this.itemRefs or this.childItemRefs
 * - items that follow a radio group will need to know the existence of
 * preceding radio groups and the number of elements they possess
 * because radio refs are currently given their own array of refs
 * so they can be all passed into a radio group at once.
 *
 * if the radio refs were "flattened", then we can't just use an Array.map
 * to render out items because there isn't a one-to-one relation
 * between elements in the items array and components - radiogroups
 * can possess one or more radio options, and radiogroups are currently
 * considered a single "item" in the items array
 */
function MenuItemRadioGroup(props) {
	const { options, index, level, onKeyDown, label, labelId } = props;
	const optionNodes = options.map((option, i) => {
		//TODO: flags should come from react state?
		const { node, isDisabled, isChecked } = option;

		return (
			<MenuItemRadio
				key={ i }
				index={ index + i }
				level={ level }
				onKeyDown={ onKeyDown }
			>
				{ node }
			</MenuItemRadio>
		);
	});

	return (
		<li>
			<ul
				role="group"
				aria-label={ label }
				aria-labelledby={ labelId }
			>
				{ optionNodes }
			</ul>
		</li>
	);
}

MenuItemRadioGroup.propTypes = {
	options: PropTypes.arrayOf(MENUITEM_RADIO_PROPTYPE).isRequired,
	index: PropTypes.number.isRequired,
	level: PropTypes.number.isRequired,
	label: PropTypes.string,
	labelId: PropTypes.string,
};

MenuItemRadioGroup.defaultProps = {
	label: undefined,
	labelId: undefined,
};

export default MenuItemRadioGroup;
