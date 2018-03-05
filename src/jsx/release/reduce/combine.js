import { combineReducers } from 'redux';
import menu from './menu';
import searchBox from './searchBox';
import promotionLink from './promotionLink';
import login from './login';
import QRCode from './qrcode';
import shortcutMenu from './shortcutMenu';
import uploadImgDialog from './uploadImgDialog';
import createAlbum from './createAlbum';
import messageCenter from './messageCenter';
import userMenu from './userMenu';

const dtApp = combineReducers({
	menu,
	searchBox,
	promotionLink,
	login,
	QRCode,
	shortcutMenu,
	uploadImgDialog,
	createAlbum,
	messageCenter,
	userMenu
});

export default dtApp