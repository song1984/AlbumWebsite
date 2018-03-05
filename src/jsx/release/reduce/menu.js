
const menuDefaultData = {
	menuData: {
		navs: [
			{
				linkTo: '/',
				linkName: '首页'
			}
		],
		categorys: [
			{
				linkTo: '/',
				linkName: '家居生活'
			}
		],
		needUpdate: true
	}
}

const menu = (state = menuDefaultData, action) => {
	
	switch(action.type){
		case 'MENU_UPDATE':
			action.menuDataRoot.menuData.needUpdate = false;
			return Object.assign({}, state, action.menuDataRoot);
		default:
			return state
	}
}

export default menu






