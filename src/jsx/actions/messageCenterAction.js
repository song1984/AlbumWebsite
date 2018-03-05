import fetch from 'isomorphic-fetch';

export const toggleMessageCenterTabState = (state = false) =>{
	
	const setMessageCenterTabState = (state) => {
		return {
			type: "TOGGLE_MESSAGE_CENTER_TAB_STATE",
			messageCenterTabState: state
		}
	}

	if(state){
		const setTips = (json) => {
			return {
				type: "SET_TIPS",
				tips: json.tips
			}
		}

		const setJointlyAlbum = (json) => {
			return {
				type: "SET_JOINTLY_ALBUM",
				jointlyAlbum: json.jointlyAlbum
			}
		}

		const setPrivateMessage = (json) => {
			return {
				type: "SET_PRIVATE_MESSAGE",
				privateMessage: json.privateMessage
			}
		}

		const setFriends = (json) => {
			return {
				type: "SET_FRIENDS",
				friends: json.friends
			}
		}

		return (dispatch) => {
			new Promise(function(resolve, reject){
				const url = `/data/tips-data.json`;
				fetch(url).then(response => response.json()).then(json => dispatch(setTips(json))).then(() => resolve());
			}).then(function(){
				return new Promise(function(resolve, reject){
					const url = `/data/jointlyAlbumArr-data.json`;
					fetch(url).then(response => response.json()).then(json => dispatch(setJointlyAlbum(json))).then(() => resolve());
				})
			}).then(function(){
				return new Promise(function(resolve, reject){
					const url = `/data/privateMessage-data.json`;
					fetch(url).then(response => response.json()).then(json => dispatch(setPrivateMessage(json))).then(() => resolve());
				})
			}).then(function(){
				return new Promise(function(resolve, reject){
					const url = `/data/friends-data.json`;
					fetch(url).then(response => response.json()).then(json => dispatch(setFriends(json))).then(() => resolve());
				})
			}).then(function(){
				dispatch(setMessageCenterTabState(state));
			})
		}
	}else {
		return setMessageCenterTabState(state);
	}
}