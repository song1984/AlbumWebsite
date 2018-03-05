import 'babel-polyfill';

module.exports = function() {
	"use strict";
	let p1 = new Promise((resolve, reject)=>{
		setTimeout(()=>{
			console.log('p1');
			resolve('ok');
		},2000);
	});

	function aoo(result){
		return new Promise((resolve, reject)=>{
			setTimeout(()=>{
				console.log('p2')
				resolve('p2 ok');
			}, 3000);
		});
	}

	function boo(result){
		return new Promise((resolve, reject)=>{
			reject('fail');
		});
	}

	p1.then(aoo).then(boo).then((result)=>{let res = result;}, (result)=>{let res = result;});
};

