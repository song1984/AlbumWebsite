const defaultState = {
	loginTabData: {
		tabType: false,
		needUpdate: true,
		thirdPart:[],
		registerLink:'',
		resetPWDLink:'',
		QRCodeSrc:''
	},
	userInfo:{

	}
}


const login = (state = defaultState, action)=>{
	
	let nextLoginTabData;

	switch(action.type){
		case 'SET_USER_INFO':
			return Object.assign({}, state,{userInfo: action.userInfo});
		case 'TOGGLE_LOGIN_TAB_TYPE':
			nextLoginTabData = Object.assign({}, state.loginTabData, {tabType: action.tabType});
			return Object.assign({}, state, {loginTabData: nextLoginTabData});
		case 'UPDATE_LOGINTAB_DATA':
			nextLoginTabData = Object.assign({}, state.loginTabData, action.loginTabData, {needUpdate:false});
			return Object.assign({}, state, {loginTabData: nextLoginTabData});
		default:
			return state;
	}
}

export default login