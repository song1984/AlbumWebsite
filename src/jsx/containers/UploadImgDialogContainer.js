import { connect } from 'react-redux';
import UploadImgDialog from '../components/UploadImgDialog';
import {toggleUploadImgDialogState, uploadImgHandler, releasePicHandler} from '../actions/uploadImgDialogAction';
import { uploadDialogState } from '../enum/enum';


const mapStateToProps = (state)=>{

	return {
		uploadDialogState: uploadDialogState,
		uploadImgDialogState: state.site.UIContro.uploadImgDialogState,
		uploadImgUrl: state.content.writeContent.uploadImgUrl,
		userAlbums: state.content.writeContent.userAlbums,
		hotTags: state.content.writeContent.hotTags
	}
};

const mapDispatchToProps = {
	toggleUploadImgDialogState, 
	uploadImgHandler, 
	releasePicHandler
};

const UploadImgDialogContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(UploadImgDialog);

export default UploadImgDialogContainer