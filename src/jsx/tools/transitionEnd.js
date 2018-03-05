var el = document.createElement('bootstrap')

var transEndEventNames = {
  WebkitTransition : 'webkitTransitionEnd',
  MozTransition    : 'transitionend',
  OTransition      : 'oTransitionEnd otransitionend',
  transition       : 'transitionend'
}

var transitionEnd;

for (var name in transEndEventNames) {
  if (el.style[name] !== undefined) {
    transitionEnd = transEndEventNames[name];
  }
}

export default transitionEnd