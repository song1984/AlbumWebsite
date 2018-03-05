const defaultState = {
	isDisplay: false
}

const createAlbum = (state = defaultState, action) => {
	switch(action.type){
		case 'TOGGLE_CREATE_ALBUM_DIALOG_TYPE':
			return {isDisplay: action.isDisplay};
		default: 
			return state;
	}
}

export default createAlbum;