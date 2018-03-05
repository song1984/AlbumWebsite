import { connect } from 'react-redux';
import React from 'react';
import { toggleMessageCenterTabState } from '../actions/messageCenterAction';

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = {
	toggleMessageCenterTabState
}

const MessageCenterBtn = ({toggleMessageCenterTabState})=>{
	return (
		<span
			onClick = {
				e => {
					toggleMessageCenterTabState(true)
				}
			}
		>
			消息
		</span>
	);
}

const MessageCenterBtnContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MessageCenterBtn);

export default MessageCenterBtnContainer