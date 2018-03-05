import { connect } from 'react-redux';
import { getPromotionData } from '../actions/actions';
import PromotionLink from '../components/PromotionLink';

const mapStateToProps = (state) => {
	return {
		promotionData: state.promotionLink.promotionData
	};
};

const mapDispatchToProps = {
	getPromotionData
};

const PromotionLinkContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(PromotionLink);

export default PromotionLinkContainer
