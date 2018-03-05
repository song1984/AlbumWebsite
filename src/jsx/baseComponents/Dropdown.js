import React from 'react';
import PropTypes from 'prop-types';


const Dropdown = ({ btn, children }) => {

	let imgElem = btn.imageSrc ? <img src = {btn.imageSrc} /> : '';

	return (
		<div className = 'dt-base-dropdown' >
			<div 
				className = 'dt-base-dropdown-btn' 
			>
				{ imgElem }
				<a onClick = { e => e.preventDefault() } >
					{ btn.name }
				</a>
				<i></i>
			</div>
			<div className = 'dt-base-dropdown-menu'>
				{ children }
			</div>
		</div>
	);
};

Dropdown.propTypes = {
	
	btn: PropTypes.shape({
		imageSrc: PropTypes.string,
		name: PropTypes.string.isRequired
	}).isRequired,

	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array,
		PropTypes.element
	])
};

export default Dropdown

