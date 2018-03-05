import React from 'react';
import PropTypes from 'prop-types';
import supportAniEnd from '../tools/dtAnimationEnd';
/*
	import Mask  CloseBtn 
*/

/*
	模态窗口
*/

const Modal = ( { closeHandler, modalTitle, children, footer } ) => {

	let modalDialog;

	return (
		<div className = "dt-base-Modal" >
			<div className = "dt-base-Mask" >
				<div className = "dt-base-Modal-dialog dt-fadein" ref = { node =>  modalDialog = node } >
					<div className = "dt-base-Modal-dialog-title">
						{ modalTitle }
						<a 
							className = "dt-base-btn-Close" 
							onClick = { 
								e => {
									e.preventDefault();
									if(supportAniEnd.length){
										modalDialog.addEventListener( supportAniEnd[0].event, function(){
											closeHandler();
										})
										modalDialog.className = "dt-base-Modal-dialog dt-fadeout";
									}else {
										closeHandler();
									}			
								} 
							}
						>
						</a>
					</div>
					<div className = "dt-base-Modal-dialog-body">
						{ children }
					</div>
					<div className = "dt-base-Modal-dialog-footer">
						{ footer }
					</div>
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	closeHandler: PropTypes.func.isRequired,
	modalTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.element]),
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.element]),
	footer: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.element])
};

export default Modal






