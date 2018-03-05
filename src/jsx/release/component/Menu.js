import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Dropdown from '../baseComponents/Dropdown';

function createCategorys(categorys){
	
	let _categorys = categorys;
	let i, elem, res = [], liIdx = 0;
	
	_categorys.map((c, idx)=>{
		i = idx % 3;
		if(i === 0){
			let arr = _categorys.slice(idx, idx+3);
			elem = 
				<li key={liIdx++}>
					{
						arr.map((cate, idx)=>{
							return (
								<Link
									key = {idx}
									to = {cate.linkTo}
								>
									{cate.linkName}
								</Link>
							);
						})
					}
				</li>;

			res.push(elem);
		}
	});

	return res;
}

/*
	menuType 可以作废 功能已通过 css hover完成
*/

let Menu = ({menuData, getMenuData}) => {
	/*
		显示隐藏效果 通过CSS完成， 所以这里预留className
	*/
	getMenuData();

	return (
		<div className = "dt-category-dropdown" >
			<Dropdown btn = { {name: '分类'}} >
				<ul>
					{
						menuData.navs.map((nav, idx)=>{
							return (
								<li key={idx}>
									<Link
										to = {nav.linkTo} 
									>
										{nav.linkName}
									</Link>
								</li>
							);
						})
					}
				</ul>
				<ul>
					{
						createCategorys(menuData.categorys)
					}
				</ul>
			</Dropdown>
		</div>
	);
};

Menu.propTypes = {
	menuData: PropTypes.shape({
		navs: PropTypes.arrayOf(PropTypes.shape({
			linkTo: PropTypes.string.isRequired,
			linkName: PropTypes.string.isRequired
		}).isRequired).isRequired,
		categorys: PropTypes.arrayOf(PropTypes.shape({
			linkTo: PropTypes.string.isRequired,
			linkName: PropTypes.string.isRequired
		}).isRequired).isRequired
	}).isRequired
};

export default Menu












