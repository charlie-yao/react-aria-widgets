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
			radioGroupThree: undefined,
			radioGroupFour: undefined,
			checkboxThreeState: false,
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

	onChangeRadioGroupTwo = (event) => {
		this.setState({
			radioGroupTwo: event.target.dataset.value,
		});
	};

	onChangeRadioGroupThree = (event) => {
		this.setState({
			radioGroupThree: event.target.dataset.value,
		});
	};

	onChangeRadioGroupFour = (event) => {
		this.setState({
			radioGroupFour: event.target.dataset.value,
		});
	};

	onToggleCheckboxThree = () => {
		this.setState(state => {
			return {
				checkboxThreeState: !state.checkboxThreeState,
			};
		});
	};

	onActivateItem = () => {
		alert('Hello from menubar item!');
	};

	onActivateSubmenuItem = (event) => {
		alert(`Hello from ${event.target.textContent}`);
	};

	//---- Rendering ----
	render() {
		return (
			<MenuBar label="Placeholder" items={ this.getItems() } />
		);
	}

	//---- Misc. ----
	getItems = () => {
		const {
			radioGroupOne, checkboxOneState, checkboxTwoState, radioGroupTwo,
			radioGroupThree, radioGroupFour, checkboxThreeState,
		} = this.state;

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
						onActivate: this.onChangeRadioGroupTwo,
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
				type: 'item',
				node: 'Hello world!',
				onActivate: this.onActivateItem,
			},
			{
				type: 'menu',
				node: 'Parent Menuitem 2',
				children: [
					{
						type: 'item',
						node: 'Hello world!',
						onActivate: this.onActivateSubmenuItem,
					},
					{
						type: 'item',
						node: 'Hello world!',
						onActivate: this.onActivateSubmenuItem,
					},
					{
						type: 'menu',
						node: 'Nested Parent Menuitem',
						children: [
							{
								type: 'item',
								node: 'Hello world!',
								onActivate: this.onActivateSubmenuItem,
							},
							{
								type: 'item',
								node: 'Hello world!',
								onActivate: this.onActivateSubmenuItem,
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
				onActivate: this.onChangeRadioGroupThree,
				children: [
					{
						node: 'Radio Option 1',
						isChecked: radioGroupThree === 'option1',
						value: 'option1',
					},
					{
						node: 'Radio Option 2',
						isChecked: radioGroupThree === 'option2',
						value: 'option2',
					},
					{
						node: 'Radio Option 3',
						isChecked: radioGroupThree === 'option3',
						value: 'option3',
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
						isChecked: radioGroupFour === 'option1',
						value: 'option1',
						onActivate: this.onChangeRadioGroupFour,
					},
					{
						node: 'Radio Option 2',
						isChecked: radioGroupFour === 'option2',
						value: 'option2',
						onActivate: this.onChangeRadioGroupFour,
					},
					{
						node: 'Radio Option 3',
						isChecked: radioGroupFour === 'option3',
						value: 'option3',
						onActivate: this.onChangeRadioGroupFour,
					},
				],
			},
			{
				type: 'separator',
			},
			{
				type: 'checkbox',
				node: 'Checkbox 3',
				onActivate: this.onToggleCheckboxThree,
				isChecked: checkboxThreeState,
			},
			{
				type: 'menu',
				node: 'Parent Menuitem 3',
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
