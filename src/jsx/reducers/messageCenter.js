const defaultState = {
	tips: [],
	jointlyAlbum: [],
	privateMessage: [],
	friends: [],
	alertContent: ''
}

const messageCenter = (state=defaultState, action) => {
	switch(action.type){
		case "SET_TIPS":
			return Object.assign({}, state, {tips: action.tips})
		case "SET_JOINTLY_ALBUM":
			return Object.assign({}, state, {jointlyAlbum: action.jointlyAlbum})
		case "SET_PRIVATE_MESSAGE":
			return Object.assign({}, state, {privateMessage: action.privateMessage})
		case "SET_FRIENDS":
			return Object.assign({}, state, {friends: action.friends})
		case "SET_ALERT_CONTENT":
			return Object.assign({}, state, {alertContent: action.alertContent})
		default:
			return state;
	}
}

export default messageCenter