/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

export default function createMenuButtonManager(Component) {
	return class MenuButtonManager extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				isExpanded: false,
			};
		}

		//---- Rendering ----
		render() {
			const { isExpanded } = this.state;

			return (
				<Component
					isExpanded={ isExpanded }
					collapse={ this.collapse }
					expand={ this.expand }
					{ ...this.props }
				/>
			);
		}

		//---- Misc. ----
		collapse = (collapseAllParents, callback) => {
			this.setState({
				isExpanded: false,
			}, () => {
				if(typeof callback === 'function')
					callback();
			});
		};

		expand = (callback) => {
			this.setState({
				isExpanded: true,
			}, () => {
				if(typeof callback === 'function')
					callback();
			});
		};
	}
}
