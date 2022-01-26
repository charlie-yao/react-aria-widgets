import React from 'react';

//Components and Styles
import Accordion from 'src/Accordion';
import MenuButton from 'src/Menu/MenuButton';
import MenuBar from 'src/Menu/MenuBar';
import MenuBarOne from 'src/MenuBarOne';

function onDummySubmit(event) {
	event.preventDefault();
}

const DUMMY_ACCORDION_SECTIONS = [
	{
		id: 'section1',
		header: 'Section 1',
		panel: (
			<form onSubmit={ onDummySubmit }>
				<label htmlFor="section1Input1">Dummy Input #1</label>
				<input type="text" id="section1Input1" required />
				<label htmlFor="section1Input2">Dummy Input #2</label>
				<input type="number" min="0" max="100" required step="1" id="section1Input2" />
				<button type="submit">Submit</button>
			</form>
		),
	},
	{
		id: 'section2',
		header: 'Section 2',
		panel: 'Section 2 content',
	},
	{
		id: 'section3',
		header: 'Section 3',
		panel: 'Section 3 content',
	},
];

const MENUITEMS = [
	{
		type: 'menu',
		node: 'Parent Menuitem 1',
		children: [
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
			{
				type: 'separator',
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
	{
		type: 'separator',
	},
];

const MENUITEMS_2 = [
	{
		type: 'menu',
		node: 'Parent Menuitem 1',
		orientation: 'horizontal',
		children: [
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
			{
				type: 'separator',
			},
		],
	},
	{
		type: 'menu',
		node: 'Parent Menuitem 2',
		orientation: 'horizontal',
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
				orientation: 'horizontal',
				children: [
					{
						type: 'menu',
						node: 'Nested Parent Menuitem',
						orientation: 'horizontal',
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
						orientation: 'horizontal',
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
		orientation: 'horizontal',
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
				orientation: 'horizontal',
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
		orientation: 'horizontal',
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
				orientation: 'horizontal',
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
];

const MENUITEMS_3 = [
	{
		type: 'menu',
		node: 'Parent Menuitem 1',
		orientation: 'horizontal',
		children: [
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
			{
				type: 'separator',
			},
		],
	},
	{
		type: 'menu',
		node: 'Parent Menuitem 2',
		orientation: 'horizontal',
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
				orientation: 'horizontal',
				children: [
					{
						type: 'menu',
						node: 'Nested Parent Menuitem',
						orientation: 'horizontal',
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
						orientation: 'horizontal',
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
				orientation: 'horizontal',
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
		orientation: 'horizontal',
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
	{
		type: 'separator',
	},
];

function App() {
	return (
		<main>
			<h1>Accordion</h1>
			<Accordion headerLevel={ 2 } sections={ DUMMY_ACCORDION_SECTIONS } />
			<h1>Menu, Menubar, Menu Button</h1>
			<MenuButton items={ MENUITEMS }>
				Menu Button
			</MenuButton>
			<MenuButton items={ MENUITEMS_2 } orientation="horizontal">
				Menu Button 2
			</MenuButton>
			<MenuButton items={ MENUITEMS_3 } orientation="horizontal">
				Menu Button 3
			</MenuButton>
			<MenuBarOne />
			<MenuBar label="Placeholder" items={ MENUITEMS_2 } orientation="vertical" />
			<MenuBar label="Placeholder" items={ MENUITEMS_3 } orientation="vertical" />
		</main>
	);
}

export default App;
