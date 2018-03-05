function getCarousel3D(){
	'use strict';
	// 构造函数
	function Carousel3D(id, imgArr, currentActive, axis,height){
		this.id = id;
		this.imgArr = imgArr;
		this.imgMaxIdx = imgArr.length - 1;
		this.currentActive = currentActive;
		this.axis = axis;
		this.height = height;
		this.sceneryTotal = 0;
		this.sceneryFactor = 3;
		this.currentActiveRotateX = "0deg";
		this.nextActiveRotateX = "-90deg";
		this.prevActiveRotateX = "90deg";
		this.nextActiveClassName = 'sdm-carousel3d-nextActive';
		this.prevActiveClassName = 'sdm-carousel3d-prevActive';
		this.currentActiveClassName = 'sdm-carousel3d-active';
	}

	Carousel3D.prototype.DEFAULT = {
		isTransiting: true,
		nextActive: null,
		prevActive: null
	};

	Carousel3D.prototype.refreshHeight = function(){
		var _this = this;
		window.onresize = function(){
			if(_this.isTransiting){
				// 如果当前正在播放动画 则创建一个监听事件 ，再下一次isTransiting == false时在执行
				$('#'+_this.id).one(_this.id, _this.resetScenery.bind(null, _this));
			}else {
				_this.resetScenery(_this);
			}
		};
	};

	/*
		仅当屏幕长宽变化时执行
	*/
	Carousel3D.prototype.resetScenery = function(context){
		context.isTransiting = true;
		context.height = $(context.axis).height();
		context.scenery();
	};

	/*
		布置3D场景
	*/
	Carousel3D.prototype.scenery = function(){
		var _this = this;
		var currentActive = _this.currentActive;
		var nextActive, prevActive;
		 if(currentActive === 0){
			nextActive = currentActive + 1;
			prevActive = _this.imgMaxIdx;
		} else if(currentActive === _this.imgMaxIdx){
			nextActive = 0;
			prevActive = currentActive -1;			
		} else{

			nextActive = currentActive + 1;
			prevActive = currentActive - 1;				
		}
		_this.nextActive = nextActive;
		_this.prevActive = prevActive;

		var _translateZ = _this.height /2 +"px";
		complete(_this.imgArr[currentActive], _this.currentActiveRotateX, _translateZ, _this.currentActiveClassName);
		complete(_this.imgArr[nextActive], _this.nextActiveRotateX, _translateZ, _this.nextActiveClassName);
		complete(_this.imgArr[prevActive], _this.prevActiveRotateX, _translateZ, _this.prevActiveClassName);

		function complete(active, rotateX, translateZ, className){
			$(active).addClass(className);
			active.style.transform = "rotateX("+ rotateX +") translateZ("+ _translateZ +")";
			if(className != _this.currentActiveClassName){
				active.style.display = "none";
			}
			_this.sceneryTotal++;
			if(_this.sceneryTotal % _this.sceneryFactor === 0){
				_this.isTransiting = false;	// 三个布景都完成了就认为可以让用户点击了
				$('#'+_this.id).trigger(_this.id);
			} 
		}
	};

	/*
		3D翻转动画
	*/
	Carousel3D.prototype.toggle = function(target){
		if (this.isTransiting) return;
		var _this = this;
		_this.isTransiting = true;
		var axis = _this.axis;
		var isToggleNext = $(target).data('toggle') === 'next' ? true : false;
		var toggleClass = isToggleNext ? 'sdm-carousel3D-nextToggle' : 'sdm-carousel3D-prevToggle';
		
		_this.imgArr[_this.nextActive].style.display = "block";
		_this.imgArr[_this.prevActive].style.display = "block";
		$(axis).addClass(toggleClass);

		var isIE = false;
		$.support.sdmAnimation.forEach(function(item){
			if(item.prop == 'msAnimation') isIE = true;
		});

		if($.support.sdmAnimation.length === 0 || isIE){
			_this.imgArr[_this.nextActive].style.display = "none";
			_this.imgArr[_this.prevActive].style.display = "none";
			_this.clearScenery(isToggleNext);
			_this.scenery();
		}else {
			$(axis).one($.support.sdmAnimation[0].event, function(){
				_this.clearScenery(isToggleNext);
				_this.scenery();			
			});
		}
	};

	Carousel3D.prototype.clearScenery = function(isToggleNext){
		
		var _this = this;
		$(_this.axis).find('li').removeClass();
		$(_this.axis).removeClass();
		$(_this.imgArr[_this.currentActive]).attr('style', '');
		$(_this.imgArr[_this.nextActive]).attr('style', '');
		$(_this.imgArr[_this.prevActive]).attr('style', '');

		if(isToggleNext){
			_this.currentActive = _this.nextActive;
		}else {
			_this.currentActive = _this.prevActive;
		}
		$.extend(_this, Carousel3D.prototype.DEFAULT);
	};

	// 创建对象
	window.onload = function(){
		$('.sdm-carousel3D').each(function(){
			let id = $(this).attr('id');
			let imgArr = [];
			var axis = $(this).find('ul')[0];
			var height = $(axis).height();
			$(this).find('ul>li').each(function(){
				imgArr.push(this);
			});
			var currentActive = $(this).find('ul>li.sdm-carousel3d-active').data('idx');
			var _carousel3d = $.extend(new Carousel3D(id, imgArr, currentActive, axis, height), Carousel3D.prototype.DEFAULT);
			$(this).data('carousel3d', _carousel3d);
			_carousel3d.refreshHeight(); 
			// 执行首次布景
			_carousel3d.scenery();
		});

		$('.sdm-carousel3D-btn').on('click.sdm-carousel3D', shunt);

		function shunt(event){
			event.preventDefault();
			event.stopPropagation();
			var target = event.target;
			var carousel3d = $($(target).data('id')).data('carousel3d');
			carousel3d.toggle(target);
		}
	};
}

module.exports = getCarousel3D;
