
export const windowOnload = (func)=>{
	
	let old = window.onload;
	if(old !== func){
		window.onload = func;
	}else {
		window.onload = ()=>{
			old();
			func();
		}
	}
}

export const windowOnscroll = (func)=>{
	
	let old = window.onscroll;
	if(old !== func){
		window.onscroll = func;
	}else {
		window.onscroll = ()=>{
			old();
			func();
		}
	}
}

export const windowOnresize = (func)=>{
	
	let old = window.onresize;
	if(old !== func){
		window.onresize = func;
	}else {
		window.onresize = ()=>{
			old();
			func();
		}
	}
	window.onresize()
}
