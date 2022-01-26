import React from 'react';

export default function createMenuManager(Component) {
	return class MenuManager extends React.Component {
		//---- Rendering ----
		render() {
			return (
				<Component {...this.props} />
			);
		}
	}
}
