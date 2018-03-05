const defaultState = {
	btn:{
		imgSrc:"",
		name: ""
	},
	menu:[],
	needUpdate: true
}

const userMenu = (state=defaultState, action) => {
	switch(action.type){
		case "SET_USER_MENU": 
			return Object.assign({}, state, action.userMenuData, {needUpdate: false});
		default:
			return state;
	}
}

export default userMenu