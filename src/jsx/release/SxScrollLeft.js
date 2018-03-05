import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AlbumFrame from './AlbumFrame';
const raf = require('raf');

class SxScrollLeft extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			isWide: true
		};
		this.threshold = 1262;
		this.left = "LEFT";
		this.right = "RIGHT";
		this.toggleIsWide = this.toggleIsWide.bind(this);
	}

	componentWillMount(){
		window.addEventListener('resize', this.toggleIsWide);
		this.toggleIsWide();
	}

	// 切换宽屏 窄屏状态
	toggleIsWide(){
		let windowWidth = window.innerWidth;
		if(windowWidth < this.threshold) {
			this.setState({isWide: false})
		}else{
			this.setState({isWide: true})
		}
	}

	updateScrollLeft(direction){
		// 获得 scrollLeft 值 看是不是==0 或 == scrollWidth 如果不是 则根据 direction 移动一定量的scrollLeft
		let scrollLeft = this.recommendAlbum.scrollLeft;
		let scorllWidth = this.recommendAlbum.scrollWidth;
		let width = this.recommendAlbum.offsetWidth;
		if(direction === this.left && scrollLeft === 0){
			return;
		}else if(direction === this.right && scrollLeft === scorllWidth - width){
			return;
		}
		let _this = this;
		// raf 移动函数  移动至 0 或 scrollWidth 然后退出
		let factor = direction === this.left ? -1 : 1;

		let startPoint = scrollLeft;
		let distance = scorllWidth / this.props.childrenLength;

		const move = (subDistance, factor)=>{
			raf(()=>{
				let currentMove = Math.round(subDistance * 0.2);
				if(currentMove === 0){
					_this.recommendAlbum.scrollLeft = startPoint + distance * factor;
					return;
				}else{
					let nextDistance = subDistance - currentMove;
					_this.recommendAlbum.scrollLeft = _this.recommendAlbum.scrollLeft + currentMove * factor;
					move(nextDistance, factor)
				}	
			});	
		}
		move(distance, factor);
	}

	render(){
		let clazzName = this.state.isWide ? "sx-recommendAlbum sx-recommendAlbum-wide" : "sx-recommendAlbum";
		return (
			<div className="sx-recommendAlbum-wrap">
				<div className = {clazzName} ref = {node => this.recommendAlbum = node}>
					<div className = "sx-recommendAlbum-content">
						{ this.props.children }
					</div>
				</div>
				{
					this.state.isWide 
					? undefined 
					: <div className = "sx-recommendAlbum-button"
							onClick = {e=>{
								e.preventDefault();
								this.updateScrollLeft(e.target.getAttribute("data-direction"))
							}}
						>
						<a className = "sx-recommendAlbum-button-left" data-direction={this.left}></a>
						<a className = "sx-recommendAlbum-button-right" data-direction={this.right}></a>
					</div>
				}
			</div>
		);
	}
}

SxScrollLeft.propTypes = {
	children: PropTypes.any.isRequired,
	childrenLength: PropTypes.number.isRequired
}

export default SxScrollLeft
