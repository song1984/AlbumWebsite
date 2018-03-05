import { connect } from 'react-redux';
import Alert from '../components/Alert';
import { toggleAlertState } from '../actions/alertAction';

const mapStateToProps = (state) => {
	return {
		alertState: state.site.UIContro.alertState,
		content: state.messageCenter.alertContent
	}
}

const mapDispatchToProps = {
	toggleAlertState
}

const AlertContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Alert);

export default AlertContainer