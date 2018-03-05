import { connect } from 'react-redux';
import RecommendAuthor from '../components/RecommendAuthor';
import { getRecommendAuthorData } from '../actions/recommendAuthorAction';

const mapStateToProps = (state)=>{
	return {
		authors: state.content.readContent.recommendAuthorData.authors
	}
}

const mapDispatchToProps = {
	getRecommendAuthorData
}

const RecommendAuthorContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(RecommendAuthor);

export default RecommendAuthorContainer