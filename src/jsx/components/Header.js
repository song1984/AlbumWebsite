import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

import MainMenu from './MainMenu';
import SearchBoxContainer from '../containers/SearchBoxContainer';
import LoginGroup from './LoginGroup';

class Header extends Component {

	constructor(props){
		super(props);
		this.state = {

		}
		// 获得主菜单列表
		this.getHeaderData = props.getHeaderData;
	}

	componentWillMount(){
		// 获得header部分所有有关数据
		this.getHeaderData();
	}

	render(){
		return (
			<header>
				<nav>
					<IndexLink to = '/' className = 'dt-logo'>
						<img src = "./img/logo.png" />
					</IndexLink>
					<MainMenu mainMenuData = {this.props.mainMenuData} />
					<SearchBoxContainer />		
					<LoginGroup 
						loginState = {this.props.loginState} 
						promotionLinkData = {this.props.promotionLinkData}
						QRCodeData = {this.props.QRCodeData}
						toggleLoginDialog = {this.props.toggleLoginDialog}
						userMenuData = {this.props.userMenuData} 
						shortcutMenuData = {this.props.shortcutMenuData}
					/>				
				</nav>
			</header>
		);
	}
}


export default Header
