import fetch from 'isomorphic-fetch';

/* 
	以下对图片 进行收藏 点赞 评论 的行为都不是action，他们不能修改state 
	因为它们是多个不同业务的相同行为 只不过不同的业务只能使用自己的业务分片数据
	所以他们会被嵌套到不同的业务中，修改不同的业务分片下的某个数据，所以
	当它们单独出现时 根本不能辨认自己应该改哪个分片中的 state
*/
export const updateLikeCount = (resolve) =>{
	// 异步提交数据 并获得返回结果
	// const url = ``;
	// fetch(url).then(reponse => reponse.json()).then((json) => resolve(json));
	// return 返回结果
}
	
export const addComment = (imgID, resolve) => {
	// 异步提交数据 并获得返回结果
	// const url = ``;
	// fetch(url).then(reponse => reponse.json()).then((json) => resolve(json));
	// return 返回结果
}

export const pickUp = (imgID, userID, resolve) => {
	// 异步提交数据 并获得返回结果
	// const url = ``;
	// fetch(url).then(reponse => reponse.json()).then((json) => resolve(json));
	// return 返回结果
}

