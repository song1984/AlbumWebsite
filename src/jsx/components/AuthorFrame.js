import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { stackBlurImage } from '../tools/stackBlur.js';

class AuthorFrame extends PureComponent {

	constructor(props){
		super(props);
		this.state = {};
	}

	render(){
		return (
			<div className="sx-authorFrame">
				<div className="sx-authorFrame-avatar">
					<img src={this.props.user.avatar} />
					<u className="sx-authorFrame-decorate"></u>
				</div>
				<div className="sx-authorFrame-info">
					<div className="sx-authorFrame-nickname">
						{this.props.user.nickname}
					</div>
					<div className="sx-authorFrame-pickupTotal">
						<i></i>
						{this.props.user.pickupTotal}
					</div>
					<div className="sx-authorFrame-interest">
						<span>擅长领域:</span>
						{this.props.user.interest}
					</div>
				</div>
			</div>
		);
	}
}

AuthorFrame.propTypes = {
	user: PropTypes.shape({
		avatar: PropTypes.string.isRequired,
		nickname: PropTypes.string.isRequired,
		pickupTotal: PropTypes.number.isRequired,
		interest: PropTypes.string.isRequired
	}).isRequired
}

export default AuthorFrame