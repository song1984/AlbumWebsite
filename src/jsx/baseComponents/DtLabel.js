import React, { Component } from 'react';
import PropTypes from 'prop-types';


Element.prototype.addEvent = function (type, fn){
	if(window.addEventListener){
		this.addEventListener(type, fn)
	}else if(window.attachEvent) {
		this.attachEvent(type,fn)
	}else {
		this["on" + type] = fn
	}
}

class DtLabel extends Component {

	constructor(props) {
		super(props);
		this.state = {
			children: props.children,
			placeholder: props.placeholder,
			childNodeName: props.childNodeName
		};
		this.labelRoot = null;
		this.labelTextElem = null;
		this.iptElem = null;
	}

	componentWillReceiveProps(nextProps){
		this.setState(Object.assign({}, this.state, {placeholder: nextProps.placeholder}))
	}

	componentDidMount(){

		this.iptElem = this.labelRoot.getElementsByTagName(this.state.childNodeName)[0];

		this.iptElem.addEvent('focus', () => {
			this.labelTextElem.innerHTML = '';
		})

		this.iptElem.addEvent('blur', () => {
			this.labelTextElem.innerHTML = this.iptElem.value.trim() === '' ? this.state.placeholder : '';
		})
	}

	render(){
		return (
			<label 
				ref = { node => this.labelRoot = node }
				className = "dt-base-dtLabel" 
			>
				<span
					ref = { node => this.labelTextElem = node }
				>
					{ this.state.placeholder }
				</span>
				{ this.state.children }
			</label>	
		);
	}
}

DtLabel.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	placeholder: PropTypes.string.isRequired,
	childNodeName: PropTypes.string.isRequired
}

export default DtLabel







