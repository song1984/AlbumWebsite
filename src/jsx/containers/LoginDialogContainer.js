import { connect } from 'react-redux';
import LoginDialog from '../components/LoginDialog';
import { toggleLoginDialog, loginSubmit } from '../actions/loginDialogAction';

const mapStateToProps = (state)=>{
	return {
		loginDialogData: state.site.loginDialogData,
		loginDialogState: state.site.UIContro.loginDialogState,
		QRCodeData: state.site.QRCodeData
	};
};

const mapDispatchToProps = {
	toggleLoginDialog,
	loginSubmit
};

const LoginDialogContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginDialog);

export default LoginDialogContainer