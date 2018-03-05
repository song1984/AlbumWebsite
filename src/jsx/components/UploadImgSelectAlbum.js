import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DtLabel from '../baseComponents/DtLabel';
import Modal from '../baseComponents/Modal';


class UploadImgSelectAlbum extends Component {
	/*
		state状态控制  tagList 的显示隐藏 和 内容（被一个数组控制）
		selectedTags 包含用户选定的所有标签 渲染到 input 前面的 div里
	*/
	constructor(props) {
		super(props);
		/*
			空缺两个方法 1.实时更新热门标签 2.实时更新用户专辑，
			这两个action更新state之后 在生命周期中可以放弃因此产生的render
		*/
		this.state = {
			toggleUploadImgDialogState: props.toggleUploadImgDialogState, // 关闭按钮action
			uploadImgUrl: props.uploadImgUrl, // 上传图片生成的缩略图 url
			userAlbums: props.userAlbums, // 用户过往创建的专辑
			releasePicHandler: props.releasePicHandler, // 发布图片按钮的action
			hotTags: props.hotTags,
			selectedTags: [],	// 记录所有已选标签, 内部state
			selectedTagsMaxSize: 5,
			currentSelectedAlbum: null,		// 起初为专辑列表的第一个 option 
			UIContro: {
				albumListStatus: false, // t 显示 f 隐藏 
				taglistStatus: false,
				tagListPlaceholderStatus: true
			}		
		};
	}

	componentWillMount(){
		// 给hotTags 添加 是否可选 状态
 		let hotTags = this.state.hotTags.slice();
		let tempHotTags = hotTags.map((tag, idx)=>{
			tag = Object.assign({}, tag, {selectEnable: true})
			return tag;
		})

		let currentSelectedAlbum = this.state.userAlbums[0];

		let tempState = Object.assign({}, this.state, {currentSelectedAlbum}, {hotTags: tempHotTags});
		this.setState(tempState);
	}

	componentDidUpdate(props, prevState) {

		/* 组件更新完毕时 调整 已选定标签的 scroll 
			显示弹层时 定位到scroll最下端 为了把光标给输入框 关闭时 定位到scroll最上边 为了把选定的漏出来
		*/
		let currentUIContro = this.state.UIContro;
		if(currentUIContro.taglistStatus) {
			this.refs.tagIptLabel.scrollTop = this.refs.tagIptLabel.scrollHeight;
		}else{
			this.refs.tagIptLabel.scrollTop = 0;
		}

		// 定位专辑列表 scroll位置 当新增专辑时 定位到最低端
		let prevUserAlbums = prevState.userAlbums;
		let currentUserAlbums = this.state.userAlbums;

		if(currentUserAlbums.length > prevUserAlbums.length){
			this.refs.userAlbumsList.scrollTop = this.refs.userAlbumsList.scrollHeight;
		}
	}


	// albums 系列 函数开始
	// 显示隐藏 弹层	参数1 t 显示 f 隐藏  参数2 表示 如果为true 则不更新state 只将处理完成的片段返回
	toggleAlbumList(status, getState = false){
		let UIContro = Object.assign({}, this.state.UIContro);
		UIContro.albumListStatus = status;

		let tempState = Object.assign({}, this.state, {UIContro: UIContro});
		if(getState){
			return UIContro;
		}else{
			this.setState(tempState);
		}	
	}

	// 新增专辑
	addAlbum(){

		let newAlbum = this.refs.createAlbumForm['newAlbum'].value.trim();;		
		// 不可为空白名称
		if(newAlbum === undefined || newAlbum === null || newAlbum ==='') return;
		// 不可新增重复专辑
		let userAlbums = this.state.userAlbums.slice();
		if(userAlbums.indexOf(newAlbum) > -1) return;
		userAlbums.push(newAlbum);
		this.refs.createAlbumForm['newAlbum'].value = '';
		this.setState(Object.assign({}, this.state, {userAlbums}))
	}

