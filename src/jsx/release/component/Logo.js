import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

let Logo = () => (
	<Link
		to = {'/'}
		className = 'dt-logo'
	>
		<img src = "./img/logo.png" />
	</Link>
);


export default Logo