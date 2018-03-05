import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AlbumFrame from './AlbumFrame';
import SxScrollLeft from './SxScrollLeft';
const raf = require('raf');

class RecommendAlbum extends PureComponent {

	constructor(props){
		super(props);
		this.state = {};
	}

	componentWillMount(){
		this.props.getRecommendAlbumData();
	}

	render(){
		return (
			<div className="sx-recommendAlbum">
				<h4>专辑推荐</h4>
					<SxScrollLeft 
						childrenLength = {this.props.albums.length}
						step = {2}
					>
						{
							this.props.albums.map((album, idx)=>{
								return(
									<AlbumFrame 
										key = {idx}
										logginUserId = {this.props.logginUserId} 
										album = {album}
									/>
								);
							})
						}
				</SxScrollLeft>
			</div>
		);
	}
}

RecommendAlbum.propTypes = {
	logginUserId: PropTypes.string.isRequired,
	albums: PropTypes.array.isRequired,
	getRecommendAlbumData: PropTypes.func.isRequired
}

export default RecommendAlbum
