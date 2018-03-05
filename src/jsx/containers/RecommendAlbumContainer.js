import { connect } from 'react-redux';
import RecommendAlbum from '../components/RecommendAlbum';
import { getRecommendAlbumData } from '../actions/recommendAlbumAction.js';

const mapStateToProps = (state)=>{
	return {
		logginUserId: state.content.readContent.recommendAlbumData.logginUserId,
		albums: state.content.readContent.recommendAlbumData.albums
	}
}

const mapDispatchToProps = {
	getRecommendAlbumData
}

const RecommendAlbumContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(RecommendAlbum);

export default RecommendAlbumContainer