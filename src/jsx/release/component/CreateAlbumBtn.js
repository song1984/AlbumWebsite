import React from 'react';
import PropTypes from 'prop-types';

const CreateAlbumBtn = ({ toggleCreateAlbumDialogType })=>{
	return (
		<span
			className = "dt-createAlbum-btn"
			onClick = {
				e => {
					toggleCreateAlbumDialogType(true);
				}
			}
		>
			创建专辑
		</span>
	);
}

CreateAlbumBtn.propTypes = {
	toggleCreateAlbumDialogType: PropTypes.func.isRequired
};

export default CreateAlbumBtn