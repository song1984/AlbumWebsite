import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Dropdown from '../baseComponents/Dropdown';

const UserMenu = ({ userMenuData, updateUserMenu})=>{

	updateUserMenu();

	return (
		<div
			className = "dt-userMenu"
		>
			<Dropdown 
				btn = {{imageSrc:userMenuData.btn.imgSrc, name:userMenuData.btn.name}}
			>
				<ul>
					{
						userMenuData.menu.map((m, idx)=>{
							return (
								<Link key={idx} to = {m.link}>
									<li>
										<i></i>
										{ m.text }
									</li>
								</Link>
							);
						})
					}
				</ul>
			</Dropdown>
		</div>
	);
}

UserMenu.propTypes = {
	userMenuData: PropTypes.shape({
		btn: PropTypes.shape({
			imgSrc: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		}).isRequired,
		menu: PropTypes.arrayOf(PropTypes.shape({
			link: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired
		})).isRequired
	}).isRequired,
	updateUserMenu: PropTypes.func.isRequired
}

export default UserMenu