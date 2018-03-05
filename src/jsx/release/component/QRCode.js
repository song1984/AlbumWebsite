import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../baseComponents/Dropdown';

let QRCode = ({QRCodeSrc, getQRCode, btnImg}) => {

	window.onload = getQRCode();

	return (
		<div className = "dt-QRCode-dropdown">
			<Dropdown 
				btn = { 
					{ imageSrc: btnImg, name: '手机版'} 
				} 
			>
				<img src = {QRCodeSrc}/>
				扫一扫 下载手机客户端
			</Dropdown>
		</div>
	);


};

QRCode.propTypes = {
	btnImg: PropTypes.string,
	QRCodeSrc: PropTypes.string.isRequired,
	getQRCode: PropTypes.func.isRequired
};

export default QRCode