
const allAniEnd = [
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

const el = document.createElement('dtElem');

let supportAniENd = allAniEnd.filter((aniEnd) => {
		return el.style[aniEnd.prop] !== undefined
});

export default supportAniENd
