import { connect } from 'react-redux';
import Carousel from '../components/Carousel';
import { getCarouselData } from '../actions/carouselAction';

const mapStateToProps = (state) => {
	return {
		pics: state.content.readContent.carousel.pics
	}
}

const mapDispatchToProps = {
	getCarouselData
}

const CarouselContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Carousel);

export default CarouselContainer