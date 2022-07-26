import React from 'react';

export default function renderFunction(props) {
	const {
		id,
		index,
		headerLevel,
		getIsExpanded,
		getIsDisabled,
		setHeaderRef,
		toggleSection,
		focusPrevHeader,
		focusNextHeader,
		focusFirstHeader,
		focusLastHeader,
	} = props;
	const isExpanded = getIsExpanded(id);
	const isDisabled = getIsDisabled(id);
	const HeaderElement = `h${headerLevel}`;
	const contentId = `${id}-panel`;
	const style = {};

	const onClick = () => {
		toggleSection(id);	
	};

	const onKeyDown = (event) => {
		const { key } = event;

		if(key === 'ArrowUp') {
			event.preventDefault();
			focusPrevHeader(index);
		}
		else if(key === 'ArrowDown') {
			event.preventDefault();
			focusNextHeader(index);
		}
		else if(key === 'Home') {
			event.preventDefault();
			focusFirstHeader();
		}
		else if(key === 'End') {
			event.preventDefault();
			focusLastHeader();
		}
	};

	if(!isExpanded)
		style.display = 'none';

	return (
		<> 
			<HeaderElement className="defaultHeaderClass">
				<button
					type="button"
					className="defaultButtonClass"
					id={ id }
					aria-controls={ contentId }
					aria-expanded={ isExpanded }
					aria-disabled={ isDisabled }
					onClick={ onClick }
					onKeyDown={ onKeyDown }
					ref={ setHeaderRef }
				>
					CustomAccordion - Section 4
				</button>
			</HeaderElement>
			<section
				id={ contentId }
				aria-labelledby={ id }
				className="defaultPanelClass"
				style={ style }
			>
				Aenean eu metus sollicitudin, sollicitudin metus vitae, tempor magna.
				Quisque faucibus massa efficitur lorem consectetur, quis sodales nunc pretium.
				Nunc rutrum risus id nisl facilisis, eu gravida ex vestibulum. Curabitur varius auctor
				magna a maximus. Aenean tortor nulla, posuere vitae sollicitudin a, semper vitae nulla.
				Praesent ullamcorper magna vitae dui faucibus, lacinia cursus augue sagittis. Phasellus
				elementum tempor iaculis. Vivamus vehicula ex eu nunc volutpat, in ultrices magna finibus.
				Fusce egestas velit in lobortis vestibulum. Vestibulum sodales venenatis turpis, eu convallis
				nisi suscipit sit amet. Aenean placerat ullamcorper nulla quis varius. In in consectetur
				augue, ac consequat sem. Quisque at ultrices arcu, et aliquam purus. Donec varius justo non
				suscipit fermentum. Etiam a nisl at ipsum imperdiet faucibus.				
			</section>
		</>
	);
}
