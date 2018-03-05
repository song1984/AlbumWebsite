import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import DtLabel from '../baseComponents/DtLabel';
import { Link } from 'react-router';

const raf = require('raf');

class PhotoFrame extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			toolbarIsShow: false,
			commentFormIsShow: false,
			standardTopDistance: 65,
			isWaiting: true
		};
		this.updateCoordinate = this.updateCoordinate.bind(this);
		this.updateCoordinateForCommentForm = this.updateCoordinateForCommentForm.bind(this);
		this.commentFormMoveComplete = false;

	}

	componentDidUpdate(){
		this.updateCoordinate();
		this.updateCoordinateForCommentForm();
	}

	// 更新toolbar的坐标位置
	updateCoordinate(){
		if(this.refs.toolbar === undefined || this.refs.toolbar === null) return;

		let currentTopDistance = this.refs.photoFrame.getBoundingClientRect().top;
		if(currentTopDistance < this.state.standardTopDistance){
			this.refs.toolbar.style.top = this.state.standardTopDistance - currentTopDistance + "px";
		}else{
			this.refs.toolbar.style.top = 0;
		}
	}

	updateCoordinateForCommentForm(){
		if(this.refs.commentForm === undefined || this.refs.commentForm === null 
			|| this.commentFormMoveComplete || this.state.commentFormIsShow === false) return;
		this.commentFormMoveComplete = true;
		let elemY = this.refs.commentForm.getBoundingClientRect().top;
		let winHeight = document.documentElement.clientHeight;
		const elemHeight = 123;
		let distance = elemY + elemHeight  - winHeight;

		if( distance > 0 ) {
			// 表示表单不在显示范围内，或显示不完整 注销无动画方案
			// window.scrollTo(0, window.pageYOffset + distance);

			let oldScrollY = window.pageYOffset;
			const move = (dis) => {
				raf(()=>{
					let currentMove = Math.round(dis * 0.15);
					if(currentMove === 0){
						window.scrollTo(0, oldScrollY + distance);
						return;
					}else{
						window.scrollTo(0, window.pageYOffset + currentMove);
						let nextDistance = dis - currentMove;
						move(nextDistance);
					}
				})
			}
			move(distance);
		}
	}

	// 打开工具栏
	openToolbar(){
		let tempState = Object.assign({}, this.state, {toolbarIsShow: true});
		window.addEventListener('scroll', this.updateCoordinate);
		this.setState(tempState);
	}
	
	// 关闭工具栏
	closeToolbar(){
		let tempState = Object.assign({}, this.state, {toolbarIsShow: false});
		window.removeEventListener('scroll', this.updateCoordinate);
		this.setState(tempState);
	}

	toggleCommentForm(){
		let tempState = Object.assign({}, this.state, {commentFormIsShow: !this.state.commentFormIsShow});
		this.setState(tempState);
	}

	commentSubmit(){
		let formData = {};
		formData.text = this.refs.commentForm.text;
		formData.artist = this.props.photoFrameData.img.artist;
		this.props.actions.addComment(formData);
	}

	closeWaiting(){
		let tempState = Object.assign({}, this.state, {isWaiting: false});
		this.setState(tempState);
	}

	render(){
		
		let toolbarElems = this.state.toolbarIsShow 
							? <div className = "sx-photoFrame-toolbar" ref = { (node)=> {this.refs.toolbar = node}} >
								<span className = "sx-photoFrame-btn-pickUp">
									<a 
										onClick = {
											e => {
												this.props.actions.togglePickUpDialog(true, this.props.photoFrameData.img);
											}
										}
									>
										<i></i>
										<span>
											收集
										</span>
										<span>
											{ this.props.photoFrameData.img.pickUpCount }
										</span>
									</a>
								</span>
								<span className = "sx-photoFrame-btn-like">
									<a 
										onClick = {
											e => {
												this.props.actions.updateLikeCount();
											}
										}
									></a>
								</span>
								<span className = "sx-photoFrame-btn-comment">
									<a 
										onClick = {
											e => {
												this.toggleCommentForm();
											}
										}
									></a>
								</span>
							</div>
							: undefined;

		let commentForm = this.state.commentFormIsShow
							?<div className = "sx-photoFrame-form" ref = {(node)=>{this.refs.commentForm = node}}>
								<img src = {this.props.photoFrameData.img.artist.portrait} />
								<form ref = "commentForm" onSubmit = { e => {e.preventDefault();} }>
									<DtLabel
										childNodeName = {"TEXTAREA"}
										placeholder = {"发表评论"}
									>
										<textarea name="text"></textarea>
									</DtLabel>
									<button 
										type="button"
										onClick = {
											e => {
												this.commentSubmit();
											}
										}
									>
										评论
									</button>
								</form>
							</div>
							: (()=>{ this.commentFormMoveComplete = false; return undefined })();

		let waitingElem = this.state.isWaiting 
							? <div className = "sx-photoFrame-waiting"></div>
							: undefined;

		let imgElem = this.state.isWaiting
							? <img
								className = "dt-display-hidden"
								src = {this.props.photoFrameData.img.src} 
								onLoad = { e => { this.closeWaiting(); }}
								onMouseDown = { e => {e.preventDefault();} }
							/>	
							: <img 
								onMouseDown = { e => {e.preventDefault();}}
								src = {this.props.photoFrameData.img.src} 
								onLoad = { e => { this.closeWaiting(); } 
							}/>									

		return (
			<div 
				className = "sx-photoFrame"
				ref = "photoFrame"
				onMouseOver = {
					e => {
						this.openToolbar();
					}
				}
				onMouseLeave = {
					e => {
						this.closeToolbar();
					}
				}
			>	<Link className="sx-photoFrame-photo" to = {`/home/pic/`+this.props.photoFrameData.img.id}>
					{ waitingElem }
					{ imgElem }
					<u className="sx-photoFrame-mask"></u>
				</Link>
				<h6>{this.props.photoFrameData.img.title}</h6>
				<div className = "sx-photoFrame-count">
					<span>
						<i></i>
						<span>{ this.props.photoFrameData.img.pickUpCount }</span>
					</span>
					<span>
						<i></i>
						<span>{ this.props.photoFrameData.img.likeCount }</span>
					</span>
				</div>
				<div className = "sx-photoFrame-comments">
					<ul>
						<li className = "sx-photoFrame-comment">
							<div>
								<img src = {this.props.photoFrameData.img.artist.portrait} />	
							</div>
							<div>
								<h6>{this.props.photoFrameData.img.artist.nickname}</h6>
								<p>收集到.<span>{this.props.photoFrameData.img.albumName}</span></p>
							</div>
						</li>
						{
							this.props.photoFrameData.comments.map((comment, idx)=>{
								return (
									<li className = "sx-photoFrame-comment" key={idx}>
										<div>
											<img src = { comment.artist.portrait } />	
										</div>
										<div>
											<h6>{ comment.artist.nickname }</h6>
											<p>{ comment.content }</p>
										</div>
									</li>
								);
							})
						}
					</ul>
				</div>
				<CSSTransitionGroup
		          transitionName="photoFrameForm"
		          transitionEnterTimeout={200}
		          transitionLeaveTimeout={150}>
					{ commentForm }
				</CSSTransitionGroup>
				{ toolbarElems }		
			</div>
		);
	}
}

PhotoFrame.propTypes = {
	photoFrameData: PropTypes.shape({
		img: PropTypes.shape({
			imgID: PropTypes.string.isRequired,
			src: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			pickUpCount: PropTypes.string.isRequired,
			likeCount: PropTypes.string.isRequired,
			albumName: PropTypes.string.isRequired,
			artist: PropTypes.shape({
				userID: PropTypes.string.isRequired,
				portrait: PropTypes.string.isRequired,
				nickname: PropTypes.string.isRequired
			}).isRequired
		}).isRequired,
		comments: PropTypes.arrayOf(PropTypes.shape({
			artist: PropTypes.shape({
				portrait: PropTypes.string.isRequired,
				nickname: PropTypes.string.isRequired,
			}).isRequired,
			content: PropTypes.string.isRequired
		}))
	}).isRequired,
	actions: PropTypes.shape({
		togglePickUpDialog: PropTypes.func.isRequired,
		updateLikeCount: PropTypes.func.isRequired,
		addComment: PropTypes.func.isRequired
	}).isRequired
};

export default PhotoFrame
