import React from 'react';
import PromotionLinkContainer from '../containers/PromotionLinkContainer';
import { Link } from 'react-router';
import LoginBtnContainer from '../containers/LoginBtnContainer';
import QRCodeContainer from '../containers/QRCodeContainer';
import ShortcutMenuContainer from '../containers/ShortcutMenuContainer';
import MessageCenterBtnContainer from '../containers/MessageCenterBtnContainer';
import UserMenuContainer from '../containers/UserMenuContainer';


const LoginGroup = ({ loginType })=> {
	loginType = true;
	if(!loginType){
		return (
			<ul className = 'dt-loginGroup'>
				<li>
					<PromotionLinkContainer />
				</li>
				<li>
					<Link
						className = 'dt-registerLink'
						to = {'register'}
					>
						注册
					</Link>
				</li>
				<li>
					<LoginBtnContainer />
				</li>
				<li>
					<QRCodeContainer />
				</li>
			</ul>
		);
	}else {
		return (
			<ul className = 'dt-loginGroup'>
				<li>
					<ShortcutMenuContainer />
				</li>
				<li>
					<PromotionLinkContainer />
				</li>
				<li>
					<Link
						to = {'myhome'}
					>
						关注动态
					</Link>
				</li>
				<li>
					<MessageCenterBtnContainer />
				</li>
				<li>
					<UserMenuContainer />
				</li>
			</ul>
		);
	}
}

export default LoginGroup