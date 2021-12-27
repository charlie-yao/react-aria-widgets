import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import ParentMenuItem from 'src/Menu/ParentMenuItem';

/*
 * Some notes on props:
 *
 * - If the menubar has a visible label, a labelId prop that points towards
 * the labeling element should be provided. Otherwise, one should pass in
 * a label via the label prop. In other words, one XOR the other must be provided.
 */
class MenuBar extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
		menu: PropTypes.arrayOf(PropTypes.shape({
			type: PropTypes.oneOf(['menuitem', 'parentmenuitem', 'menuitemcheckbox', 'menuitemradio', 'separator']),
			node: PropTypes.node.isRequired,
			menuItems: PropTypes.array, //only relevant for "parentmenuitem"
		})).isRequired,
		label: PropTypes.string, //eslint-disable-line react/require-default-props
		labelId: PropTypes.string, //eslint-disable-line react/require-default-props
	};

	static defaultProps = {
		orientation: 'horizontal',
	};

	constructor(props) {
		super(props);
	}

	//---- Events ----

	//---- Rendering ----
	render() {
		const { children, orientation, label, labelId } = this.props;

		return (
			<ul
				role="menubar"
				aria-orientation={ orientation }
				aria-labelledby={ labelId }
				aria-label={ label }
			>
				<ParentMenuItem />
				<li role="none">
					<a
						href="#"
						role="menuitem"
						aria-haspopup="menu"
						aria-expanded={ false }
						aria-disabled={ false }
						tabindex="-1"
					>
						Parent Menuitem 2
					</a>
					<ul role="menu">
						<li role="menuitem" aria-disabled={ false } tabindex="-1">
							Hello world!
						</li>
						<li role="menuitem" aria-disabled={ false } tabindex="-1">
							Hello world!
						</li>
						<li role="menuitem" aria-disabled={ false } tabindex="-1">
							Hello world!
						</li>
					</ul>
				</li>
				<li role="menuitem" aria-disabled={ false } tabindex="-1">
					Hello world!
				</li>
				<li role="none">
					<a
						href="#"
						role="menuitem"
						aria-haspopup="menu"
						aria-expanded={ false }
						aria-disabled={ false }
						tabindex="-1"
					>
						Parent Menuitem 3
					</a>
					<ul role="menu">
						<li role="menuitem" aria-disabled={ false } tabindex="-1">
							Hello world!
						</li>
						<li role="menuitem" aria-disabled={ false } tabindex="-1">
							Hello world!
						</li>
						<li role="none">
							<a
								href="#"
								role="menuitem"
								aria-haspopup="menu"
								aria-expanded={ false }
								aria-disabled={ false }
								tabindex="-1"
							>
								Nested Parent Menuitem
							</a>
							<ul role="menu">
								<li role="menuitem" aria-disabled={ false } tabindex="-1">
									Hello world!
								</li>
								<li role="menuitem" aria-disabled={ false } tabindex="-1">
									Hello world!
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		);
	}
}

export default MenuBar;
