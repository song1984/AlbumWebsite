import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import Modal from '../baseComponents/Modal';
import DtLabel from '../baseComponents/DtLabel';

class CreateAlbumDialog extends Component {

	constructor(props){
		super(props);
		this.state = {
			toggleCreateAlbumDialogState: props.toggleCreateAlbumDialogState,
			createNewAlbum: props.createNewAlbum,
			hotTags: props.hotTags,
			createAlbumDialogState: props.createAlbumDialogState,
			placeholderStatus: true
		};
		this.selectedTagsArr = [];
		this.inputLock = false;
		this.selectedTagsMaxSize = 5;
	}

	componentWillReceiveProps(nextProps){
		let tempState = {
			hotTags: nextProps.hotTags,
			createAlbumDialogState: nextProps.createAlbumDialogState
		};
		tempState.hotTags = tempState.hotTags.map((tag, idx)=>{
			tag.selectedEnable = true;
			return tag;
		})
		
		this.setState(Object.assign({}, this.state, tempState));
	}

	componentDidUpdate(){
		
		if(this.refs.createAlbumForm !== undefined){
			this.refs.createAlbumForm['selectedTags'].addEventListener('compositionstart', ()=>{
				this.inputLock = true;
			})
			this.refs.createAlbumForm['selectedTags'].addEventListener('compositionend', ()=>{
				this.inputLock = false;
			})
		}
	}

	// 切换热门标签的可选和禁选状态, 流程 1 先改成默认可选； 2 然后根据已选tag数组 判断哪些应该修改
	tagToggleSelectStatus(){
		// 遍历hotTags tagName 一致 则更改
		const OFFICIAL = 'official';
		const DEFAULT_STATUS = true;
		let nextHotTags = this.state.hotTags.slice();
		// 先把所有的status 恢复成默认，然后在根据selectedTagsArr 决定哪些应该是禁选
		nextHotTags = nextHotTags.map((tag, idx) => {
			tag.selectedEnable = DEFAULT_STATUS;
			return	tag;
		});
		// 修改同时辨别已选中是否存在官方标签
		let hasOfficial;
		let selectedTagsArr = this.selectedTagsArr;
		nextHotTags = nextHotTags.map((tag, idx)=>{
			selectedTagsArr.forEach(function(tagName,index){
				if(tag.tagName === tagName.trim()){
					tag.selectedEnable = false;
					if(tag.category === OFFICIAL){
						hasOfficial = true;
					}
				}
			})
			return tag;
		});

		// 处理官方标签
		if(hasOfficial){
			// true 表示 已选定中有官方标签 所以 其他的官方也都改成不可选
			nextHotTags = nextHotTags.map((tag, idx)=>{
				if(tag.category === OFFICIAL){
					tag.selectedEnable = false;
				}
				return tag;
			})
		}

		let nextPlaceStatus = this.selectedTagsArr.length > 0 ?  false : true;

		this.setState(Object.assign({}, this.state, {hotTags: nextHotTags}, {placeholderStatus: nextPlaceStatus}));
	}	

	// 从常用标签向输入框增加标签 这里必然是添加
	addTagForInput(tagName){
		// 最多只能选5个标签
		if(this.selectedTagsMaxSize === this.selectedTagsArr.length) return;
		// 不可重复选择
		let isRepeat = false;
		this.selectedTagsArr.forEach((tag, idx)=>{
			if(tag === tagName.trim()){
				isRepeat = true;
			}
		})
		if(isRepeat) return;
		// 不可选择冲突选项
		let tagNameIsOfficial = false;
		const OFFICIAL = 'official';
		this.state.hotTags.forEach((tag, idx)=>{
			// 辨别 当前点击标签是否本身为 official 如果不是则直接放行
			if(tag.category === OFFICIAL){
				if(tag.tagName === tagName){
					tagNameIsOfficial = true;
				}
			}
		})
		// 为true 则表示 有可能冲突 
		if(tagNameIsOfficial){
			let hasOfficial = false;
			// 辨别已选中是否有 category === official
			this.selectedTagsArr.forEach((selected, idx)=>{
				this.state.hotTags.forEach((hotTag, idx)=>{
					if(hotTag.category === OFFICIAL){
						if(hotTag.tagName === selected){
							hasOfficial = true;
						}
					}
				})
			})
			if(hasOfficial){
				return;
			}
		}

		// 新增标签 进入 已选数组 方便修改状态
		this.selectedTagsArr.push(tagName);	
		// 把新增的标签 追加近input value 并对字符串进行修整 目标 每个tag之间最多只有一个空格 最开始不能有空格 结尾必须有空格
		let tempInput = this.refs.createAlbumForm['selectedTags'].value + " " + tagName + " ";
		tempInput = tempInput.trim();
		let regx = new RegExp("\\s+", 'g');
		tempInput = tempInput.replace(regx, " ");
		this.refs.createAlbumForm['selectedTags'].value = tempInput + " ";
		
		// 点击标签添加进去的认为最后一个也有末尾空格
		this.tagToggleSelectStatus();
	};

