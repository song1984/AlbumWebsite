import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
const raf = require('raf');

class Carousel extends PureComponent {

	constructor(props){
		super(props);
		this.state = {};
		this.currentPicIdx = 0;
		this.nextPicIdx = undefined;
		this.allPicElement = [];
		this.numBtnArr = [];
		this.isPlaying = false;	// 是否能触发播放的开关 t 表示已经在播放不能插入新任务 f  表示可以播放
		this.isPause = false;
		this.timer = undefined;
		this.delay = 8000;
		this.duration = 30;		// 和step 两个值共同决定播放持续时间 30毫秒指播放一帧的时间
		this.step = 0.25;
	}

	componentWillMount(){
		this.props.getCarouselData();
	}

	// 组件创建完毕之后获得所有的图片节点
	componentDidUpdate(){
		let allPicElement = this.refs.allPics.getElementsByTagName('li');
		this.allPicElement = allPicElement;
		this.numBtnArr = this.refs.btnNum.getElementsByTagName('li');
		this.autoPlay();
	}

	// 布景
	scenery(nextPicIdx, isAutoMission = false){
		if(this.isPlaying) return;
		if(this.allPicElement.length === 0) return;
		this.isPlaying = true;
		let clazzName = "sx-carousel-pic-show";
		let isForward;
		if(this.currentPicIdx === nextPicIdx){
			// 如果下一个播放的还是当前这张则什么也不做, 解除播放锁定状态
			this.isPlaying = false;
			return;
		}else if(this.currentPicIdx === 0 || this.currentPicIdx === this.allPicElement.length - 1){
			if(nextPicIdx === 0){
				clazzName += " sx-carousel-pic-next";
				isForward = true;
			}else if(nextPicIdx === this.allPicElement.length - 1){
				clazzName += " sx-carousel-pic-prev";
				isForward = false;
			}else if(this.currentPicIdx > nextPicIdx){ // 播放上一张
				clazzName += " sx-carousel-pic-prev";
				isForward = false;
			}else if(this.currentPicIdx < nextPicIdx){ // 播放下一张
				clazzName += " sx-carousel-pic-next";
				isForward = true;
			}
		}else if(this.currentPicIdx > nextPicIdx){ // 播放上一张
			clazzName += " sx-carousel-pic-prev";
			isForward = false;
		}else if(this.currentPicIdx < nextPicIdx){ // 播放下一张
			clazzName += " sx-carousel-pic-next";
			isForward = true;
		}
		this.nextPicIdx = nextPicIdx;
		// 设置点播按钮外观
		this.numBtnArr[this.currentPicIdx].className = "sx-carousel-btn-other";
		this.numBtnArr[this.nextPicIdx].className = "sx-carousel-btn-current";
		
		this.allPicElement[nextPicIdx].className = clazzName;
		this.pause();
		this.play(isForward, isAutoMission);
	}

	// 播放
	play(isForward, isAutoMission = false){
		let distance = this.refs.allPics.offsetWidth;
		this.totalDistance = isForward ? distance * -1 : distance;
		this.finishDistance = 0;
		let _this = this;

		function move(distance){
			raf(function(){
				let moveDistance = Math.round(Math.abs(distance) * _this.step);
				if(moveDistance === 0){
					_this.refs.allPics.style.left = _this.totalDistance + "px";
					_this.stop(isAutoMission);
					return;
				}else{
					moveDistance = isForward ? moveDistance * -1 : moveDistance;
					_this.finishDistance += moveDistance;
					_this.refs.allPics.style.left = _this.finishDistance + "px";
					let nextDistance = _this.totalDistance - _this.finishDistance;
					move(nextDistance);
				}				
			});
		}

		move(this.totalDistance);
	}

	// 结束播放
	stop(isAutoMission = false){
		// 拆除布景
		this.allPicElement[this.currentPicIdx].className = "sxcarousel-pic-hidden";
		this.allPicElement[this.nextPicIdx].className = "sx-carousel-pic-show";
		this.refs.allPics.style.left = "0px";
		this.currentPicIdx = this.nextPicIdx;
		this.nextPicIdx = undefined;
		this.isPlaying = false;
		if(isAutoMission) this.autoPlay();
	}

	// 暂停播放
	pause(){
		clearInterval(this.timer);
	}

	// 自动播放
	autoPlay(){
		let _this = this;
		this.pause();
		this.timer = setInterval(function(){
			if(_this.isPlaying) return;
			let maxIdx = _this.allPicElement.length - 1;
			let nextPicIdx; 

			if(maxIdx === _this.currentPicIdx){
				nextPicIdx = 0;
			}else {
				nextPicIdx = _this.currentPicIdx+1;
			}
			_this.scenery(nextPicIdx, true);
		}, this.delay)
	}

	render(){
		return(
			<div 
				className = "sx-carousel"
				onMouseEnter = {
					e => {
						this.pause();
					}
				}
				onMouseLeave = {
					e => {
						this.autoPlay();
					}
				}
			>
				<div className = "sx-carousel-pics-wrap" >
					<ul className = "sx-carousel-pics" ref = "allPics" >
						{this.props.pics.map((pic, idx)=> {
							let clazzName = this.currentPicIdx === idx ? "sx-carousel-pic-show" : "sxcarousel-pic-hidden";
							return (
								<Link key = { idx } to = { pic.link } >
									<li className = { clazzName }>
										<img src = { pic.url } />
									</li>
								</Link>
							);
						})}
					</ul>
				</div>
				<div className = "sx-carousel-btn-num-wrap">
					<ul
						className = "sx-carousel-btn-num"
						ref = "btnNum"
						onClick = {
							e => {
								let key = parseInt(e.target.getAttribute("data-key"));
								if(isNaN(key)) return;
								this.scenery(key);
							}
						}
					>
						{this.props.pics.map((pic, idx)=> {
							let clazzName = this.currentPicIdx === idx ? "sx-carousel-btn-current" : "sx-carousel-btn-other";
							return (
								<li key={idx} data-key={idx} className = {clazzName}></li>
							);
						})}
					</ul>
				</div>
				<button 
					className = "sx-carousel-btn-prev"
					onClick = {
						e => {
							e.preventDefault();
							let nextPicIdx = this.currentPicIdx === 0 ? this.allPicElement.length - 1 : this.currentPicIdx - 1; 
							this.scenery(nextPicIdx);
						}
					}
				>	
				</button>
				<button
					className = "sx-carousel-btn-next"
					onClick = {
						e => {
							e.preventDefault();
							let nextPicIdx = this.currentPicIdx === this.allPicElement.length - 1 ? 0 : this.currentPicIdx + 1;
							this.scenery(nextPicIdx);
						}
					}
				>
				</button>
			</div>
		);		
	}
}

Carousel.propTypes = {
	pics: PropTypes.arrayOf(PropTypes.shape({
		link: PropTypes.string,
		url: PropTypes.string
	})).isRequired
}

export default Carousel