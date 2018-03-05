import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

let MyHomeLink = ({myHomeLink}) => {
	return (
		<Link
			to = {}
		>
			关注动态
		</Link>
	);
}

MyHomeLink.propTypes = {
	myHomeLink: PropTypes.string.isRequired
};

export default MyHomeLink