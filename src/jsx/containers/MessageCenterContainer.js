import { connect } from 'react-redux';
import MessageCenter from '../components/MessageCenter';
import { toggleMessageCenterTabState } from '../actions/messageCenterAction';

const mapStateToProps = (state)=>{
	return {
		messageCenterTabState: state.site.UIContro.messageCenterTabState,
		tips: state.messageCenter.tips,
		jointlyAlbum: state.messageCenter.jointlyAlbum,
		privateMessage: state.messageCenter.privateMessage,
		friends: state.messageCenter.friends
	}
}

const mapDispatchToProps = {
	toggleMessageCenterTabState
}

const MessageCenterContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MessageCenter);

export default MessageCenterContainer