import fetch from 'isomorphic-fetch';

export const getRecommendAlbumData = ()=>{
	
	const setRecommendAlbumData = (recommendAlbumData)=>{
		return {
			type: "SET_RECOMMEND_ALBUM_DATA",
			recommendAlbumData
		}
	}

	return (dispatch)=>{
		const url = `/data/recommendAlbum-data.json`;
		fetch(url).then(response=>response.json()).then(json=>dispatch(setRecommendAlbumData(json)));
	}

}