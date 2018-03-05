import fetch from 'isomorphic-fetch';


/*
	Menu组件相关action 
		获得菜单内容
*/

/*
	dtFetch 异步action 工具
*/

function dtFetch(url, callback, dispatch) {

	fetch(url).then( response => response.json() ).then( json => dispatch(callback(json)));
};


export const getMenuData = () => {

	return function(dispatch, getState){

		if(getState().menu.menuData.needUpdate){

			function setMenuData(menuDataRoot) {
				return {
					type: 'MENU_UPDATE',
					menuDataRoot 
				}
			}

			let url =`./data/menu-data.json`;
			dtFetch(url, setMenuData, dispatch);
		}else {
			return;
		}
	}
};


/*
	SearchBox 组件相关内容
		通过用户输入查询后台
*/

export const search = (inputText) => {

	console.log('search text: ' + inputText);
	return {
		type: 'UPDATE_SEARCH_RESULT',
		searchResult: [
			{
				id: 1,
				title: 'aaaa',
				link: '###'
			},{
				id: 2,
				title: 'bbbb',
				link: '###'
			}
		]
	}

	// 暂无后端 函数不能实现

	// function updateSearchResult(searchResult){
	// 	return {
	// 		type: 'UPDATE_SEARCH_RESULT',
	// 		searchResult
	// 	}
	// };

	// return getSearchResult(dispatch){
	// 	let url;
	// 	return fetch(url+inputText)
	// 		.then((response)=>response.json())
	// 		.then((json)=> dispatch(updateSearchResult(json)))

	// }
};


/*
	LoginGroup部分
		PromotionLink 组件异步更新数据
*/

export const getPromotionData = ()=>{

	return function(dispatch, getState){

		if(getState().promotionLink.needUpdate){

			function promotionUpdate(promotionLink){
				return {
					type: 'UPDATE_PROMOTIONLINK',
					promotionLink
				}
			}

			const url = `./data/promotionLink-data.json`;
			dtFetch(url, promotionUpdate, dispatch);
		}else {
			return;
		}
	}
};


/*
	LoginGroup部分
		Login 组件 
			开关tab
			登录数据提交
			onload 更新初始数据
*/

export const toggleLoginTab = (tabType = false) => {

	return {
		type: 'TOGGLE_LOGIN_TAB_TYPE',
		tabType
	}
};

export const submitLogin = (userInput) => {

	function setUserInfo(userInfo){
		return {
			type: 'SET_USER_INFO',
			userInfo
		}
	};
	/* 
		延后再做 
	*/
};

export const getLoginTabDataFromServer = () => {

	return function(dispatch, getState){
		// 异步获得第三方登录 和 二维码	
		if(getState().login.loginTabData.needUpdate){

			function updateLoginData(loginTabData){
				return {
					type: 'UPDATE_LOGINTAB_DATA',
					loginTabData
				}
			};

			const url = `./data/login-data.json`;
			dtFetch(url, updateLoginData, dispatch);
		}else {
			return;
		}
	}
};

/*
	QRCode onload 获得二维码图片地址
*/

export const getQRCode = () => {

	return (dispatch, getState) => {
		if(getState().QRCode.needUpdate) {

			const updateQRCode = (QRCodeData) => {
				return {
					type: 'UPDATE_QRCODE_SRC',
					QRCodeData
				}
			}

			const url = `./data/QRCode-data.json`;
			dtFetch(url, updateQRCode, dispatch);
		}else {
			return;
		}
	}
};

/*
	登录后 快捷工具菜单 
		就是一些 上传图片 制作专辑 推荐活动 的快捷入口 
*/

export const getShortcutMenuData = () => {
	return (dispatch, getState) => {
		if(getState().shortcutMenu.needUpdate) {
			function updateShortcutMenuData(shortcutMenu){
				return {
					type: 'UPDATE_SHORTCUTMENU_DATA',
					shortcutMenu
				};
			};

			const url = `./data/shortcutMenu-data.json`;
			dtFetch(url, updateShortcutMenuData, dispatch);
		}else {
			return;
		}
	}
};



/*
	上传图片
*/

export const uploadDialogType = {
	CLOSE: 'CLOSE',
	UPLOAD_FORM:'UPLOAD_FORM',
	UPLOADING: 'UPLOADING',
	SELECT_ABLUM: 'SELECT_ABLUM',
	COMPLETE: 'COMPLETE'
};

export const changeDialogType = (nextDialogType = uploadDialogType.CLOSE) => {

	return  {
		type: 'CHANGE_UPLOADOMG_DIALOG_TYPE',
		currentDialogType: nextDialogType
	};
};

