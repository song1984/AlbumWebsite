import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import PhotoFrame from './PhotoFrame';

/*
	列视图组件 按列的方式展示数据， 宽平5列 窄屏4列

	数据加载问题： 在一页之内显示的所有数据 需要通过props 一次性传入组件， 组件则分多次进行追加式渲染，
				 基本过程 第一次现渲染一个固定数量的文章内容，并且把已渲染的数量就是下标 记录在对象属性中，
				 然后利用scroll变化 触发 对于剩余文章的追加渲染， 每次符合条件的scroll变化 触发一定量的
				 追加渲染 
*/
class ColumnView extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			columnViewDataWide: [[], [], [], [], []],
			columnViewDataNarrow: [[], [], [], []],
			isWide: true,
			threshold: 1262 		// > 这个认为宽屏 < 这个 认为窄屏
		};
		this.renderComplete = 0;
		this.firstRenderSize = 40;
		this.repeatRenderSize = 20;
		this.currentScrollY = 0;
		this.setWindowStatus = this.setWindowStatus.bind(this);
		this.scrollChangeHandle = this.scrollChangeHandle.bind(this);
		this.columnDataLength = props.columnData.length;
	}

	componentWillMount(){
		// 创建组件实例时 创建 4列 和 5列数组
		this.updateRenderData(this.props);
	}

	componentWillReceiveProps(nextProps){
		// 更新props时 认为是进入了新的一页 所以把渲染进度归零
		this.renderComplete = 0;

		this.columnDataLength = nextProps.columnData.length;

		// props更新时 重新创建 4列 和 5列数组
		this.updateRenderData(nextProps);
	}

	componentDidMount(){
		// 查看窗口宽度 调整 this.isWide
		this.setWindowStatus();

		// 监听窗口变化 达到临界值 调整 this.isWide
		window.addEventListener('resize', this.setWindowStatus);
		// 监听scrollY 变化 辨别是否需要更新渲染
		window.addEventListener('scroll', this.scrollChangeHandle);
	}

	scrollChangeHandle(){
		// 方法一 已作废 留作参考 因此方式需要依赖计算其他组件高度，
		// let scrollHeight = document.body.scrollHeight;
		// let footerHeight = document.getElementsByTagName('footer')[0].offsetHeight;
		// let scrollY = window.pageYOffset;
		// let windowHeight = document.documentElement.clientHeight;

		// if(scrollY + windowHeight >= scrollHeight - footerHeight){
		// 	this.currentScrollY = scrollY;
		// 	this.updateRenderData(this.props);
		// }

		// 方法二 只需要组件自身特征和全局属性
		if(this.columnDataLength <= this.renderComplete) return;
		let windowHeight = document.documentElement.clientHeight;
		if(this.columnView.offsetHeight + this.columnView.getBoundingClientRect().top < windowHeight){
			this.currentScrollY = window.pageYOffset;
			this.updateRenderData(this.props);
		}
	}

	// 函数完成两种数组的创建 然后同时更新state
	updateRenderData(props){
		// 获得本次将要渲染的数据
		let data;
		let tempRenderComplete;
		let firstRenderData = undefined;

		if(this.renderComplete === 0){
			data = props.columnData.slice(this.renderComplete, this.firstRenderSize);
			tempRenderComplete = this.renderComplete + this.firstRenderSize;
			// 首次渲染时必须用空数组装载宽／窄屏 数据 因为有可能出现多页数据被追加到一个state中的问题
			firstRenderData = {
				columnViewDataWide: [[], [], [], [], []],
				columnViewDataNarrow: [[], [], [], []]
			};
		}else {
			let start = this.renderComplete + 1;
			data = props.columnData.slice(start, start + this.repeatRenderSize);
			tempRenderComplete = this.renderComplete + this.repeatRenderSize;
		}

		const transformation = (isWide) => {
			let resultArr;

			if(firstRenderData !== undefined){
				resultArr = isWide
							? firstRenderData.columnViewDataWide
							: firstRenderData.columnViewDataNarrow;
			}else {
				resultArr = isWide
							? this.state.columnViewDataWide.slice() 
							: this.state.columnViewDataNarrow.slice();	
			}

			let size = resultArr.length;
			
			data.forEach((item, idx) => {
				let gate = idx % size;
				resultArr[gate].push(item);
			})

			return resultArr;
		}

		let tempWideData = transformation(true);
		let tempNarrowData = transformation(false);

		let tempState = Object.assign({}, this.state, {columnViewDataWide: tempWideData,  columnViewDataNarrow: tempNarrowData});

		// 更新已完成的渲染进度
		this.renderComplete = tempRenderComplete;
		// 设置scrollY 坐标
		window.scrollTo(0, this.currentScrollY);
		this.setState(tempState);
	}	

	setWindowStatus(){

		let windowWidth = window.innerWidth;
		let tempState = Object.assign({}, this.state);

		if(windowWidth > tempState.threshold) {
			if(tempState.isWide){
				return;
			}else{
				tempState.isWide = true;
			}
		}else {
			if(tempState.isWide){
				tempState.isWide = false;
			}else{
				return;
			}
		}

		this.setState(tempState);
	}

	render(){
		let arr = this.state.isWide ? this.state.columnViewDataWide : this.state.columnViewDataNarrow;
		return (
			<div className = "sx-columnView" ref = {(node)=>{ this.columnView = node; }} >	
				{
					arr.map((items, idx)=>{
						if(items.length === 0){
							return undefined;
						}
						return (
							<div key = {idx} className = "sx-columnView-col">
								<CSSTransitionGroup
									transitionName = "columnTypeChange"
									transitionEnterTimeout = {800}
									transitionLeaveTimeout = {150}
								>
								{
									items.map((item, idx)=>{
										return (
											<PhotoFrame
												key = {idx}
												photoFrameData = {item} 
												actions = { this.props.actions }
											/>
										);
									})
								}
								</CSSTransitionGroup>
							</div>
						);
					})
				}	
			</div>
		);
	}
}

ColumnView.propTypes = {
	columnData: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
}

export default ColumnView
