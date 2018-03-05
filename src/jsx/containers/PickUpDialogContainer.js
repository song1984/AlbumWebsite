import { connect } from 'react-redux';
import PickUpDialog from '../components/PickUpDialog';
import { togglePickUpDialog, pickUpImgHandler } from '../actions/pickUpDialogAction';

const mapStateToProps = (state) => {
	return {
		albums: state.content.readContent.pickUpData.albums,
		userID: state.content.readContent.pickUpData.userID,
		img: state.content.readContent.pickUpData.img,
		pickUpDialogStatus: state.site.UIContro.pickUpDialog
	}
}


const mapDispatchToProps = {
	togglePickUpDialog,
	pickUpImgHandler
}

const PickUpDialogContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(PickUpDialog)

export default PickUpDialogContainer