import React from 'react';
import PropTypes from 'prop_types';
import { Link } from 'react-router';

let RegisterLink = ({ link }) => (
	<Link
		to = {link}
		style = {
			{
				textDecoration: 'none'
			}
		}
	>
		'注册'
	</Link>
);

RegisterLink.propTypes = {
	link: PropTypes.string.isRequired
};

export default RegisterLink