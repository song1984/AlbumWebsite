import React from 'react';
import PropTypes from 'prop-types';

const UploadImgBtn = ({ changeDialogType, diagoType}) => {
	return (
		<span
			onClick = {e => {changeDialogType(diagoType)}}
		>
			上传图片
		</span>
	);
};

UploadImgBtn.propTypes = {
	changeDialogType: PropTypes.func.isRequired,
	diagoType: PropTypes.string.isRequired
};

export default UploadImgBtn