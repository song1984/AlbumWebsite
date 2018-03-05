import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router';
import Tab from '../baseComponents/Tab';

/*
	参数说明 tips 所有提醒消协
			jointlyAlbum 所有共建专辑消息
			privateMessage 所有私信消息
			friends 好友列表
*/


function createTabDataArr(tips, jointlyAlbum, privateMessage, friends){

	const TIPS = "提醒";
	const JOINTLY_ALBUM = "共建专辑";
	const PRIVATE_MESSAGE = "私信";
	const FRIENDS = "好友";

	let tabDataArr = [];
	let tabFooter = <Link to = {""} >查看所有消息</Link>;

	tabDataArr.push(createMessageListObject(tips, TIPS, tabFooter));
	tabDataArr.push(createMessageListObject(jointlyAlbum, JOINTLY_ALBUM, tabFooter));
	tabDataArr.push(createMessageListObject(privateMessage, PRIVATE_MESSAGE, tabFooter));
	tabDataArr.push(createMessageListObject(friends, FRIENDS, tabFooter));


	return tabDataArr;
}

function createMessageListObject( messageArr, tabname, tabFooter){
	let obj = {
		tabName: tabname,
		tabContent: '',
		tabFooter: tabFooter
	}

	let tabContent = ()=>{
		return (
			<ul>
				{
					messageArr.map((mss, idx)=>{
						return (
							<Link to={mss.link}  key={idx}>
								<li>
									<i></i>
									<div>
										{ mss.content }
									</div>		
								</li>
							</Link>
						);
					})
				}
			</ul>
		);
	}

	obj.tabContent = tabContent();
	return obj;
}


let MessageCenter = (
		{toggleMessageCenterTabState, messageCenterTabState, tips, jointlyAlbum, privateMessage, friends}
	) => {

	if(!messageCenterTabState){
		return (
			<div className = "dt-messageCenter"></div>
		);
	} else {
		let tabDataArr = createTabDataArr(tips, jointlyAlbum, privateMessage, friends)
		return (
			<div className = "dt-messageCenter">
				<Tab 
					closeHandler = { toggleMessageCenterTabState }
					tabDataArr = { tabDataArr }
				/>
			</div>
		);
	}
};

MessageCenter.propTypes = {
	toggleMessageCenterTabState: PropType.func.isRequired, 
	messageCenterTabState: PropType.bool.isRequired, 
	tips: PropType.array.isRequired, 
	jointlyAlbum: PropType.array.isRequired, 
	privateMessage: PropType.array.isRequired, 
	friends: PropType.array.isRequired
};

export default MessageCenter














