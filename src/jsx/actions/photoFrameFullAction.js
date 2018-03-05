import fetch from 'isomorphic-fetch';

export const getPhotoFrameFullData = ()=>{

	const setPhotoFrameFullData = (photoFrameFUllData) => {
		return {
			type: "SET_PHOTOFRAMEFULL_DATA",
			photoFrameFUllData
		}
	}

	return (dispatch)=>{
		const url = `/data/photoFrameFUll-data.json`;
		fetch(url).then(response => response.json()).then(json=>dispatch(setPhotoFrameFullData(json)));
	}
}