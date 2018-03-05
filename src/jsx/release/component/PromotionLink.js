import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

let PromotionLink = ({ promotionData, getPromotionData }) => {

	window.onload = getPromotionData();

	return (
		<Link
			to = {promotionData.link}
			className = 'dt-promotionLink'
		>
			{promotionData.name}
			<span>new</span>
		</Link>
	);
}

PromotionLink.propTypes = {
	promotionData: PropTypes.shape({
		link: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired
};

export default PromotionLink