function getLocalAnimationEnd($){
	'use strict';
	function animationEnd(){

		var animationNames = [
			{
				prop: 'animation',
				event: 'animationend'
			},
			{
				prop: 'WebkitAnimation',
				event: 'webkitAnimationEnd'
			},
			{
				prop: 'webkitAnimation',
				event: 'webkitAnimationEnd'
			},
			{
				prop: 'msAnimation',
				event: 'animationend'
			},
			{
				prop: 'MozAnimation',
				event: 'webkitAnimationEnd'
			}			
		];

		var el = document.createElement('sdmElement');
		var supportArr = [];
		
		animationNames.forEach(function(item){
			if(el.style[item.prop] != undefined) {
				supportArr.push(item);
			}
		});
		return supportArr;
	}

	$(function(){
		$.support.sdmAnimation = animationEnd();
	});

}

module.exports = getLocalAnimationEnd.bind(null, jQuery);


