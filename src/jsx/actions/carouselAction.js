import fetch from 'isomorphic-fetch';

export const getCarouselData = () => {
	
	const setCarouselData = (pics) => {
		return {
			type: "SET_CAROUSEL_DATA",
			pics
		}
	}

	return (dispatch) => {
		const url = `/data/carousel-data.json`;
		fetch(url).then(response => response.json()).then(json => dispatch(setCarouselData(json)));
	}
}