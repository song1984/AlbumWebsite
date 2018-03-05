import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from '../baseComponents/Modal';

class PickUpDialog extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			albums: props.albums,
			albumsIsShow: false,
			selectedAlbum: {
				albumID: '',
				albumName: "默认专辑"
			}
		};
		this.defaultSelectedAlbum = {
			albumID: '',
			albumName: "默认专辑"
		};
		this.pickUpImgData = {	// 需要当前用户id 用户专辑id 专辑名称 如果是新建专辑则只有专辑名称  图片id 图片名称
			userID:'',
			album: {
				albumID:'',
				albumName:''
			},
			imgID: '' 
		};	
		this.toggleAlbumsElemStatus = this.toggleAlbumsElemStatus.bind(this);
		this.selectAlbum = this.selectAlbum.bind(this);
	}

	componentWillReceiveProps(nextProps){
		let tempState = Object.assign({}, this.state, {albums: nextProps.albums});
		this.setState(tempState);
	}

	componentDidUpdate(){
		if(!this.props.pickUpDialogStatus){
			let tempState = Object.assign({}, this.state);
			tempState.albumsIsShow = false;
			tempState.selectedAlbum = this.defaultSelectedAlbum;
			this.setState(tempState);
		}
	}

	toggleAlbumsElemStatus(status, returnNewState = false){
		let tempState = Object.assign({}, this.state);
		tempState.albumsIsShow = status;
		if(returnNewState){
			return tempState;
		}else{
			this.setState(tempState);
		}
	}

	selectAlbum(album){
		let tempState = this.toggleAlbumsElemStatus(false, true);
		if(album !== undefined && album !== null){
			this.pickUpImgData = {
				userID:this.props.userID,
				album: album,
				imgID: this.props.img.imgID
			};
			// 这里新增专辑并不是真的创建新专辑，只有点击了收藏之后 连同图片信息一同传到后台才能创建，这个只是改组件内的状态
			if(this.state.albums.indexOf(album) < 0) tempState.albums.push(album);
		}else {
			album = this.defaultSelectedAlbum
		}
		
		tempState.selectedAlbum = album;
		this.setState(tempState);
	}

	moveImg(event){
		let visualAreaHeight = this.preview.offsetHeight;
		let imgHeight = this.preview.scrollHeight;
		let range = imgHeight - visualAreaHeight;
		let ratio = range / visualAreaHeight;
		let imgTop = this.preview.getBoundingClientRect().top;
		let mouseClientY = event.clientY;

		this.preview.scrollTop = (mouseClientY - imgTop) * ratio;
	}

	render(){
		if(!this.props.pickUpDialogStatus){
			return (
				<div className="sx-pickUpDialog"></div>
			);
		}

		let albumSelectElem = this.state.albumsIsShow 
			? <div 
				className="sx-pickUpDialog-form-albums-list" 
				onClick={
					e => {
						e.stopPropagation();
						let subscript = e.target.getAttribute('data-key');
						this.selectAlbum(this.props.albums[subscript]);
					}
				}>
				<ul>
					<li>默认专辑</li>
					{ 
						this.state.albums.map((album, idx)=>{
							return (
								<li key={idx} data-key = {idx}>
									{album.albumName}
								</li>
							);
						})
					}
				</ul>
				<section
					onClick = {
						e=>{
							e.stopPropagation();
						}
					}
				>
					<input type="text" ref={ node => {this.albumNameIpt = node} }/>
					<button 
						type="button"
						onClick={
							e => {
								e.preventDefault();
								// 更新本地state中的 albums  和 albumsIsShow 创建pickUpImg 数据对象
								let album = {
									albumID: null,
									albumName: this.albumNameIpt.value.trim()
								};
								this.selectAlbum(album);
							}
						}
					>
						创建
					</button>
				</section>
			</div>
			:  [
					<div 
						className="sx-pickUpDialog-form-albums-selected"
						key = {"albums-selected"}
						onClick = {
							e => {
								e.stopPropagation();
								this.toggleAlbumsElemStatus(true);
							}
						}
					>
						<span>
							{this.state.selectedAlbum.albumName}
						</span>
						<i></i>
					</div>, 
					<div className="sx-pickUpDialog-form-photoName" key={"photoName"}>
						{this.props.img.title}
					</div>,
					<button 
						type="button"
						key={"selectAlbumButton"} 
						onClick = {
							e => {
								e.preventDefault();
								this.props.pickUpImgHandler(this.pickUpImg);
							}
						}
					>
						收集
					</button>
				]

		return (
			<div 
				className="sx-pickUpDialog"
				onClick = {
					e => {
						e.stopPropagation();
						this.toggleAlbumsElemStatus(false);
					}
				}
			>
				<Modal
					closeHandler = {this.props.togglePickUpDialog}
					modalTitle = {"收集"}
					footer = {undefined}
				>
					<div className="sx-pickUpDialog-body">
						<section 
							ref = {node=>this.preview = node}
							className="sx-pickUpDialog-preview"
							onMouseMove = {
								e => {
									this.moveImg(e);
								}
							}
						>
							<img src = {this.props.img.src} />
							<u className="sx-pickUpDialog-mask"></u>
						</section>
						<section className="sx-pickUpDialog-form">
							<h6>收集到</h6>
							<div className="sx-pickUpDialog-form-albums">
								{ albumSelectElem }
							</div>
						</section>
					</div>
				</Modal>
			</div>
		);
	}
}

PickUpDialog.propTypes = {
	albums: PropTypes.arrayOf(PropTypes.shape({
		albumID: PropTypes.string.isRequired,
		albumName: PropTypes.string.isRequired
	})).isRequired,
	userID: PropTypes.string.isRequired,
	img: PropTypes.shape({
		imgID: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		src: PropTypes.string.isRequired
	}).isRequired,
	pickUpDialogStatus: PropTypes.bool.isRequired,
	pickUpImgHandler: PropTypes.func.isRequired,
	togglePickUpDialog: PropTypes.func.isRequired
}

export default PickUpDialog