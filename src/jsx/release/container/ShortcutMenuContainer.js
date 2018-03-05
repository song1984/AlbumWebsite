import { connect } from 'react-redux';
import ShortcutMenu from '../components/ShortcutMenu';
import { getShortcutMenuData } from '../actions/actions';

const mapStateToProps = (state)=> {
	return {
		shortcutMenuData: state.shortcutMenu.shortcutMenuData
	};
};

const mapDispatchToProps = {
	getShortcutMenuData
};

const shortcutMenuContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShortcutMenu);

export default shortcutMenuContainer