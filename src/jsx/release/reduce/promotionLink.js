const defaultState = {
	promotionData:{
		link: '',
		name: ''	
	},
	needUpdate: true
}

const promotionLink = (state = defaultState, action) => {

	switch(action.type){
		case 'UPDATE_PROMOTIONLINK':
			return Object.assign({}, state, action.promotionLink, {needUpdate: false});
		default:
			return state;
	}
}


export default promotionLink