import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AlbumFrame extends PureComponent {

	constructor(props){
		super(props);
		// 是否横向自适应 =true时 约束高度， 宽度auto  否则相反 
		this.state = {
			isTransverse: false
		};
	}

	selfAdaption(){
		this.cover.offsetWidth > this.cover.offsetHeight ? this.setState({isTransverse: true}) : undefined;
	}

	render(){
		let clazzName = this.state.isTransverse ? "sx-albumFrame-cover-transverse" : undefined;
		return (
			<div className="sx-albumFrame">
				<div className="sx-albumFrame-pics">
					<div className="sx-albumFrame-cover">
						<img
							className = {clazzName} 
							src={this.props.album.cover}  
							onLoad={ e=>{ this.selfAdaption(); }}
							ref = { node => this.cover = node }
						/>
					</div>
					<div className="sx-albumFrame-preview">
						{
							this.props.album.previews.map((p,idx)=>{
								return(
									<img src={p.src} key={idx} />
								);
							})
						}
					</div>
					<u className="sx-albumFrame-mask">
						{this.props.album.albumName}
					</u>
				</div>
				<div className="sx-albumFrame-buttons">
					{
						this.props.logginUserId === this.props.album.author.id
						? <div className="sx-albumFrame-edit">
							<button type="button">修改</button>
						</div>
						: <div className="sx-albumFrame-author">
							<img src={this.props.album.author.portrait} />
							{this.props.album.author.nickname}
							<button type="button">关注</button>
						</div>
					}
				</div>
			</div>
		);
	}
}

AlbumFrame.propTypes = {
	logginUserId: PropTypes.string.isRequired,
	album: PropTypes.shape({
		cover: PropTypes.string.isRequired,
		previews: PropTypes.arrayOf(PropTypes.shape({
			src: PropTypes.string.isRequired
		})).isRequired,
		author: PropTypes.shape({
			id: PropTypes.string.isRequired,
			portrait: PropTypes.string.isRequired,
			nickname: PropTypes.string.isRequired
		})
	}).isRequired,
}

export default AlbumFrame
