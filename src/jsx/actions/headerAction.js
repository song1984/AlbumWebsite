import fetch from 'isomorphic-fetch';
import { toggleAlertState } from './alertAction';

/*
	获得header组件中各种子组件的初始数据 之后再产生的数据变化 与这个无关， 
	任何组件 如果修改了app state 则 header组件必然通过 其容器获得新的props
	所以 header下的各个子组件 可以通过辨认自己的props分片得知自己应该如何变化 
*/
export const getHeaderData = () => {

	// 设置主菜单
	function setMainMenu(json){
		return {
			type: "SET_MAIN_MENU_DATA",
			mainMenuData: json.menuData
		}
	}
	
	// 设置发表文章快捷菜单
	function setShortcutMenuData(json){
		return {
			type: "SET_SHORTCUT_MENU_DATA",
			shortcutMenuData: json.shortcutMenuData
		}
	}

	// 设置用户菜单
	function setUserMenuData(json){
		return {
			type: "SET_USER_MENU_DATA",
			userMenuData: json.userMenuData
		}
	}

	// 设置推广链接
	function setPromotionLink(json){
		return {
			type: "SET_PROMOTION_LINK_DATA",
			promotionLinkData: json.promotionData
		}
	}

	// 设置二维码
	function setQRCodeData(json){
		return {
			type: "SET_QRCODE_DATA",
			QRCodeData: json
		}
	}
	
	// 设置用户登录状态, 登录状态虽然可以从服务端获得 但是服务端不能根据这个渲染网页，必须让客户端组件得到一个明确的状态
	function setLoginState(json) {
		return {
			type: "SET_LOGIN_STATE",
			loginState: json.loginState
		}
	}

	// 获得所有菜单数据, 用户登录状态, 用户信息,  因为登录状态是必须靠服务器才能辨认的 所以当出现刷新时 app的初始数据可能是已登陆 
	return (dispatch) => {
		new Promise(	// 主菜单
			function(resolve, reject){	
				const url = `/data/menu-data.json`;
				fetch(url).then(response => response.json()).then(json => dispatch(setMainMenu(json))).then(resolve());
			}
		).then(function(){
			new Promise(function(resolve, reject){	// 获得发表文章快捷菜单
				const url = `/data/shortcutMenu-data.json`;
				fetch(url).then(response => response.json()).then(json => dispatch(setShortcutMenuData(json))).then(resolve());
			})
		}).then(function(){
			new Promise(function(resolve, reject){
				const url = `/data/userMenu-data.json`;
				fetch(url).then(response => response.json()).then(json => dispatch(setUserMenuData(json))).then(resolve());
			})
		}).then(function(){ // 获得推广链接数据
			new Promise(function(resolve, reject){
				const url = `/data/promotionLink-data.json`;
				fetch(url).then(response => response.json()).then(json => dispatch(setPromotionLink(json))).then(resolve());
			})
		}).then(function(){ // 获得二维码数据
			new Promise(function(resolve, reject){
				const url = `/data/QRCode-data.json`;
				fetch(url).then(response => response.json()).then(json => dispatch(setQRCodeData(json))).then(resolve());
			})
		}).then(function(){
			new Promise(function(resolve, reject){
				const url = `/data/userLoginState-data.json`;
				fetch(url).then(response => response.json()).then(json => dispatch(setLoginState(json))).then(resolve());
			})
		})
	}
}










