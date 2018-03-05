const defaultData = {
	shortcutMenuData: [
		{
			link: '###',
			name: 'defaultName'
		}
	],
	needUpdate: true
};

const shortcutMenu = (state = defaultData, action) => {
	switch(action.type){
		case 'UPDATE_SHORTCUTMENU_DATA':
			return Object.assign({}, state, action.shortcutMenu, {needUpdate: false});
		default:
			return state;
	}
}

export default shortcutMenu