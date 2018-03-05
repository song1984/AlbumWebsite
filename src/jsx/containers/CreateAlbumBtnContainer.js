import { connect } from 'react-redux';
import React from 'react';
import { toggleCreateAlbumDialogState } from '../actions/createAlbumDialogAction';

const CreateAlbumBtn = ({ toggleCreateAlbumDialogState })=>{
	return (
		<span
			className = "dt-createAlbum-btn"
			onClick = {
				e => {
					toggleCreateAlbumDialogState(true);
				}
			}
		>
			创建专辑
		</span>
	);
}


const mapStateToProps = (state) => {
	return {

	}
};

const mapDispatchToProps = {
	toggleCreateAlbumDialogState
};

const CreateAlbumBtnContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateAlbumBtn);

export default CreateAlbumBtnContainer