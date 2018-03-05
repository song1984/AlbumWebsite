import fetch from 'isomorphic-fetch';
import { updateLikeCount, addComment, pickUp } from './articleCommentAction';

export const getHotspotBriefData = ()=>{

	const setHospotBrief = (hotspotBrief) => {
		return {
			type: "SET_HOTSPOTBRIEF_DATA",
			hotspotBrief
		}
	}

	return (dispatch) => {
		const url = `/data/hotspotBrief-data.json`;
		fetch(url)
		.then(response => response.json())
		.then(json => dispatch(setHospotBrief(json)));
	}
}

/*
	对于一张图片的 收集 评论 点赞 属于多个业务的功能交集， 所以应该是一套基础功能
	被业务二次封装
*/

const updateHotspotBriefDataSub = (hotspotBriefDataSub) => {
	return {
		type: "UPDATE_HOTSPOTBRIEF_DATA_SUB",
		hotspotBriefDataSub
	}
}


export const updateLikeCountForHotspotBrief = (imgID) => {

	return (dispatch) => {

		new Promise(function(resolve, reject){
			// 通过以下函数 异步更新点赞数量，完成时 resolve
			updateLikeCount(resolve);
		}).then(()=>{
			// 异步获得更新后的数据 利用imgID 
			return new Promise(function(resolve, reject){
				// 等后端搭建完成再补全
			})
		}).then((json)=>{dispatch(updateHotspotBriefDataSub(json))})
	}
}


export const addCommentForHotspotBrief = (imgID, comment) => {

	return (dispatch) => {

		new Promise(function(resolve, reject){
			// 通过以下函数 异步更新点赞数量，完成时 resolve
			addComment(comment, resolve);
		}).then(()=>{
			// 异步获得更新后的数据 利用imgID 
			return new Promise(function(resolve, reject){
				// 等后端搭建完成再补全
			})
		}).then((json)=>{dispatch(updateHotspotBriefDataSub(json))})
	}
}


export const pickUpForHotspotBrief = (imgID, userID) => {

	return (dispatch) => {

		new Promise(function(resolve, reject){
			// 通过以下函数 异步更新点赞数量，完成时 resolve
			pickUp(imgID, userID, resolve);
		}).then(()=>{
			// 异步获得更新后的数据 利用imgID 
			return new Promise(function(resolve, reject){
				// 等后端搭建完成再补全
			})
		}).then((json)=>{dispatch(updateHotspotBriefDataSub(json))})
	}
}























