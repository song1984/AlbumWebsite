import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Modal from '../baseComponents/Modal';
import UploadImgSelectAlbum from './UploadImgSelectAlbum';

/*
	参数说明 
		toggleUploadImgDialogState	func  改变当前的 uploadImgDialogState	不传参数时 默认为 'CLOSE'
		uploadImgDialogState	string  取值为以下五个常量 表示上传图片窗口的 四中显示状态
		uploadImgHandler	func	actionCreate 创建上传图片的异步action
		uploadImgUrl		string	图片上传成功后 生成的 缩略图地址
		userAlbums			array[{string}]	用户往期创建的专辑列表
		releasePicHandler 		func 	发布新的图片 actionCreate 异步action 因为还得修改uploadImgDialogState	至此才算确认图片上传 理解为commit
		hotTags				array	热门标签 
*/

/*
	组件说明 
		在	BEFORE_UPLOAD 中 点击上传图片后 随后进入 UPLOADING -> SELECT_ABLUM 状态
		如果 在SELECT_ABLUM 状态中没有选择专辑并发布 则 图片不会存在于用户上传路片目录中 认为本次上传失败并删除 服务器上的
		相关文件
	
*/

let UploadImgDialog = ({uploadDialogState, toggleUploadImgDialogState, uploadImgDialogState, uploadImgHandler, uploadImgUrl, userAlbums, releasePicHandler, hotTags}) => {

	const modalTitle = '上传图片';

	if(uploadImgDialogState ===  uploadDialogState.CLOSE) {

		return (
			<div className = "dt-img-upload dt-display-hidden" >
				
			</div>
		);
	}else if(uploadImgDialogState === uploadDialogState.UPLOAD_FORM){

		let fileInput;

		return (
			<div className = "dt-img-upload-formwrap" >
				<Modal
					closeHandler = { toggleUploadImgDialogState }
					modalTitle = { modalTitle }
				>
					<div className = "dt-img-upload-form" >
						<form>
							<a>
								<input 
									type="file" 
									name="img" 
									ref = { node => fileInput = node } 
									onChange = {
										e => {
											uploadImgHandler();
										}
									} 
								/> 
								<i></i>上传图片
							</a>
						</form>
						<p>图片需小于10M, 如有来源, 请注明</p>
					</div>
				</Modal>
			</div>
		);
	}else if(uploadImgDialogState === uploadDialogState.UPLOADING){
		
		return (
			<div className = "dt-img-upload-uploadingwrap" >
				<Modal
					closeHandler = { toggleUploadImgDialogState }
					modalTitle = { modalTitle }
				>
					<div className = "dt-img-upload-uploading">
						正在上传 <i></i><i></i><i></i><br/>
						<a 
							onClick = {
								e => {
									e.preventDefault();
									toggleUploadImgDialogState(UPLOAD_FORM);
								}
							}
						>
							取消
						</a>
					</div>
				</Modal>
			</div>
		);
	}else if(uploadImgDialogState === uploadDialogState.SELECT_ABLUM){
		return (
			<UploadImgSelectAlbum  
				toggleUploadImgDialogState = {toggleUploadImgDialogState}
				uploadImgUrl = {uploadImgUrl}
				userAlbums = {userAlbums}
				releasePicHandler = {releasePicHandler}
				hotTags = {hotTags}
			/>
		);
	
	} else if(uploadImgDialogState === uploadDialogState.COMPLETE){

		let footer = <p>
						或: 
						<a
							onClick = {
								e => {
									e.preventDefault();
									toggleUploadImgDialogState(UPLOAD_FORM);
								}
							}
						>
							继续上传
						</a>
						<Link
							to = {''}
						>
							使用堆糖收集工具
						</Link>
					</p>;

		return (
			<div className = "dt-img-upload-completewrap" >
				<Modal
					closeHandler = { toggleUploadImgDialogState }
					modalTitle = { modalTitle }
					footer = {footer}
				>
					<div className="dt-img-upload-complete" >
						<i></i> 收集成功! 
					</div>
				</Modal>
			</div>
		);
	}
};

UploadImgDialog.propTypes = {
	uploadDialogState: PropTypes.object.isRequired,
	toggleUploadImgDialogState: PropTypes.func.isRequired, 
	uploadImgDialogState: PropTypes.string.isRequired,
	uploadImgHandler: PropTypes.func.isRequired,
	uploadImgUrl: PropTypes.string,
	userAlbums: PropTypes.array.isRequired,
	releasePicHandler: PropTypes.func.isRequired,
	hotTags: PropTypes.array.isRequired
};

export default UploadImgDialog







