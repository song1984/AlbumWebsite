import fetch from 'isomorphic-fetch';

export const toggleCreateAlbumDialogState = (state = false) => {

	const setCreateAlbumDialogState = (state) => {
		return {
			type: "TOGGLE_CREATE_ALBUM_DIALOG_STATE",
			createAlbumDialogState: state
		}
	}

	const setHotTags = (json) => {
		return {
			type: "SET_HOT_TAGS",
			hotTags: json.hotTags
		}
	}

	if(state){
		return (dispatch) => {
			new Promise(function(resolve, reject){
				const url = `/data/hotTags-data.json`;
				fetch(url).then(response => response.json()).then(json => dispatch(setHotTags(json))).then(() => resolve());
			}).then(function(){
				dispatch(setCreateAlbumDialogState(state));
			})
		}	
	}else {
		return setCreateAlbumDialogState(state);
	}

}

export const createNewAlbum = () => {
	return (dispatch) => {
		new Promise(function(resolve, reject){
			// 服务端执行创建专辑任务
			resolve();
		}).then(function(){
			dispatch(toggleCreateAlbumDialogState())
		})
	}
}














