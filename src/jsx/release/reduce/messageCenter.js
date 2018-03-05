const defaultState = {
	state: false,
	tips: [],
	jointlyAlbum: [],
	privateMessage: [],
	friends: []
}

const messageCenter = (state=defaultState, action) => {
	switch(action.type){
		case "TOGGLE_MESSAGE_CENTER_STATUS":
			return Object.assign({}, state, {status: action.status})
		case "SET_TIPS":
			return Object.assign({}, state, {tips: action.tips})
		case "SET_JOINTLY_ALBUM":
			return Object.assign({}, state, {jointlyAlbum: action.jointlyAlbum})
		case "SET_PRIVATE_MESSAGE":
			return Object.assign({}, state, {privateMessage: action.privateMessage})
		case "SET_FRIENDS":
			return Object.assign({}, state, {friends: action.friends})
		default:
			return state;
	}
}

export default messageCenter