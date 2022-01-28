import React from 'react';

//Components and Styles
import MenuButton from 'src/Menu/MenuButton';

class MenuButtonOne extends React.Component {
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
			checkboxParent: false,
			checkboxChild1: false,
			checkboxChild2: false,
			checkboxChild3: false,
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

	onToggleCheckboxParent = () => {
		this.setState(state => {
			const { checkboxParent } = state;
			let newValue;

			if(checkboxParent || checkboxParent === 'mixed')
				newValue = false;
			else if(!checkboxParent)
				newValue = true;

			return {
				checkboxParent: newValue,
				checkboxChild1: newValue,
				checkboxChild2: newValue,
				checkboxChild3: newValue,
			};
		});
	};

	onToggleCheckboxChild1 = () => {
		this.setState(state => {
			const { checkboxChild1, checkboxChild2, checkboxChild3 } = state;
			const newChild1 = !checkboxChild1;
			const allTrue = newChild1 && checkboxChild2 && checkboxChild3;
			const allFalse = !newChild1 && !checkboxChild2 && !checkboxChild3;

			return {
				checkboxChild1: newChild1,
				checkboxParent: allTrue ? true : (allFalse ? false : 'mixed'),
			};
		});
	};

	onToggleCheckboxChild2 = () => {
		this.setState(state => {
			const { checkboxChild1, checkboxChild2, checkboxChild3 } = state;
			const newChild2 = !checkboxChild2;
			const allTrue = checkboxChild1 && newChild2 && checkboxChild3;
			const allFalse = !checkboxChild1 && !newChild2 && !checkboxChild3;

			return {
				checkboxChild2: newChild2,
				checkboxParent: allTrue ? true : (allFalse ? false : 'mixed'),
			};
		});
	};

	onToggleCheckboxChild3 = () => {
		this.setState(state => {
			const { checkboxChild1, checkboxChild2, checkboxChild3 } = state;
			const newChild3 = !checkboxChild3;
			const allTrue = checkboxChild1 && checkboxChild2 && newChild3;
			const allFalse = !checkboxChild1 && !checkboxChild2 && !newChild3;

			return {
				checkboxChild3: newChild3,
				checkboxParent: allTrue ? true : (allFalse ? false : 'mixed'),
			};
		});
	};

	//---- Rendering ----
	render() {
		return (
			<MenuButton label="Placeholder" items={ this.getItems() }>
				Test Button!
			</MenuButton>
		);
	}

	//---- Misc. ----
	getItems = () => {
		const {
			radioGroupOne, checkboxOneState, checkboxTwoState, radioGroupTwo,
			radioGroupThree, radioGroupFour, checkboxThreeState,
			checkboxParent, checkboxChild1, checkboxChild2, checkboxChild3,
		} = this.state;

		return [
			{
				type: 'menu',
				node: 'Parent Menuitem 1',
				children: [
					{
						type: 'radiogroup',
						onActivate: this.onChangeRadioGroupOne,
						children: [
							{
								node: 'Radio Option 1',
								value: 'option1',
								isChecked: radioGroupOne === 'option1',
							},
							{
								node: 'Radio Option 2',
								value: 'option2',
								isChecked: radioGroupOne === 'option2',
							},
							{
								node: 'Radio Option 3',
								value: 'option3',
								isChecked: radioGroupOne === 'option3',
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
				onActivate: this.onChangeRadioGroupFour,
				children: [
					{
						node: 'Radio Option 1',
						isChecked: radioGroupFour === 'option1',
						value: 'option1',
					},
					{
						node: 'Radio Option 2',
						isChecked: radioGroupFour === 'option2',
						value: 'option2',
					},
					{
						node: 'Radio Option 3',
						isChecked: radioGroupFour === 'option3',
						value: 'option3',
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
						isChecked: checkboxParent,
						onActivate: this.onToggleCheckboxParent,
					},
					{
						type: 'checkbox',
						node: 'Checkbox Child 1',
						isChecked: checkboxChild1,
						onActivate: this.onToggleCheckboxChild1,
					},
					{
						type: 'checkbox',
						node: 'Checkbox Child 2',
						isChecked: checkboxChild2,
						onActivate: this.onToggleCheckboxChild2,
					},
					{
						type: 'checkbox',
						node: 'Checkbox Child 3',
						isChecked: checkboxChild3,
						onActivate: this.onToggleCheckboxChild3,
					},
				],
			},
		];
	};
}

export default MenuButtonOne;
