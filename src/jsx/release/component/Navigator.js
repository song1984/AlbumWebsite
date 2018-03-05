import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import MenuContainer from '../containers/MenuContainer';
import SearchBoxContainer from '../containers/SearchBoxContainer';
import LoginGroup from './LoginGroup';

let Navigator = ()=>{
	return (
		<nav>
			<Logo />
			<MenuContainer />
			<SearchBoxContainer />
			<LoginGroup />
		</nav>			
	);
};

export default Navigator