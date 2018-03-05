import React from 'react';
import PropTypes from 'prop-types';

/*
	组件目的在于去除业务组件中的id属性，因带有id属性不易进行组件复用
	原生label标记 则必须依赖id 
*/


/*
	参数说明
		visableCondition, hiddenCondition 是否显示／关闭placeholder 的判断函数 返回bool 
		各种handler 表示input 的事件回调
		type name 就是 input的 type  name 属性 
*/

const DtInput= ({type, name, placeholder, clickHandler, changeHandler, focusHandler, blurHandler, mouseOverHandler, mouseOutHandler, visableCondition, hiddenCondition}) => {

	let labelTextElem, iptElem;

	function toggle(placeholderType = true){
		labelTextElem.innerText = placeholderType ? placeholder : '';
	}

	/*
		如果不传visableCondition hiddenCondition 则以这个为显示隐藏标准
	*/

	function defaultToggle(){

		if(iptElem === undefined){
			return;
		}

		let str = iptElem.value.trim();
		if(str === ''){
			toggle(true);
		}else {
			toggle(false);
		}
	}

	/*
		凭返回结果认定是否进行 显示或隐藏的切换， 这样即便产生触发事件也能限制更新
		判断函数来自调用者 因此可以依赖本组件之外的资源作为判断条件
	*/
	function placeholderHidden(hiddenCondition){

		if(hiddenCondition === undefined){
			defaultToggle();
			return;
		}

		if(hiddenCondition()) {
			toggle(false);
		}
	}

	function placeholderVisable(visableCondition) {

		if(visableCondition === undefined) {
			defaultToggle();
			return;
		}

		if (visableCondition()) {
			toggle(true);
		}
	}

	/*
		循环检查 和结束检查 
		默认以 获得焦点开始触发循环检查 失去焦点 进行结束检查 结束定时器 并进行最后一次检查

		le t
	*/

	let loopTest;

	setInterval(function(){
		placeholderHidden(hiddenCondition);
		placeholderVisable(visableCondition);
	},100);


	/* 考虑通过函数名 获得参数列表 */

	return (
		<label className = "dt-base-dtLabel" >
			<span
				ref = { node => labelTextElem = node }
			>
				{ placeholder }
			</span>
			<input 
				ref = {
					node => iptElem = node
				}
				type = {type} 
				name = {name}
				onClick = { e => { 
						clickHandler === undefined ? '' : clickHandler(e); 
					}
				}
				onChange = { e => { 
						changeHandler === undefined ? '' : changeHandler(e);
					} 
				}
				onFocus = { e => { 
						focusHandler === undefined ? '' : focusHandler(e);
					} 
				}
				onBlur = { e => { 
						blurHandler === undefined ? '' : blurHandler(e);
					} 
				}
				onMouseOver = { e => {
						mouseOverHandler === undefined ? '' : mouseOverHandler(e);
					}
				}
				onMouseOut = { e => {
						mouseOutHandler === undefined ? '' : mouseOutHandler(e);
					}
				}
			/>
		</label>	
	);
};

DtInput.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	clickHandler: PropTypes.func, 
	changeHandler: PropTypes.func, 
	focusHandler: PropTypes.func, 
	blurHandler: PropTypes.func,
	mouseOverHandler: PropTypes.func,
	mouseOutHandler: PropTypes.func,
	visableCondition: PropTypes.func,
	hiddenCondition: PropTypes.func
};

export default DtInput







