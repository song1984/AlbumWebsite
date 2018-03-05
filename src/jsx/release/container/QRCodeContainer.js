import { connect } from 'react-redux';
import { getQRCode } from '../actions/actions';
import QRCode from '../components/QRCode';

const mapStateToProps = (state) => {
	return {
		QRCodeSrc: state.QRCode.QRCodeSrc,
		btnImg: state.QRCode.btnImg
	}
};

const mapDispatchToProps = {
	getQRCode
};

const QRCodeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(QRCode);

export default QRCodeContainer