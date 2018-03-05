import { connect } from 'react-redux';
import CreateAlbumDialog from '../components/CreateAlbumDialog';
import { toggleCreateAlbumDialogState, createNewAlbum } from '../actions/createAlbumDialogAction';
import { toggleAlertState } from '../actions/alertAction';

const mapStateToProps = (state) => {
	return {
		hotTags: state.content.writeContent.hotTags,
		createAlbumDialogState: state.site.UIContro.createAlbumDialogState
	}
};

const mapDispatchToProps = {
	toggleCreateAlbumDialogState,
	createNewAlbum,
	toggleAlertState
};

const CreateAlbumDialogContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateAlbumDialog);

export default CreateAlbumDialogContainer
