import fetch from 'isomorphic-fetch';

export const getRecommendAuthorData =()=>{

	const setRecommendAuthorData = (authors)=>{
		return {
			type: "SET_RECOMMENDAUTHOR_DATA",
			authors
		}
	}

	return (dispatch)=>{
		const url = `/data/recommendAuthor-data.json`;
		fetch(url).then(response=>response.json()).then(json=>dispatch(setRecommendAuthorData(json)));
	}
}