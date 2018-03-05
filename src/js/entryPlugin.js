import car from './component/Carousel3D';
import poly from './component/polyfillTest';
import tran from './third/transition';
import anim from './third/sdmAnimation';

(function(){
	let obj = {
		car: car,
		poly: poly,
		tran: tran,
		anim: anim
	};

	obj.anim();
	obj.tran();
	obj.car();
	obj.poly();
}());