import React from 'react';

//Components and Styles
import MenuBar from 'src/Menu/MenuBar';

class MenuBarOne extends React.Component {
	//---- Rendering ----
	render() {
		return (
			<MenuBar label="Placeholder" items={ this.generateItems() } />
		);
	}

	//---- Misc. ----
	generateItems = () => {
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
						type: 'menu',
						node: 'Nested Parent Menuitem',
						children: [
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
						type: 'item',
						node: 'Hello world!',
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
					{
						type: 'checkbox',
						node: 'Checkbox 1',
					},
					{
						type: 'checkbox',
						node: 'Checkbox 2',
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
						type: 'item',
						node: 'Hello world!',
					},
					{
						type: 'item',
						node: 'Hello world!',
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
		];
	};
}

export default MenuBarOne;