/*
	异步上传图片 待后端完成后再实现
*/
export const uploadImgHandler = (uploadImgUrl) => {
	// 上传中 窗口状态改为正在上传
	// changeDialogType(UPLOADING)

	// 执行异步上传 promise fetch
	/*   暂缺  */

	// then  更新 state duploadImgUrl 这个就是缩略图的地址
	// function setUploadImgUrl(uploadImgUrl){
	// 	return {
	// 		type: 'UPLOAD_IMG_URL',
	// 		uploadImgUrl
	// 	}
	// }

	// then 获得用户的专辑列表
	// then 获得热门标签
	// then 上传完毕后 窗口状态改为 选择专辑
	return (dispatch) => {

		function updateAlbums(json) {
			return {
				type: 'UPDATE_USERALBUMS',
				userAlbums: json.userAlbums
			}
		}

		function updateHotTags(json){
			return {
				type: 'UPDATE_HOTTAGS',
				hotTags: json.hotTags
			}
		}

		new Promise(function(resolve, reject){
			const url = "./data/userAlbum-data.json";
			fetch(url).then(response=> response.json()).then(json=>dispatch(updateAlbums(json))).then(() => resolve());
		})
		.then(function(){
			return new Promise(function(resolve, reject){
				const url = "./data/hotTags-data.json";
				fetch(url).then(response=> response.json()).then(json=>dispatch(updateHotTags(json))).then(() => resolve());
			})
		})
		.then(function(){
			dispatch(changeDialogType(uploadDialogType.SELECT_ABLUM));
		})

	}
};


/*
	发布图片，并更改图片上传对话框状态
	等后端完成后再实现
*/
export const releasePic = ()=>{
	// 发布图片 就是把seletAlbum的表单提交给服务器 fetch 

	// then 提交结束后 把上传图片对话框改为 完成状态
	changeDialogType(uploadDialogType.COMPLETE)
}


/*
	创建专辑组件对应action 开始
*/
// 切换对话框显示隐藏状态
export const toggleCreateAlbumDialogType = (isDisplay=false) => {

	function updateHotTags(json){
		return {
			type: 'UPDATE_HOTTAGS',
			hotTags: json.hotTags
		}
	}

	function updateCreateAlbumDialogType (){
		return {
			type: "TOGGLE_CREATE_ALBUM_DIALOG_TYPE",
			isDisplay
		}
	}

	if(isDisplay){
		return function (dispatch, getState){
			const url = "./data/hotTags-data.json";
			fetch(url)
				.then(response=> response.json())
				.then(json=>dispatch(updateHotTags(json)))
				.then(()=>{dispatch(updateCreateAlbumDialogType(isDisplay));})
		}
	}else{
		return updateCreateAlbumDialogType();
	}	
}

// 创建专辑   暂未实现
export const createNewAlbum = (albumInfomation) => {
	// 异步请求后台创建专辑

	// 关闭对话框

}

/*
	创建专辑组件对应action 结束
*/

/*
	消息中心 相关action 开始
*/

// 消息中心状态 开关action, 打开时 要进行异步获得数据 关闭时 只需要同步 变更状态
export const toggleMessageCenterStatus = (status=false) => {

	function setMessageCenterStatus(status){
		return {
			type: "TOGGLE_MESSAGE_CENTER_STATUS",
			status
		}
	}

	function setTips(json){
		return {
			type: "SET_TIPS",
			tips: json.tips
		}
	}

	function setJointlyAlbum(json){
		return {
			type: "SET_JOINTLY_ALBUM",
			jointlyAlbum: json.jointlyAlbum
		}
	}

	function setPrivateMessage(json){
		return {
			type: "SET_PRIVATE_MESSAGE",
			privateMessage: json.privateMessage
		}
	}

	function setFriends(json){
		return {
			type: "SET_FRIENDS",
			friends: json.friends
		}
	}

	if(status){
		return (dispatch, getState) => {
			new Promise((resolve, reject)=>{
				const url = "./data/tips-data.json";
				fetch(url).then(response => response.json()).then(json => dispatch(setTips(json))).then(resolve());
			})
			.then(function(){
				return new Promise((resolve, reject)=>{
					const url = "./data/jointlyAlbumArr-data.json";
					fetch(url).then(response => response.json()).then(json => dispatch(setJointlyAlbum(json))).then(resolve());
				})
			})
			.then(function(){
				return new Promise((resolve, reject)=>{
					const url = "./data/privateMessage-data.json";
					fetch(url).then(response => response.json()).then(json => dispatch(setPrivateMessage(json))).then(resolve());
				})
			})
			.then(function(){
				return new Promise((resolve, reject)=>{
					const url = "./data/friends-data.json";
					fetch(url).then(response => response.json()).then(json => dispatch(setFriends(json))).then(resolve());
				})
			})
			.then(function(){
				dispatch(setMessageCenterStatus(status))
			})
		}

	}else {
		return setMessageCenterStatus(status);
	}
}

/*
	消息中心 相关action 结束
*/

/*
	userMenu action 开始 
*/
// 更新 用户菜单
export const updateUserMenu = ()=>{
	function setUserMenu(json){
		return {
			type: "SET_USER_MENU",
			userMenuData: json.userMenuData
		}
	};

	return function(dispatch, getState){
		if(getState().userMenu.needUpdate){
			const url = "./data/userMenu-data.json";
			fetch(url).then(response => response.json()).then(json => dispatch(setUserMenu(json)))
		}
	}
}
/*
	userMenu action 结束 
*/



















