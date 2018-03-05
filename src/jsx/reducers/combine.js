import { combineReducers } from 'redux';
import content from './content';
import user from './user';
import site from './site';
import messageCenter from './messageCenter';

const appReducers = combineReducers({
	content,
	user,
	site,
	messageCenter
});

export default appReducers