import { connect } from 'react-redux';
import UserMenu from '../components/UserMenu';
import { updateUserMenu } from '../actions/actions';

const mapStateToProps = (state)=>{
	return {
		userMenuData: state.userMenu
	};
}

const mapDispatchToProps = {
	updateUserMenu
}

const UserMenuContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserMenu);

export default UserMenuContainer