	// 渲染专辑列表
	displayAlbumList(){
		return (
			<div className = "dt-img-upload-ablumList-body">
				<select
					ref = "userAlbumsList" 
					name = "albums" size = "10"
					onClick = {e=>{
						let elem = e.target;
						this.selectedAlbum(elem);
					}}
				>
					{
						this.state.userAlbums.map(( album, idx ) => {
							return (
								<option 
									key = {idx} 
									data-subscript = {idx}
								>
									{ album }
								</option>
							);
						})
					}
				</select>
				<div className = "dt-img-upload-ablumList-btn" >
					<input 
						type = "text" name = "newAlbum" 
						onKeyDown = {
							e => {
								const ENTER = 13;
								if (e.keyCode === ENTER){
									this.addAlbum();
								}
							}
						}
					/>
					<button type = "button" onClick = { e => this.addAlbum() } >创建</button>
				</div>
			</div>
		);
	}

	selectedAlbum(elem){
		let currentSelectedAlbum = this.refs.createAlbumForm['albums'].value;
		let UIContro = this.toggleAlbumList(false, true);
		this.setState(Object.assign({}, this.state, {currentSelectedAlbum}, {UIContro}))
	}
	// album 系列 函数结束

	// tagList 系列 函数开始
	// tagList 弹层
	displayTagList(){
		return (
			<div 
				className = "dt-img-upload-tagList" 
				onClick = { e => e.stopPropagation()}
			>
				<i onClick = { e => { this.toggleTagList(false)} } ></i>
				<span>热门标签:</span>
				{
					this.state.hotTags.map((tag,idx) => {
						let className = tag.selectEnable === true 
							? 'dt-img-upload-tagList-enableSelect' 
							: 'dt-img-upload-tagList-disableSelect';
						return (
							<a 
								className = {className}
								key = {idx}
								data-category = {tag.category}
								data-subscript = {idx}
								onClick = {
									e => {
										e.preventDefault();
										let elem = e.target.nodeName === 'A' ? e.target : e.target.parentNode;
										this.selectedTagHandler(elem);
									}
								}
							>
								<i></i>
								{ tag.tagName }
							</a>
						);
					})
				}
			</div>
		);
	}

	// 选择标签
	selectedTagHandler(elem) {
		// 最多选五个
		if(this.state.selectedTags.length >= this.state.selectedTagsMaxSize) return;
		let subscript = elem.getAttribute('data-subscript');
		let category = elem.getAttribute('data-category');
		let selectedTags = this.state.selectedTags.slice();
		let hotTags = this.state.hotTags.slice();

		// 不能重复选
		let isSelect = this.state.selectedTags.filter((st)=>{
			return st.tagName.trim() === hotTags[subscript].tagName.trim();
		})

		if(isSelect.length > 0){
			return;
		}

		// 状态为禁选的不能选 因为有其他选项和他互斥
		if(!hotTags[subscript].selectEnable) {
			return;
		}	

		const OFFICIAL = 'official';

		// 如果是官方分类标签则将所有官方标签禁选
		if(category === OFFICIAL){
			// 所有 category 的全部改为不可选
			hotTags.forEach((tag,idx)=>{
				if(tag.category === OFFICIAL) tag.selectEnable = false; 
			})
		}else {
			hotTags[subscript].selectEnable = false;
		}

		selectedTags.push(hotTags[subscript]);
		let tempState = Object.assign({}, this.state, {selectedTags});

		this.setState(tempState);
	}

	// 放弃选择 指定的标签 参数 idx 为 删除标签在selectedTags 中的位置
	unSelectedTagHandler(index) {
		// 如果已经没有内容可删 直接返回
		if(this.state.selectedTags.length === 0) return;
		// 从selectedTags 中获得指定的元素
		let unselectTag = this.state.selectedTags[index];
		// 辨认改元素的category，并根据结果确认要改变状态的hotTags
		let hotTags = this.state.hotTags.slice();
		const OFFICIAL = 'official';
		if (unselectTag.category === OFFICIAL) {
			hotTags.forEach((ht,idx)=>{
				if (ht.category === OFFICIAL) ht.selectEnable = true;
			})
		}else {
			let tags = hotTags.filter((ht)=>{
				return ht.tagName === unselectTag.tagName
			})
			tags[0].selectEnable = true;
		}
		
		// 从selectedTags 中删除指定的元素
		let selectedTags = this.state.selectedTags.filter((tag,idx)=>{
			return parseInt(idx) !== parseInt(index);
		})

		// 更新state
		let tempState = Object.assign({}, this.state, {selectedTags, hotTags});
		this.setState(tempState);
	}

