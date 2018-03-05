import { connect } from 'react-redux';
import LoginBtn from '../components/LoginBtn';
import { toggleLoginTab } from '../actions/actions';

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = {
	toggleLoginTab
};

const LoginBtnContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginBtn);

export default LoginBtnContainer