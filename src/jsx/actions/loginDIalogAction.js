import fetch from 'isomorphic-fetch';

export const toggleLoginDialog = (state = false) => {

	function setLoginDialogState (state){
		return {
			type: "TOGGLE_LOGIN_DIALOG_STATE",
			loginDialogState: state
		}
	}

	// 获得登录窗口数据, 第三方登录链接， 二维码信息
	if(state){
		// 设置登录窗口数据
		function setLoginDialogData(json){
			return {
				type: "SET_LOGIN_DIALOG_DATA",
				loginDialogData: json
			}
		}
		// 设置登录窗口二维码数据
		function setQRCodeData(json){
			return {
				type: "SET_QRCODE_DATA",
				QRCodeData: json
			}
		}

		return (dispatch) => {
			new Promise(
				function(resolve, reject){
					const url = `/data/QRCode-data.json`;
					fetch(url).then(response => response.json()).then(json => dispatch(setQRCodeData(json))).then(resolve());
				}
			).then(function(){
				new Promise(function(resolve, reject){
					const url = `/data/loginDialog-data.json`;
					fetch(url).then(response => response.json()).then(json => dispatch(setLoginDialogData(json))).then(resolve());
				})
			}).then(function(){
				dispatch(setLoginDialogState(state));
			})
		}


	}else{
		return setLoginDialogState(state);
	}
}


export const loginSubmit = () => {
	// 异步提交数据
}