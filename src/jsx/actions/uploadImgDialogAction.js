import fetch from 'isomorphic-fetch';
import { uploadDialogState } from '../enum/enum';

export const toggleUploadImgDialogState = (state = uploadDialogState.CLOSE) => {
	
	function setUploadImgDialogState(state) {
		return {
			type: "TOGGLE_UPLOAD_IMG_DIALOG_STATE",
			uploadImgDialogState: state
		}
	}

	if(state === uploadDialogState.CLOSE || state === uploadDialogState.UPLOAD_FORM || state === uploadDialogState.UPLOADING || state === uploadDialogState.COMPLETE){
		return setUploadImgDialogState(state);
	}else if(state === uploadDialogState.SELECT_ABLUM){
		// 设置用户专辑
		function setUserAlbums(json){
			return {
				type: "SET_USER_ALBUMS",
				userAlbums: json.userAlbums
			}
		}
		// 设置热门标签
		function setHotTags(json){
			return {
				type: "SET_HOT_TAGS",
				hotTags: json.hotTags
			}
		}

		// 获得所有的热门标签 和 用户专辑
		return (dispatch) => {
			new Promise(function(resolve, reject){
				const url = `/data/userAlbum-data.json`;
				fetch(url).then(response => response.json()).then(json => dispatch(setUserAlbums(json))).then(() => resolve());
			}).then(function(){
				return new Promise(function(resolve, reject){
					const url = `/data/hotTags-data.json`;
					fetch(url).then(response => response.json()).then(json => dispatch(setHotTags(json))).then(() => resolve());
				})
			}).then(function(){
				dispatch(setUploadImgDialogState(state))
			})
		}
	}
}


export const uploadImgHandler = ()=>{
	// 设置上传图片后生成的缩略图
	function setUploadImgUrl(json) {
		return {
			type: "SET_UPLOAD_IMG_URL",
			uploadImgUrl: json
		}
	}

	// 上传图片处理函数
	return (dispatch)=>{
		new Promise(function(resolve, reject){
			dispatch(toggleUploadImgDialogState(uploadDialogState.UPLOADING));
			setTimeout(function(){	// 为了看清变化效果 临时添加定时器  待上传功能完整后取消定时器
				resolve();
			},3000)	
		}).then(function(){
			// 处理上传任务 
			// new Promise(function(resolve, reject){
			// 	let url = ``;
			// 	fetch(url).then(response => response.json()).then(dispatch(setUploadImgUrl(json))).then(resolve())
			// })
		}).then(function(){
			dispatch(toggleUploadImgDialogState(uploadDialogState.SELECT_ABLUM));
		})
	}
}

export const releasePicHandler = ()=>{
	// 发布图片处理函数
	return (dispatch)=>{
		new Promise(function(resolve, reject){
			dispatch(toggleUploadImgDialogState(uploadDialogState.COMPLETE));
			resolve();
		}).then(function(){
			// 异步更新服务端用户专辑信息 包括专辑 图片 的纪录插入
			// let url = ``;
			// fetch().then()
		})
	}
}

	


















