/*
	readContent: 任何被用户阅读的内容 含各个板块和搜索查询的 用户 相册 图片
	writeContent: 用户新建、修改专辑或 上传、编辑图片时需要用的到数据
*/
const defaultState = {
	readContent: {
		carousel:{
			pics:[]
		},
		hotspotBrief:[
			{
				img: {
					imgID: '',
					src: '',
					title: '', 
					pickUpCount: '', 
					likeCount: '',
					albumName: '', 
					artist: {
						userID: '',
						portrait: '',
						nickname: ''
					}
				},
				comments: [
					{
						artist:{
							portrait: '', 
							nickname: '', 
						},
						content: ''
					}
				]
			}
		],
		pickUpData:{
			albums:[ 
				{
					albumID: '',
					albumName: ''
				}
			],
			userID: '',
			img: {
				imgID: '',
				title: '',
				src: ''
			}
		},
		recommendAlbumData:{
			logginUserId: '',
			albums:[
				{
					cover: '',
					albumName: '',
					previews: [
						{
							src: ''
						}
					],
					author: {
						id: '',
						portrait: '',
						nickname: ''
					}
				}
			]
		},
		recommendAuthorData:{
			authors:[
				{
					avatar:'',
					nickname: '',
					pickupTotal: 0,
					interest: ''
				}
			] 
		},
		photoFrameFullData:{
			author: {
				avatar: "",
				nickname: ""
			},
			album: {
				albumName: ""
			},
			pics: [
				{
					src: ""
				}
			],
			img: {
				src: "",
				createTime: ""
			},
			commentTotal: 0,
			likeTotal: 0,
			pickupTotal: 0,
			tags: [""],
			comments: [
				{
					author:{
						avatar: "",
						nickname: ""
					},
					createTime: "",
					content: ""
				}
			]
		}
	},
	writeContent: {
		userAlbums: [],
		hotTags: [],
		uploadImgUrl: ''
	}
}


const content = (state = defaultState, action) => {
	switch(action.type){
		
		case "SET_USER_ALBUMS":
			var tempState = Object.assign({}, state);
			tempState.writeContent.userAlbums = action.userAlbums;
			return Object.assign({}, state, tempState);
		
		case "SET_HOT_TAGS":
			var tempState = Object.assign({}, state);
			tempState.writeContent.hotTags = action.hotTags;
			return Object.assign({}, state, tempState);

		case "SET_UPLOAD_IMG_URL":
			var tempState = Object.assign({}, state);
			tempState.writeContent.uploadImgUrl = action.uploadImgUrl;
			return Object.assign({}, state, tempState);
		
		case "SET_CAROUSEL_DATA":
			var tempState = Object.assign({}, state);
			tempState.readContent.carousel.pics = action.pics;
			return Object.assign({}, state, tempState);

		case "SET_HOTSPOTBRIEF_DATA":
			var tempState = Object.assign({}, state);
			tempState.readContent.hotspotBrief = action.hotspotBrief;
			return Object.assign({}, state, tempState);

		case "UPDATE_HOTSPOTBRIEF_DATA_SUB":
			var imgID = action.hotspotBriefDataSub.img.imgID;
			var tempHotspotBrief = state.readContent.hotspotBrief.slice();
			tempHotspotBrief.forEach((item, idx)=>{
				tempHotspotBrief[idx] = item.img.imgID === imgID ? action.hotspotBriefDataSub : item; 
			});
			var tempState = Object.assign({}, state);
			tempState.readContent.hotspotBrief = tempHotspotBrief;
			return Object.assign({}, state, tempState);

		case "SET_PICK_UP_DATA":
			var tempState = Object.assign({}, state);
			tempState.readContent.pickUpData = action.pickUpData;
			return Object.assign({}, state, tempState);

		case "SET_RECOMMEND_ALBUM_DATA":
			var tempState = Object.assign({}, state);
			tempState.readContent.recommendAlbumData = action.recommendAlbumData;
			return Object.assign({}, state, tempState);

		case "SET_RECOMMENDAUTHOR_DATA":
			var tempState = Object.assign({}, state);
			tempState.readContent.recommendAuthorData.authors = action.authors
			return Object.assign({}, state, tempState);

		case "SET_PHOTOFRAMEFULL_DATA":
			var tempState = Object.assign({}, state);
			tempState.readContent.photoFrameFullData = action.photoFrameFUllData;
			return Object.assign({}, state, tempState);

		default:
			return state; 
	}
};

export default content