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
				Hello world!
			</section>
		</>
	);
}
