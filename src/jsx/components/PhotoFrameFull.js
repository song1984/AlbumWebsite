import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link, IndexLink } from 'react-router';

const ABSOLUTE_TOP = "ABSOLUTE_TOP";
const ABSOLUTE_BOTTOM = "ABSOLUTE_BOTTOM";
const FIXED_TOP = "FIXED_TOP";

class PhotoFrameFull extends PureComponent {
	
	constructor(props){
		super(props);
		this.state={
			picListType: ABSOLUTE_TOP 
		};
		this.changePicListType = this.changePicListType.bind(this);
	}

	componentWillMount(){
		this.props.getPhotoFrameFullData();
		document.getElementsByTagName("html")[0].style.overflow = "hidden";
	}

	componentDidMount(){
		this.photoFrameFullElem.addEventListener('scroll', this.changePicListType);
	}

	componentWillUnmount(){
		this.photoFrameFullElem.removeEventListener('scroll', this.changePicListType);
		document.getElementsByTagName("html")[0].style.overflow = "auto";
	}

	changePicListType(){

		let picHeight = this.picElem.offsetHeight;
		let picCoordinate = this.picElem.getBoundingClientRect().top;
		let picListHeight = this.picListElem.offsetHeight;
		let picVisibleHeight = picHeight - Math.abs(picCoordinate);

		if(picCoordinate > 0){
			// absolute top 0
			this.state.picListType === ABSOLUTE_TOP ? undefined : this.setState({picListType: ABSOLUTE_TOP});
		}else{
			if(picVisibleHeight > picListHeight){
				// fixed top 0
				this.state.picListType === FIXED_TOP ? undefined : this.setState({picListType: FIXED_TOP});
			}else{
				// absolute bottom 0
				this.state.picListType === ABSOLUTE_BOTTOM ? undefined : this.setState({picListType: ABSOLUTE_BOTTOM});
			}
		}
	}

	render(){
		let clazzName = "sx-photoFrameFull-picList-wrap"
		switch(this.state.picListType){
			case ABSOLUTE_TOP:
				clazzName += " sx-photoFrameFull-picList-absolute-top";
				break;
			case ABSOLUTE_BOTTOM:
				clazzName += " sx-photoFrameFull-picList-absolute-bottom";
				break;
			case FIXED_TOP:
				clazzName += " sx-photoFrameFull-picList-fixed-top";
				break;
			default:
				clazzName += " sx-photoFrameFull-picList-absolute-top";
		}

		return(

			<div className="sx-photoFrameFull" ref={node=>this.photoFrameFullElem=node}>
				<div className="sx-photoFrameFull-content">
					<CSSTransitionGroup
						transitionName="photoFrameFUll"
						transitionAppear={true}
		      			transitionAppearTimeout={800}
		      			transitionEnter={false}
		      			transitionLeave={false}
					>
						<div className="sx-photoFrameFull-pic-wrap" ref={node=>{this.picElem=node}}>
							<Pic 
								img={this.props.img}
								pickupTotal={ this.props.pickupTotal }
								likeTotal={ this.props.likeTotal }
								commentTotal={ this.props.commentTotal }
							/>
							<Comment 
								author={this.props.author}
								img={ this.props.img }
								comments={ this.props.comments }
								tags={this.props.tags}
							/>
						</div>
						<div className={clazzName} ref={node=>{this.picListElem=node}}>
							<PicList 
								author={this.props.author}
								album={this.props.album}
								pics={this.props.pics}
							/>
						</div>
					</CSSTransitionGroup>
				</div>
				<div>
					{/* 关联专辑 表示图片也属于其他的哪些专辑*/}
				</div>
				<div className="sx-photoFrameFull-button">
					<a className="sx-photoFrameFull-button-left">
						<div className="sx-arrow-left"></div>
					</a>
					<a className="sx-photoFrameFull-button-right">
						<div className="sx-arrow-right"></div>
					</a>
					<IndexLink 
						className="sx-photoFrameFull-button-close"
						to="/"
					>
						<div className="sx-close-icon"></div>
					</IndexLink>
				</div>
			</div>
		);
	}
}

class Comment extends PureComponent{

	constructor(props){
		super(props);
		this.state={};
	}