	// 监听input输入框内容变化 有可能添加 也有可能删除
	inputEventHandler(event){
		let keyCode = event.keyCode;
		const ARROW_LEFT = 37;
		const ARROW_RIGHT = 39;
		const BACKSPACE = 8;
		const DELETE = 46;
		let iptElem = this.refs.createAlbumForm['selectedTags'];
		// 方向键 是为了定位要删除的tag 所以 不需要对 已选数组做更新
		if(keyCode === ARROW_LEFT || keyCode === ARROW_RIGHT) return;

		// 最多选择五个标签  不可超量选
		if(this.selectedTagsMaxSize === this.selectedTagsArr.length && keyCode !== BACKSPACE && keyCode !== DELETE) {
			// 如果选择数量已经达到最大值 且不是想删除 则 直接利用已选 标签数组 覆盖 inputValue
			let iptValue = "";
			this.selectedTagsArr.forEach((tag,idx)=>{
				iptValue += tag + " ";
			})
			iptElem.value = iptValue;
			return;
		}

		let tagArr = [];
		let regx = new RegExp("\\s+");
		tagArr = iptElem.value.split(regx);
		// 删除数组中的空元素
		tagArr = tagArr.filter((tag, idx)=>{
			return tag !== "";
		});

		// 不可重复选择 辨认输入框中的内容是否有重复
		let isRepeat = false;
		for(let i=0; i< tagArr.length; i++){
			for(let j=i+1; j< tagArr.length; j++){
				if(tagArr[i] === tagArr[j]){
					isRepeat = true;
				}
			}
		}
		if(isRepeat){
			// 如果有重复 则使用已选标签 覆盖inputvalue
			let iptValue = "";
			this.selectedTagsArr.forEach((tag,idx)=>{
				iptValue += tag + " ";
			})
			iptElem.value = iptValue;
			return;
		}

		// 不可选择冲突标签 category === official 的只能有一个
		let count = 0;
		const OFFICIAL = 'official';
		tagArr.forEach((tag, idx)=>{
			this.state.hotTags.forEach((hotTag, idx)=>{
				if(hotTag.category === OFFICIAL){
					if(hotTag.tagName === tag){
						count++;
					}
				}
			})
		})
		// 超过 1 个即代表存在冲突选项 
		if(count > 1){
			let iptValue = "";
			this.selectedTagsArr.forEach((tag,idx)=>{
				iptValue += tag + " ";
			})
			iptElem.value = iptValue;
			return;
		}

		// 输入框内容拆分成数组 以空格为分隔符	
		this.selectedTagsArr = tagArr;
		this.tagToggleSelectStatus();
	}


	render(){
		if(!this.state.createAlbumDialogState){

			return (<div className = "dt-createAlbumDialog-wrap"></div>);
		}

		return (
			<div className = "dt-createAlbumDialog-wrap">
				<Modal
					modalTitle = {"创建专辑"}
					closeHandler = {this.state.toggleCreateAlbumDialogState}
				>
					<div className = "dt-createAlbumDialog-body">
						<div className = "dt-createAlbumDialog-body-form">
							<form ref="createAlbumForm" onSubmit = { e => e.prevenDefault} >
								<div>
									<span>专辑名</span>
									<DtLabel
										placeholder = {""}
										childNodeName = {"INPUT"}
									>
										<input type = "text" name = "albumName" />
									</DtLabel>
								</div>
								<div>
									<span>描述</span>
									<DtLabel 
										placeholder = {""}
										childNodeName = {"TEXTAREA"}
									>
										<textarea name = "albumDescribe"
											onFocus = {
												e => {
													this.props.toggleAlertState(true, '建议你多写点儿，其实写多少也没人看');
												}
											}
										>
											
										</textarea>
									</DtLabel>
								</div>
								<div>
									<span>标签</span>
									{
										(()=>{
											let placeholder = this.state.placeholderStatus ? "多个标签用空格隔开" : '';
											return (
												<DtLabel
													placeholder = { placeholder }
													childNodeName = {"INPUT"}
												>
													<input
														type = "text" 
														name = "selectedTags" 
														autoComplete = "off"
														onKeyUp = { 
															e=>{
																if(!this.inputLock){
																	this.inputEventHandler(e)
																}													
															} 
														}
													/>
												</DtLabel>
											);
										})()
									}
								</div>
								{/*								
								<Link 
									to = {""}
									onClick = {
										e => {
											let albumInfomation = {
												albumName: this.createAlbumForm.albumName,
												albumDescribe: this.createAlbumForm.albumDescribe,
												selectedTags: this.createAlbumForm.selectedTags
											};
											this.createNewAlbum(albumInfomation);
										}
									}
								>
								*/}
								<Link 
									to = {""}
									onClick = {
										e => {
											this.state.createNewAlbum();
										}
									}
								>
									创建
								</Link>
							</form>
						</div>
						<div className = "dt-createAlbumDialog-body-hotTags">
							<h3>常用标签</h3>
							{
								this.state.hotTags.map( 
									(tag, idx) => {
										let className = tag.selectedEnable 
											? 'dt-createAlbumDialog-body-hotTags-selectedEnable' 
											: 'dt-createAlbumDialog-body-hotTags-selectedDisable';
										return (
											<a
												className = {className}
												key = {idx}
												onClick = {
													e => {
														e.preventDefault();
														this.addTagForInput(e.target.innerText);
													}
												}
											>
												{tag.tagName}	
											</a>
										);
									} 
								)
							}
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

CreateAlbumDialog.propTypes = {
	toggleCreateAlbumDialogState: PropTypes.func.isRequired,
	createNewAlbum: PropTypes.func.isRequired,
	hotTags: PropTypes.arrayOf(PropTypes.shape({
		tagName: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired
	})),
	createAlbumDialogState: PropTypes.bool.isRequired
};

export default CreateAlbumDialog