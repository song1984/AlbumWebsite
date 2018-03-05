import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class PageView extends PureComponent {

	constructor(props){
		super(props);
		this.state = {};
	}

	componentWillMount(){
		// 组件实例生成后 获取指定页的数据 和 数据总量 ， 这些通过一个action 获得 这个action由业务组件提供
		this.props.getPageData(this.props.pageNum, this.props.pageSize);
	}

	createPageElems(totalItem){
		let pageTotal = Math.ceil(totalItem / this.props.pageSize);
		let pageElems = [];
		for(let i=1; i<=pageTotal; i++){
			let clazzName = this.props.pageNum === i ? "sx-pageView-selected" : "sx-pageView-unSelected";
			let linkTo = this.props.linkTo + `/?pageNum=${i}&pageSize=${this.props.pageSize}`;
			let pageElem = <Link to={linkTo} key={i} data-pageNum={i} className={clazzName}><{i}<Link>;
			pageElems.push(pageElem);
		}

		return pageElems;
	}

	gotoPage(event){
		let pageNum = event.target.getAttribute('data-pageNum');
		if(isNaN(pageNum)){
			return;
		}
		this.props.getPageData(pageNum, this.props.pageSize);
	}

	render() {
		// 如果内容不足一页 或者 仅有一页 则不显示页码
		let pageElems = this.props.totalItem <= this.props.pageSize ? undefined : this.createPageElems(this.props.totalItem);

		return (
			<div className = "sx-pageView" onClick = { e => { gotoPage(e); } }>
				{ pageElems }
			</div>
		);
	}
}

/*
	pageNum 		需要显示的页码
	pageSize 		每页数据量
	totalItem 		总共有多少数据，不是指一页里有多少。而是所有页加一块一共多少
	getPageData		获取分页数据的action			！！！！！这个还有待考虑， 因为其实这个可以在业务组件中完成 不用非得放在这里 但是现在想不出哪个更合理
*/
PageView.propTypes = {
	pageNum: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,	
	totalItem: PropTypes.number.isRequired,
	getPageData: PropTypes.func.isRequired		
}

export default PageView

