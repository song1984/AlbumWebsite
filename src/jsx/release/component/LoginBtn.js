import React from 'react';
import PropTypes from 'prop-types';

const LoginBtn = ({ toggleLoginTab }) => {
	
	return (
		<span 
			className = "dt-login-btn"
			onClick = {
				e => {
					toggleLoginTab(true)
				}
			}
		>
			登录
		</span>
	);
};

LoginBtn.propTypes = {
	toggleLoginTab: PropTypes.func.isRequired
};

export default LoginBtn