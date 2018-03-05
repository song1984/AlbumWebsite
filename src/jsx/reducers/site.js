import { uploadDialogState } from '../enum/enum';

const defaultState = {
	loginDialogData: {
		registerLink: '',
		resetPassword: '',
		otherLogin: [],
	},
	promotionLinkData: {
		link: '',
		name: ''
	},
	QRCodeData: {
		QRCodeSrc: '',
		btnImg: ''
	},
	menus: {
		mainMenuData: {
			navs: [],
			categorys: []
		},
		shortcutMenuData: [],
		userMenuData: {
			btn:{
				imgSrc: '',
				name: ''
			},
			menu: []
		}
	},
	UIContro: {
		createAlbumDialogState: false,
		loginDialogState: false,
		uploadImgDialogState: uploadDialogState.CLOSE,
		messageCenterTabState: false,
		alertState: false,
		pickUpDialog: false
	}
}

const site = (state = defaultState, action) => {
	switch(action.type){
		case "SET_LOGIN_DIALOG_DATA":
			return Object.assign({}, state, {loginDialogData: action.loginDialogData});

		case "SET_PROMOTION_LINK_DATA":
			return Object.assign({}, state, {promotionLinkData: action.promotionLinkData});

		case "SET_QRCODE_DATA":
			return Object.assign({}, state, {QRCodeData: action.QRCodeData});

		case "SET_MAIN_MENU_DATA":
			var tempState = Object.assign({}, state);
			tempState.menus.mainMenuData = action.mainMenuData;
			return Object.assign({}, state, tempState);

		case "SET_SHORTCUT_MENU_DATA":
			var tempState = Object.assign({}, state);
			tempState.menus.shortcutMenuData = action.shortcutMenuData;
			return Object.assign({}, state, tempState);

		case "SET_USER_MENU_DATA":
			var tempState = Object.assign({}, state);
			tempState.menus.userMenuData = action.userMenuData;
			return Object.assign({}, state, tempState);

		case "TOGGLE_CREATE_ALBUM_DIALOG_STATE":
			var tempState = Object.assign({}, state);
			tempState.UIContro.createAlbumDialogState = action.createAlbumDialogState;
			return Object.assign({}, state, tempState);

		case "TOGGLE_LOGIN_DIALOG_STATE":
			var tempState = Object.assign({}, state);
			tempState.UIContro.loginDialogState = action.loginDialogState;
			return Object.assign({}, state, tempState);

		case "TOGGLE_UPLOAD_IMG_DIALOG_STATE":
			var tempState = Object.assign({}, state);
			tempState.UIContro.uploadImgDialogState = action.uploadImgDialogState;
			return Object.assign({}, state, tempState);

		case "TOGGLE_MESSAGE_CENTER_TAB_STATE":
			var tempState = Object.assign({}, state);
			tempState.UIContro.messageCenterTabState = action.messageCenterTabState;
			return Object.assign({}, state, tempState);
 		
 		case "TOGGLE_ALERT_STATE":
 			var tempState = Object.assign({}, state);
			tempState.UIContro.alertState = action.alertState;
			return Object.assign({}, state, tempState);

		case "SET_PICK_UP_DIALOG_STATUS":
			var tempState = Object.assign({}, state);
			tempState.UIContro.pickUpDialog = action.isShow;
			return Object.assign({}, state, tempState);

		default:
			return state;
	}
};

export default site