import fetch from 'isomorphic-fetch';

// 打开收藏对话框
export const togglePickUpDialog = (status = false)=>{
	// 异步 获得用户的专辑列表 和 被收藏图片的基本信息
	// 同步 更改收藏对话框UI状态
	const setPickUpData = (pickUpData) => {
		return {
			type: "SET_PICK_UP_DATA",
			pickUpData
		}
	}

	const setPickUpDialogStatus = (isShow) => {
		return {
			type: "SET_PICK_UP_DIALOG_STATUS",
			isShow
		}
	}

	if(status){
		return (dispatch)=>{
			new Promise((resolve, reject)=>{
				const url = `/data/pickUp-data.json`;
				fetch(url).then(response => response.json()).then(json => dispatch(setPickUpData(json))).then(resolve());
			})
			.then(dispatch(setPickUpDialogStatus(status)))
		}
	}else{
		return setPickUpDialogStatus(status);
	}
}

// 收藏函数暂缺
export const pickUpImgHandler = (img)=>{
	return {
		type: ''
	}
}