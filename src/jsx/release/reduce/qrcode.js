const defaultState = {
	QRCodeSrc:'',
	needUpdate: true
};

const QRCode = (state = defaultState, action) => {
	switch(action.type){
		case 'UPDATE_QRCODE_SRC':
			return Object.assign({}, state, action.QRCodeData, {needUpdate: false});
		default:
			return state;
	}
}

export default QRCode