	render(){
		return(
			<div className="sx-photoFrameFull-comment">
				<div className="sx-photoFrameFull-comment-author">
					<img src={this.props.author.avatar}/>
					<h4>{this.props.author.nickname}</h4>
					<span>{ this.props.img.createTime }</span>
				</div>
				<div className="sx-photoFrameFull-comment-tags">
					<h6>标签:</h6>
					{
						this.props.tags.map((tag,idx)=>{
							return(
								<span key={idx}>{tag}</span>
							);
						})
					}
				</div>
				<div className="sx-photoFrameFull-comment-commentList">
					{
						this.props.comments.map((comment, idx)=>{
							return(
								<div key={idx} className="sx-photoFrameFull-comment-commentList-item">
									<img src={comment.author.avatar}/>
									<div>
										<span>{ comment.author.nickname }</span>
										<span>{ comment.createTime }</span>
										<p>{ comment.content }</p>
									</div>
								</div>
							);
						})
					}
				</div>
			</div>
		);
	}
}

class Pic extends PureComponent {

	constructor(props){
		super(props);
		this.state={};
	}

	render(){
		return (
			<div className="sx-photoFrameFull-pic">
				<div  className="sx-photoFrameFull-pic-button">
					<button
						type="button"
						onClick={
							e=>{
								/* 收藏action */
							}
						}
					>
						收藏
					</button>
					<i>
						<svg fill="#dfdfdf" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
						    <path d="M0 0h24v24H0z" fill="none"/>
						    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
						</svg>
					</i>
					<i>
						<svg fill="#dfdfdf" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
						    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
						    <path d="M0 0h24v24H0V0z" fill="none"/>
						    <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
						</svg>
					</i>
				</div>
				<img src={this.props.img.src} />
				<div  className="sx-photoFrameFull-pic-total">
					<i>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
						</svg>
					</i>
					收藏
					<span>{ this.props.pickupTotal }</span>
					<i>
						<svg fill="#dfdfdf" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
						    <path d="M0 0h24v24H0z" fill="none"/>
						    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
						</svg>
					</i>
					点赞
					<span>{ this.props.likeTotal }</span>
					<i>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
						</svg>
					</i>
					评论
					<span>{ this.props.commentTotal }</span>
				</div>
			</div>
		);
	}
}

class PicList extends PureComponent{

	constructor(props){
		super(props);
		this.state={
			columnTotal:3,
			columnData: [[],[],[]]
		};
		this.createData = this.createData.bind(this);
	}

	componentWillMount(){
		this.createData(this.props.pics);
	}

	componentWillReceiveProps(nextProps){
		this.createData(nextProps.pics);
	}

	createData(pics){
		let sourceData = pics.slice();
		let resultData = [[],[],[]];

		sourceData.forEach((item, idx)=>{
			let key = idx % this.state.columnTotal;
			resultData[key].push(item);
		})

		let tempState = Object.assign({}, this.state);
		tempState.columnData = resultData;
		this.setState(tempState);
	}

	render(){
		return(
			<div className="photoFrameFull-picList">
				<div className="photoFrameFull-picList-info">
					<img src={this.props.author.avatar} />
					<h4>{this.props.album.albumName}</h4>
					<span>{this.props.author.nickname}</span>
				</div>
				<div className="photoFrameFull-picList-pics">
					{
						this.state.columnData.map((items, idx)=>{
							return(
								<div key={idx} className="photoFrameFull-picList-pics-col">
									{
										items.map((item, idx)=>{
											return(
												<Link key={idx}>
													<img src={item.src} />
													<u></u>
												</Link>	
											);
										})
									}
								</div>
							);
						})
					}
				</div>
				<button>关注专辑</button>
			</div>
		);
	}
}

PhotoFrameFull.propTypes = {
	author: PropTypes.shape({
		avatar: PropTypes.string.isRequired,
		nickname: PropTypes.string.isRequired
	}).isRequired,
	album: PropTypes.shape({
		albumName: PropTypes.string.isRequired
	}).isRequired,
	pics: PropTypes.arrayOf(PropTypes.shape({
		src: PropTypes.string.isRequired
	})).isRequired,
	img: PropTypes.shape({
		src: PropTypes.string.isRequired,
		createTime: PropTypes.string.isRequired
	}).isRequired,
	commentTotal: PropTypes.number.isRequired,
	likeTotal: PropTypes.number.isRequired,
	pickupTotal: PropTypes.number.isRequired,
	tags:PropTypes.arrayOf(PropTypes.string).isRequired,
	comments: PropTypes.arrayOf(PropTypes.shape({
		author: PropTypes.shape({
			avatar: PropTypes.string.isRequired,
			nickname: PropTypes.string.isRequired,
		}).isRequired,
		createTime: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired
	})),
	getPhotoFrameFullData: PropTypes.func.isRequired
}

export default PhotoFrameFull












