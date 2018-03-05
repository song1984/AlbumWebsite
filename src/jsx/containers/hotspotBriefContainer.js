import { connect } from 'react-redux';
import HotspotBrief from '../components/HotspotBrief';
import { getHotspotBriefData, updateLikeCountForHotspotBrief, 
	addCommentForHotspotBrief } from '../actions/hotspotBriefAction';
import { togglePickUpDialog } from '../actions/pickUpDialogAction';


const mapStateToProps = (state) => {
	return {
		hotspotBriefDataArr: state.content.readContent.hotspotBrief
	}
}

const mapDispatchToProps = {
	getHotspotBriefData: getHotspotBriefData,
	updateLikeCount: updateLikeCountForHotspotBrief,
	addComment: addCommentForHotspotBrief,
	togglePickUpDialog: togglePickUpDialog
}

const HotspotBriefContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(HotspotBrief);

export default HotspotBriefContainer