	// 追加标签，用户手动输入的标签
	appendTag(tagName){

		// 辨认 标签是否已经存在于 selectedTags 中 如已存在 直接返回
		let isSelected = this.state.selectedTags.filter((tag)=>{
			return tag.tagName.trim() === tagName.trim();
		})
		
		if(isSelected.length > 0) return;

		// 辨认 标签是否存在于 hotTags 如果存在 返回该数组元素 并以此元素创建 element 然后selectedTagHandler
		let indexHotTags;
		this.state.hotTags.forEach(function(item,index){
			if(item.tagName.trim() === tagName.trim()){
				indexHotTags = index;
			}
		})

		if(indexHotTags > -1){
			let elem = document.createElement('a');
			let hotTag = this.state.hotTags[indexHotTags];
			elem.setAttribute('data-subscript', indexHotTags);
			elem.setAttribute('data-category', hotTag.category);
			this.selectedTagHandler(elem);
		}else{
			// 如果已经有五个已选定 则不能在添加新的标签
			if(this.state.selectedTags.length >= this.state.selectedTagsMaxSize) return;
			// 如果hotTags 中没有这个把这个新增的设为 第一个 非official
			let hotTags = this.state.hotTags.slice();
			const OFFICIAL = 'official';
			// 找到分割点
			let division;
			for(let i=0; i<hotTags.length; i++){
				if(hotTags[i].category !== OFFICIAL){
					division = i;
					break;
				}
			}

			let newTag = {
				tagName: tagName,
				category: 'other',
				selectEnable: false
			}
			// 创建新的hotTags
			hotTags = [...hotTags.slice(0,division), newTag, ...hotTags.slice(division, hotTags.length)];
			
			let selectedTags = this.state.selectedTags.slice();
			selectedTags.push(newTag);

			let tempState = Object.assign({}, this.state, {hotTags, selectedTags});
			this.setState(tempState);
		}

	}

	// 如果tagList 关闭 则 尝试打开placeholder 如果 selectTag不为空 或 inputvalue 不为空则继续隐藏
	toggleTagListPlaceholder(status){
		// 如果打算显示提示 必须先查看是否有输入内容 和已选定标签
		let len = this.state.selectedTags.length;
		let iptVal = this.refs.createAlbumForm['picTags'].value.trim();
		if(status && len === 0 && iptVal === ''){

			return true;
		}else {
			return false;
		}
	}

	// 显示 / 隐藏 tagList 弹层
	toggleTagList(status, getState=false){

		let UIContro = Object.assign({}, this.state.UIContro);
		UIContro.taglistStatus = status;
		
		// 获得tagList placehodler状态
		let tagListPlaceholderStatus
		if(status){
			tagListPlaceholderStatus = this.toggleTagListPlaceholder(false);
		}else {
			tagListPlaceholderStatus = this.toggleTagListPlaceholder(true);
		}

		UIContro.tagListPlaceholderStatus = tagListPlaceholderStatus;
		let tempState = Object.assign({}, this.state, {UIContro: UIContro});

		if(getState){
			return UIContro;
		}else{
			this.setState(tempState);
		}	
	}

	// tagList 系列 函数结束


	// 点击空白区域 关闭所有弹层
	clearAnyList(){
		let tagList = this.toggleTagList(false, true);
		let albumList = this.toggleAlbumList(false, true);
		let subState = {
			UIContro: {
				albumListStatus: albumList.albumListStatus,
				taglistStatus: tagList.taglistStatus,
				tagListPlaceholderStatus: tagList.tagListPlaceholderStatus
			}
		}

		let tempState = Object.assign({}, this.state, subState);

		this.setState(tempState);
	}


