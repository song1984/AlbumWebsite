import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import supportAniEnd from '../tools/dtAnimationEnd';
import Modal from '../baseComponents/Modal';
import DtLabel from '../baseComponents/DtLabel';
/*
	打开关闭login弹窗应该属于组件自身行为 显示或者不现实 都需要通过state片段决定
	通过toggleLoginTab 函数切换 显示隐藏状态 这是一个 action创建函数
	提交登陆信息是一个异步action 这个由容器组件提供提供

*/

/*
	参数 actions中包含 toggleLoginTab submitLogin 两个action创建函数
*/


function showTab(submitLogin, toggleLoginTab, loginTabData){

	return (
		<div>
			<div className = 'dt-login-form'>
				{/* submitLogin  需要考虑 正则验证问题 成功之后 更改 tabType 为false 并且更改 loginType 如果失败 则需要考虑提示信息问题 */}
				<form 
					onSubmit = {
						e => {
							e.preventDefault();
							submitLogin(userInput);
						}
					}
					method = "post"
					name = "loginFrom"
				>
					<ul>
						<li>
							<DtLabel
								placeholder = {"用户名／邮箱"}
								childNodeName = {"INPUT"}
							>
								<input 
									type='text'
									name = "username"
								/>
							</DtLabel>
						</li>
						<li>
							<DtLabel
								placeholder = {"密码"}
								childNodeName = {"INPUT"}
							>
								<input 
									type='password'
									name = "password"
								/>
							</DtLabel>
						</li>
						<li>
							<input type='checkbox' defaultChecked />记住我
							<Link
								to = {loginTabData.resetPWDLink}
							>
								忘记密码?
							</Link>
						</li>
						<li>
							<button type='submit' >登录</button>
						</li>
						<li className = 'dt-login-thirdPart'>
							{
								loginTabData.thirdPart.map( (t, idx) => {
									return (
										<a href= {t.href} key={idx}>
										</a>
									)
								})
							}
						</li>
					</ul>	
				</form>
			</div>
			<div className = 'dt-login-QRCode'>
				<img src = {loginTabData.QRCodeSrc} />
				<p>
					扫一扫下载手机客户端浏览体验更佳
				</p>
			</div>
		</div>
	);
};


const Login = ({ submitLogin, toggleLoginTab, getLoginTabDataFromServer, loginTabData}) => {

	getLoginTabDataFromServer();

	if(!loginTabData.tabType){
		return (
			<div></div>
		);
	}else {
		return (
			<div className = 'dt-login'>
				<Modal 
					closeHandler = {toggleLoginTab} 
					modalTitle = {"登录"}
					footer = { 						
						<Link to = {loginTabData.registerLink} >
							还没有账号？ 立即注册
						</Link> 
					}
				>
					{showTab(submitLogin, toggleLoginTab, loginTabData)}
				</Modal>
			</div>
		);
	}
};

Login.propType = {
	getLoginTabDataFromServer: PropTypes.func.isRequired,
	submitLogin: PropTypes.func.isRequired,
	toggleLoginTab: PropTypes.func.isRequired,
	loginTabData: PropTypes.shape({
		thirdPart: PropTypes.arrayOf(PropTypes.shape({
			src: PropTypes.string.isRequired
		})).isRequired,
		registerLink: PropTypes.string,
		resetPWDLink: PropTypes.string,
		QRCodeSrc: PropTypes.string,
		tabType: PropTypes.bool.isRequired
	}).isRequired
};

export default Login