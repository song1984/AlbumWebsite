import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Dropdown from '../baseComponents/Dropdown';
import UploadImgBtnContainer from '../containers/UploadImgBtnContainer';
import CreateAlbumBtnContainer from '../containers/CreateAlbumBtnContainer';

const ShortcutMenu = ({shortcutMenuData, getShortcutMenuData}) => {

	window.onload = getShortcutMenuData();

	return (
		<div className = "dt-shortcutMenu" >
			<Dropdown btn = { {name: ''} } >
				<ul>
					<li>
						<i></i>
						<UploadImgBtnContainer />
					</li>
					<li>
						<i></i>
						<CreateAlbumBtnContainer />
					</li>
					{
						shortcutMenuData.map((md, idx) => {
							return (
								<li key = {idx} >
									<i></i>
									<Link to = {md.link}>
										{md.name}
									</Link>
								</li>
							);
						})
					}
				</ul>
			</Dropdown>
		</div>
	); 
};

ShortcutMenu.PropTypes = {
	shortcutMenuData: PropTypes.arrayOf(PropTypes.shape({
		link: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	})).isRequired,
	getShortcutMenuData: PropTypes.func
};

export default ShortcutMenu

