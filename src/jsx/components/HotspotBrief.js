import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ColumnView from './ColumnView';
import { Link } from 'react-router';

/*
	热点文章尖 简短型 用于首页
*/
class HotspotBrief extends PureComponent {

	constructor(props){
		super(props);
		this.state = {};
	}

	componentWillMount(){
		this.props.getHotspotBriefData();
	}

	render(){
		return (
			<section className = "sx-hotspotBrief">
				<h4>大家正在逛</h4>
				<ColumnView 
					columnData = { this.props.hotspotBriefDataArr } 
					actions = { 
						{
							updateLikeCount: this.props.updateLikeCount,
							addComment: this.props.addComment,
							togglePickUpDialog: this.props.togglePickUpDialog
						}
					}
				/>
				<Link 
					className = "sx-hotspotBrief-btn"
					type="button"
					to={""}
				>
					加载更多
				</Link>
			</section>
		);
	}
}

/*
	具体的数据结构约束 由具体使用数据的子组件自行检查
	一个组件之内只考虑自己对数据的使用程度
*/
HotspotBrief.propTypes = {
	hotspotBriefDataArr: PropTypes.array.isRequired,
	updateLikeCount: PropTypes.func.isRequired,
	addComment: PropTypes.func.isRequired,
	togglePickUpDialog: PropTypes.func.isRequired,
	getHotspotBriefData: PropTypes.func.isRequired
}

export default HotspotBrief








