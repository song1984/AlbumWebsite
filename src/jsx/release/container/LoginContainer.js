import { connect } from 'react-redux';
import Login from '../components/Login';
import { toggleLoginTab, submitLogin,  getLoginTabDataFromServer } from '../actions/actions';

const mapStateToProps = (state)=>{
	return {
		loginTabData: state.login.loginTabData
	};
};

const mapDispatchToProps = {
	toggleLoginTab,
	submitLogin,
	getLoginTabDataFromServer
};

const LoginContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);

export default LoginContainer