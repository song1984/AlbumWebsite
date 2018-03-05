import { connect } from 'react-redux';
import { getHeaderData } from '../actions/headerAction'
import { toggleLoginDialog } from '../actions/loginDialogAction'
import Header from '../components/Header';

const mapStateToProps = (state) => {
	return {
		mainMenuData: state.site.menus.mainMenuData,
		shortcutMenuData: state.site.menus.shortcutMenuData,
		userMenuData: state.site.menus.userMenuData,
		promotionLinkData: state.site.promotionLinkData,
		QRCodeData: state.site.QRCodeData,
		loginState: state.user.loginState
	}
}

const mapDispatchToProps = {
	getHeaderData,
	toggleLoginDialog
}

const HeaderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)

export default HeaderContainer