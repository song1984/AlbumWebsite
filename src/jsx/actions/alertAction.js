export const toggleAlertState = (alertState = false, alertContent = "") => {
	
	function setAlertState(alertState){
		return {
			type: "TOGGLE_ALERT_STATE",
			alertState 
		}
	}

	function setAlertContent(alertContent){
		return {
			type: "SET_ALERT_CONTENT",
			alertContent
		}
	}

	return (dispatch) => {
		dispatch(setAlertContent(alertContent));
		dispatch(setAlertState(alertState));
	}
}
