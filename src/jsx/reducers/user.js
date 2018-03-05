/*
	avatar 用户头像
*/
const defaultState = {
	loginState: false,
	userInfo: {
		avatar: ''
	}
}

const user = (state = defaultState, action) => {
	switch(action.type){
		case "SET_USER_INFO":
			return Object.assign({}, state, {userInfo: action.userInfo});

		case "SET_LOGIN_STATE":
			return Object.assign({}, state, {loginState: action.loginState});

		default:
			return state;
	}
};

export default user
