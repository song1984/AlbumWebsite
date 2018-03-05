import {connect} from 'react-redux';
import Menu from '../components/Menu';
import {getMenuData} from '../actions/actions';


const mapStateToProps = (state) => {
	return {
		menuData: state.menu.menuData,
	}
};

const mapDispatchToProps = {
	getMenuData: getMenuData
};

const MenuContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Menu);

export default MenuContainer
