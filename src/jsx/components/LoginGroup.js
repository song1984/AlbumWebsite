import React from 'react';
import { Link } from 'react-router';
import Dropdown from '../baseComponents/Dropdown';
import UserMenu from './UserMenu';
import ShortcutMenu from './ShortcutMenu';
import QRCode from './QRCode';
import MessageCenterBtnContainer from '../containers/MessageCenterBtnContainer';


const LoginGroup = ({ loginState,  promotionLinkData, QRCodeData, toggleLoginDialog, userMenuData, shortcutMenuData })=> {
	if(!loginState){
		return (
			<ul className = 'dt-loginGroup'>
				<li>
					<Link
						to = {promotionLinkData.link}
						className = 'dt-promotionLink'
					>
						{promotionLinkData.name}
						<span>new</span>
					</Link>
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
					<span 
						className = "dt-login-btn"
						onClick = {
							e => {
								toggleLoginDialog(true)
							}
						}
					>
						登录
					</span>
				</li>
				<li>
					<QRCode QRCodeData = {QRCodeData}/>
				</li>
			</ul>
		);
	}else {
		return (
			<ul className = 'dt-loginGroup'>
				<li>
					<ShortcutMenu  shortcutMenuData = {shortcutMenuData}/>
				</li>
				<li>
					<Link
						to = {promotionLinkData.link}
						className = 'dt-promotionLink'
					>
						{promotionLinkData.name}
						<span>new</span>
					</Link>
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
					<UserMenu userMenuData = {userMenuData}/>
				</li>
			</ul>
		);
	}
}

export default LoginGroup