	render(){
		return (
			<div 
				className = "dt-img-upload-selectAlbum-wrap"  
				onClick = { 
					e => {
						e.stopPropagation();
						this.clearAnyList();
					}
				}
			>
				<Modal
					closeHandler = { this.state.toggleUploadImgDialogState }
					modalTitle = { '上传图片' }
				>
					<div className = "dt-img-upload-selectAlbum" >
						<div className = "dt-img-upload-selectAlbum-imgwrap">
							<img src = { this.state.uploadImgUrl } />
						</div>	
						<form ref = "createAlbumForm" onSubmit = {e=> e.preventDefault()}>
							<div className = "dt-img-upload-ablumList" onClick = { e => e.stopPropagation() }>
								<div 
									className = "dt-img-upload-ablumList-title"
									onClick = {
										e => {
											e.stopPropagation();
											this.toggleAlbumList(true);
										}
									}
								>
									{ this.state.currentSelectedAlbum }
									<i></i>
								</div>
								{ this.state.UIContro.albumListStatus ? this.displayAlbumList() : ''}
							</div>
							<DtLabel
								placeholder = {"写点介绍, 让更多人喜欢ta"}
								childNodeName = {"TEXTAREA"}
							>
								<textarea name = "synopsis"></textarea>
							</DtLabel>
							
							<div 
								className = "dt-img-upload-tags" 
								onClick = {
									e=>{ e.stopPropagation() }
								}
							>
								<i></i>
								<label className = "dt-img-upload-tags-input" ref = "tagIptLabel" >
									<span>
										{ (()=>{
											let str = this.state.UIContro.tagListPlaceholderStatus ? '添加适合的标签 方便大家找到' : '';
											return str;
										})() }
									</span>
										{
											this.state.selectedTags.map(
												(tag, idx) => {
													let str = "#" + tag.tagName + " ";
													return (
														<a 
															key={idx}
															data-subscript = {idx}
															onClick = {
																e =>{
																	e.preventDefault();
																	let index = e.target.getAttribute('data-subscript');
																	this.unSelectedTagHandler(index);
																}
															} 
														>
															{ str }
														</a> 
													);
												}
											)
										}
									<input 
										type="text" 
										name="picTags"
										autoComplete = "off"
										onFocus = { e => { this.toggleTagList(true)} }
										onKeyDown = {
											e => {
												// 如果 backspace 则判断 value 是否为'' 如果是 则删除 最后一个已选标签
												const BACKSPACE = 8;
												const ENTER = 13;
												// 利用输入法时无法获得keycode 防止输入拼音成为正式内容, 输入完毕后 keyCode恢复正常时可以触发以下
												if(e.keyCode === ENTER){
													let regx = new RegExp("[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\,\n]");
													let tagName = e.target.value.replace(regx, '').trim();
													// 做好准备工作 然后清除输入框 -> 执行添加  
													e.target.value = '';
													let regxforIpt = new RegExp("(null|undefined)");
													if(tagName === ''|| regxforIpt.test(tagName)) return; 
													this.appendTag(tagName);
												}else if(e.keyCode ===  BACKSPACE && e.target.value === ''){
													let lastSelected = this.state.selectedTags.length - 1;
													return this.unSelectedTagHandler(lastSelected);
												}
											}
										}
										onKeyUp = {
											e => {
												// 输入 , 时 新增一个 因为 keydown 时 输入法导致无法获得正确keycode
												const COMMA = 188;
												if(e.keyCode === COMMA){	
													let regx = new RegExp("[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\,\n]");
													let tagName = e.target.value.replace(regx, '').trim();
													// 做好准备工作 然后清除输入框 -> 执行添加  
													e.target.value = '';
													let regxforIpt = new RegExp("(null|undefined)");
													if(tagName === ''|| regxforIpt.test(tagName)) return; 
													this.appendTag(tagName);
												}
											}
										}
									/>
								</label>
								{ this.state.UIContro.taglistStatus ? this.displayTagList() : '' }
							</div>
						{/*
							<button onClick = { e => this.state.releasePicHandler(createAlbumForm) } type = "button" >
						*/}
							<button onClick = { e => this.state.releasePicHandler() } type = "button" >
								发布
							</button>
						</form>
					</div>
				</Modal>
			</div>
		);
	}
}

UploadImgSelectAlbum.propTypes = {
	toggleUploadImgDialogState: PropTypes.func.isRequired,
	uploadImgUrl: PropTypes.string,
	userAlbums: PropTypes.array.isRequired,
	releasePicHandler: PropTypes.func.isRequired,
	hotTags: PropTypes.array.isRequired
}

export default UploadImgSelectAlbum