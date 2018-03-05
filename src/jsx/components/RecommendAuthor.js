import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AuthorFrame from './AuthorFrame';
import SxScrollLeft from './SxScrollLeft';

class RecommendAuthor extends PureComponent {

	constructor(props){
		super(props);
		this.state = {}
	}

	componentWillMount(){
		this.props.getRecommendAuthorData();
	}

	render(){
		return(
			<div className="sx-recommendAuthor">
				<h4>名人堂</h4>
				<SxScrollLeft
					childrenLength = {this.props.authors.length}
					step = {2}
				>
					{
						this.props.authors.map((author, idx)=>{
							return (
								<AuthorFrame user={author} key={idx}/>
							);
						})
					}
				</SxScrollLeft>
			</div>
		);
	}
}

RecommendAuthor.propTypes = {
	authors: PropTypes.array.isRequired,
	getRecommendAuthorData: PropTypes.func.isRequired
}

export default RecommendAuthor