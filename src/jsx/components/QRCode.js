import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../baseComponents/Dropdown';

let QRCode = ({QRCodeData}) => {

	return (
		<div className = "dt-QRCode-dropdown">
			<Dropdown 
				btn = { 
					{ imageSrc: QRCodeData.btnImg, name: '手机版'} 
				} 
			>
				<img src = {QRCodeData.QRCodeSrc}/>
				扫一扫 下载手机客户端
			</Dropdown>
		</div>
	);


};

QRCode.propTypes = {
	QRCodeData: PropTypes.shape({
		btnImg: PropTypes.string,
		QRCodeSrc: PropTypes.string
	})
};

export default QRCode