import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AlbumFrame from './AlbumFrame';
const raf = require('raf');

class SxScrollLeft extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			buttonNoSee: true
		};
		this.left = "LEFT";
		this.right = "RIGHT";
		this.toggleButton = this.toggleButton.bind(this);
		this.step = props.step;
	}

	componentWillMount(){
		window.addEventListener('resize', this.toggleButton);
	}

	componentDidMount(){
		this.toggleButton();
	}

	componentDidUpdate(){
		this.toggleButton();
	}

	// 切换宽屏 窄屏状态
	toggleButton(){
		let scrollWidth = this.reel.scrollWidth;
		let width = this.reel.offsetWidth;	
		if(width < scrollWidth) {
			this.setState({buttonNoSee: false})
		}else{
			this.setState({buttonNoSee: true})
		}
	}

	updateScrollLeft(direction){
		// 获得 scrollLeft 值 看是不是==0 或 == scrollWidth 如果不是 则根据 direction 移动一定量的scrollLeft
		let scrollLeft = this.reel.scrollLeft;
		let scrollWidth = this.reel.scrollWidth;
		let width = this.reel.offsetWidth;
		if(direction === this.left && scrollLeft === 0){
			return;
		}else if(direction === this.right && scrollLeft === scrollWidth - width){
			return;
		}
		let _this = this;
		// raf 移动函数  移动至 0 或 scrollWidth 然后退出
		let factor = direction === this.left ? -1 : 1;

		let startPoint = scrollLeft;
		let distance = scrollWidth / this.props.childrenLength * this.step;
		if(direction === this.left){
			distance = distance > scrollLeft ? scrollLeft : distance;
		}else{
			let surplus = scrollWidth - (scrollLeft + width)
			distance = distance > surplus ? surplus : distance;
		}
		
		const move = (subDistance, factor)=>{
			raf(()=>{
				let currentMove = Math.round(subDistance * 0.2);
				if(currentMove === 0){
					_this.reel.scrollLeft = startPoint + distance * factor;
					return;
				}else{
					let nextDistance = subDistance - currentMove;
					_this.reel.scrollLeft = _this.reel.scrollLeft + currentMove * factor;
					move(nextDistance, factor)
				}	
			});	
		}
		move(distance, factor);
	}

	render(){
		let clazzName = this.state.buttonNoSee ? "sx-scrollLeftComponent sx-scrollLeftComponent-wide" : "sx-scrollLeftComponent";
		return (
			<div className="sx-scrollLeftComponent-wrap">
				<div className = {clazzName} ref = {node => this.reel = node}>
					<div className = "sx-scrollLeftComponent-content">
						{ this.props.children }
					</div>
				</div>
				{
					this.state.buttonNoSee 
					? undefined 
					: <div className = "sx-scrollLeftComponent-button"
							onClick = {e=>{
								e.preventDefault();
								this.updateScrollLeft(e.target.getAttribute("data-direction"))
							}}
						>
						<a className = "sx-scrollLeftComponent-button-left" data-direction={this.left}></a>
						<a className = "sx-scrollLeftComponent-button-right" data-direction={this.right}></a>
					</div>
				}
			</div>
		);
	}
}

SxScrollLeft.propTypes = {
	children: PropTypes.any.isRequired,
	childrenLength: PropTypes.number.isRequired,
	step: PropTypes.number.isRequired
}

export default SxScrollLeft
