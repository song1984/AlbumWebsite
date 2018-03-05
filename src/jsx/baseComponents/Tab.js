import React, { Component } from 'react';
import PropType from 'prop-types';


/*
	功能:  	组件提供tab 的切换功能 
			用户点击tab -> 指定tab 切换为已选外观 -> 其他tab 切换为 未选外观 -> 显示tab 对应的 children 子元素

			state    tabDataArr = [{ tabName:'string', tabContent:'elements/array/string', tabFooter = 'elements/array/ string' },.... ]
					
					currentTabIndex  当前显示的标签

			更新 props 问题 组件本身 支持 props刷新state， 因为组建本身为模版组件 不能确定其父组件（业务组件） 的类型 
*/
class Tab extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			tabDataArr: props.tabDataArr,
			closeHandler: props.closeHandler,
			currentTabIndex: 0 
		};
	};

	componentWillReceiveProps(nextProps){
		this.setState(Object.assign({}, this.state, {tabDataArr: nextProps.tabDataArr}))
	};

	// 切换当前的tab页
	changeTab(tabIdx){
		this.setState(Object.assign({}, this.state, {currentTabIndex: tabIdx}));
	}

	render(){
		return (
			<div 
				className = "dt-base-tab-background"
				onClick = {
					e => {
						this.state.closeHandler(false);
					}
				}
			>
				<div className= "dt-base-tab-wrap" >
					<div 
						className = "dt-base-tab"
						onClick = {
							e => e.stopPropagation()
						}
					>
						<div className = "dt-base-tab-header">
							<div className = "dt-base-tab-tabNames">
								{
									this.state.tabDataArr.map((tabData, idx)=>{
										let className = this.state.currentTabIndex === idx ? 'dt-base-tab-selected' : 'dt-base-tab-unSelected';
										return (
											<span 
												key = { idx }
												data-subscript = { idx }
												className = { className }
												onClick = {
													e => {
														let tabIdx = parseInt(e.target.getAttribute("data-subscript"));
														this.changeTab(tabIdx)
													} 
												}
											>
												{ tabData.tabName }
											</span>
										);
									})
								}
							</div>
						</div>
						<div className = "dt-base-tab-main">
							{
								this.state.tabDataArr[this.state.currentTabIndex].tabContent
							}
						</div>
						<div className = "dt-base-tab-footer">
							{
								this.state.tabDataArr[this.state.currentTabIndex].tabFooter
							}
							<i 
								className = "dt-base-tab-btn-close"
								onClick = {
									e => {
										this.state.closeHandler(false);
									}
								}
							>
							</i>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

Tab.propTypes = {
	tabDataArr: PropType.arrayOf(PropType.shape({
		tabName: PropType.string.isRequired,
		tabContent: PropType.oneOfType([PropType.string, PropType.element, PropType.array]),
		tabFooter: PropType.oneOfType([PropType.string, PropType.element, PropType.array])
	})),
	closeHandler: PropType.func
};

export default Tab





