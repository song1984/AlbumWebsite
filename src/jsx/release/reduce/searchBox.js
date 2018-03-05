
const searchBox = (state = [], action)=>{
	switch(action.type){
		case 'UPDATE_SEARCH_RESULT':
			console.log(action.searchResult);
			return action.searchResult;
		default:
			return state
	}
};

export default searchBox