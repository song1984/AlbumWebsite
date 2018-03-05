import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import DtLabel from '../baseComponents/DtLabel';

let SearchBox = ({search})=> {
	/*
		入参是一个action创建函数， 此函数的入参
	*/
	let searchInput, searchBtn;
	const ENTER = 13;

	function searchHandle(event, callback){
		


		callback(searchInput.value);
		searchInput.value = '';
	}

	return (
		<div className = 'dt-searchBox'>
			<DtLabel
				placeholder = {'搜索感兴趣的内容'}
				childNodeName = {'INPUT'}
			>
				<input 
					ref = { node =>  searchInput = node }
					onKeyDown = {
						event => {
							if(event.keyCode === ENTER){
								searchBtn.click();
							}
						}
					}
				/>
				<Link to = {'search'} >
					<i
						ref = {node => searchBtn = node}
						onClick = { 
							event => {
								let iptText = searchInput.value.trim();
								if(iptText === ''){
									event.stopPropagation();
									return;
								}
								search(iptText)
								searchInput.value = ''
							}
						}
					>
					</i>
				</Link>
			</DtLabel>
		</div>
	);
};

SearchBox.propTypes = {
	search: PropTypes.func
};

export default SearchBox