import React from 'react';
import { v4 as uuid } from 'uuid'

//Components and Styles
import MenuBar from 'src/Menu/MenuBar';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';

class MenuBarOne extends React.Component {
	static propTypes = {
		items: MENUITEMS_PROPTYPE.isRequired,
	};

	//---- Rendering ----
	render() {
		return (
			<MenuBar label="Placeholder" items={ this.getItems() } />
		);
	}

	//---- Misc. ----
	getItems = () => {
		return [
			{
				type: 'menu',
				node: 'Parent Menuitem 1',
				children: [
					{
						type: 'radiogroup',
						children: [
							{
								node: 'Radio Option 1',
							},
							{
								node: 'Radio Option 2',
							},
							{
								node: 'Radio Option 3',
							},
						],
					},
					{
						type: 'separator',
					},
					{
						type: 'checkbox',
						node: 'Checkbox 1',
					},
					{
						type: 'checkbox',
						node: 'Checkbox 2',
					},
					{
						type: 'separator',
					},
					{
						type: 'radiogroup',
						children: [
							{
								node: 'Radio Option 1',
							},
							{
								node: 'Radio Option 2',
							},
							{
								node: 'Radio Option 3',
							},
						],
					},
				],
			},
			{
				type: 'menu',
				node: 'Parent Menuitem 2',
				children: [
					{
						type: 'item',
						node: 'Hello world!',
					},
					{
						type: 'item',
						node: 'Hello world!',
					},
					{
						type: 'item',
						node: 'Hello world!',
					},
				],
			},
			{
				type: 'item',
				node: 'Hello world!',
			},
			{
				type: 'menu',
				node: 'Parent Menuitem 3',
				children: [
					{
						type: 'item',
						node: 'Hello world!',
					},
					{
						type: 'item',
						node: 'Hello world!',
					},
					{
						type: 'menu',
						node: 'Nested Parent Menuitem',
						children: [
							{
								type: 'item',
								node: 'Hello world!',
							},
							{
								type: 'item',
								node: 'Hello world!',
							},
						],
					},
				],
			},
			{
				type: 'separator',
			},
			{
				type: 'radiogroup',
				children: [
					{
						node: 'Radio Option 1',
					},
					{
						node: 'Radio Option 2',
					},
					{
						node: 'Radio Option 3',
					},
				],
			},
			{
				type: 'separator',
			},
			{
				type: 'menu',
				node: 'Parent Menuitem 4',
				children: [
					{
						type: 'checkbox',
						node: 'Checkbox Parent',
					},
					{
						type: 'checkbox',
						node: 'Checkbox Child 1',
					},
					{
						type: 'checkbox',
						node: 'Checkbox Child 2',
					},
					{
						type: 'checkbox',
						node: 'Checkbox Child 3',
					},
				],
			},
		];
	};
}

export default MenuBarOne;
