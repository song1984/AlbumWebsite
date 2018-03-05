import { connect } from 'react-redux';
import React from 'react';
import { toggleUploadImgDialogState } from '../actions/uploadImgDialogAction';
import { uploadDialogState } from '../enum/enum';

const UploadImgBtn = ({ toggleUploadImgDialogState }) => {
	return (
		<span
			onClick = {e => {toggleUploadImgDialogState(uploadDialogState.UPLOAD_FORM)}}
		>
			上传图片
		</span>
	);
};

const mapStateToProps = (state) => {
	
	return {
		
	}
};

const mapDispatchToProps = {
	toggleUploadImgDialogState
};

const UplaodImgBtnContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(UploadImgBtn);

export default UplaodImgBtnContainer