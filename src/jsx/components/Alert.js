import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Alert extends PureComponent {

	constructor(props){
		super(props);
		this.state = {};
		this.closeHandler = props.toggleAlertState;
	}

	componentDidUpdate(){
		this.refs.closeBtn !== undefined ? this.refs.closeBtn.focus() : '';
	}

	render(){
		if(this.props.alertState){
			return (
				<div className = "sx-alert" >
					<div className = "sx-alert-wrap">
						<div className = "sx-alert-body">
							<div className = "sx-alert-header">
								<button
									type = "button" 
									className = "sx-alert-closeBtn"
									ref = "closeBtn"
									onClick = {
										e => {
											this.closeHandler();
										}
									}
									onKeyDown = {
										e => {
											e.preventDefault();
										}
									}
									onKeyUp = {
										e => {
											e.preventDefault();
										}
									}
								>	
								</button>
							</div>
							<div className = "sx-alert-main">
								{this.props.content}
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className = "sx-alert" ref = "alertDialog"></div>
			);
		}
	}
}

Alert.propTypes = {
	toggleAlertState: PropTypes.func.isRequired,
	alertState: PropTypes.bool.isRequired,
	content: PropTypes.string
};

export default Alert
