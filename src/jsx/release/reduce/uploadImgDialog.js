const defaultState = {
	currentDialogType: 'CLOSE',
	uploadImgUrl: '',
	userAlbums: [],
	hotTags: []
};

const uploadImgDialog = (state = defaultState, action) => {
	switch(action.type){
		case 'CHANGE_UPLOADOMG_DIALOG_TYPE':
			return Object.assign({}, state, {currentDialogType: action.currentDialogType});
		case 'UPLOAD_IMG_URL':
			return Object.assign({}, state, {uploadImgUrl: action.uploadImgUrl});
		case 'UPDATE_USERALBUMS':
			return Object.assign({}, state, {userAlbums: action.userAlbums});
		case 'UPDATE_HOTTAGS':
			return Object.assign({}, state, {hotTags: action.hotTags}); 
		default:
			return state;
	}
}

export default uploadImgDialog