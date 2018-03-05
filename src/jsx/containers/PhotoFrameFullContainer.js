import { connect } from 'react-redux';
import PhotoFrameFull from '../components/PhotoFrameFull';
import { getPhotoFrameFullData } from '../actions/photoFrameFullAction';

const mapStateToProps = (state)=>{
	return{
		author: state.content.readContent.photoFrameFullData.author,
		album: state.content.readContent.photoFrameFullData.album,
		pics: state.content.readContent.photoFrameFullData.pics,
		img: state.content.readContent.photoFrameFullData.img,
		commentTotal: state.content.readContent.photoFrameFullData.commentTotal,
		likeTotal: state.content.readContent.photoFrameFullData.likeTotal,
		pickupTotal: state.content.readContent.photoFrameFullData.pickupTotal,
		tags: state.content.readContent.photoFrameFullData.tags,
		comments: state.content.readContent.photoFrameFullData.comments
	}
} 


const mapDispatchToProps = {
	getPhotoFrameFullData
}

const PhotoFrameFullContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(PhotoFrameFull);

export default PhotoFrameFullContainer