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

	constructor(props) {
		super(props);

		this.state = {
			radioGroupOne: undefined,
			checkboxOneState: false,
			checkboxTwoState: false,
			radioGroupTwo: undefined,
		};
	}

	//---- Events ----
	onChangeRadioGroupOne = (event) => {
		this.setState({
			radioGroupOne: event.target.dataset.value,
		});
	};

	onToggleCheckboxOne = () => {
		this.setState(state => {
			return {
				checkboxOneState: !state.checkboxOneState,
			};
		});
	};

	onToggleCheckboxTwo = () => {
		this.setState(state => {
			return {
				checkboxTwoState: !state.checkboxTwoState,
			};
		});
	};

	onToggleRadioGroupTwo = (event) => {
		this.setState({
			radioGroupTwo: event.target.dataset.value,
		});
	};

	//---- Rendering ----
	render() {
		return (
			<MenuBar label="Placeholder" items={ this.getItems() } />
		);
	}

	//---- Misc. ----
	getItems = () => {
		const { radioGroupOne, checkboxOneState, checkboxTwoState, radioGroupTwo } = this.state;

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
								value: 'option1',
								isChecked: radioGroupOne === 'option1',
								onActivate: this.onChangeRadioGroupOne,
							},
							{
								node: 'Radio Option 2',
								value: 'option2',
								isChecked: radioGroupOne === 'option2',
								onActivate: this.onChangeRadioGroupOne,
							},
							{
								node: 'Radio Option 3',
								value: 'option3',
								isChecked: radioGroupOne === 'option3',
								onActivate: this.onChangeRadioGroupOne,
							},
						],
					},
					{
						type: 'separator',
					},
					{
						type: 'checkbox',
						node: 'Checkbox 1',
						isChecked: checkboxOneState,
						onActivate: this.onToggleCheckboxOne,
					},
					{
						type: 'checkbox',
						node: 'Checkbox 2',
						isChecked: checkboxTwoState,
						onActivate: this.onToggleCheckboxTwo,
					},
					{
						type: 'separator',
					},
					{
						type: 'radiogroup',
						onActivate: this.onToggleRadioGroupTwo,
						children: [
							{
								node: 'Radio Option 1',
								isChecked: radioGroupTwo === 'option1',
								value: 'option1',
							},
							{
								node: 'Radio Option 2',
								isChecked: radioGroupTwo === 'option2',
								value: 'option2',
							},
							{
								node: 'Radio Option 3',
								isChecked: radioGroupTwo === 'option3',
								value: 'option3',
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
