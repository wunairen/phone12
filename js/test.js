var screenAnimateElements = {
	'.screen-1': ['.screen-1_head', '.screen-1_phone', '.screen-1_shadow'],
	'.screen-2': ['.screen-2_head', '.screen-2_phone', '.screen-2_sub', '.screen-2_point1', '.screen-2_point2', '.screen-2_point3'],
	'.screen-3': ['.screen-3_head', '.screen-3_phone', '.screen-3_sub','.screen-3_fea'],
	'.screen-4': ['.screen-4_head', '.screen-4_sub','.screen-4_typeItem_i_1','.screen-4_typeItem_i_2','.screen-4_typeItem_i_3','.screen-4_typeItem_i_4',],
	'.screen-5': ['.screen-5_head', '.screen-5_bg', '.screen-5_sub',],
};

function setScreenAnimate(screenCls) {
	var Screen = document.querySelector(screenCls);
	var animateElements = screenAnimateElements[screenCls];
	var isSetAnimateClass = false;
	var isAnimateDone = false;
	Screen.onclick = function() {
		if(isSetAnimateClass === false) {
			for(var i = 0; i < animateElements.length; i++) {
				var Element = document.querySelector(animateElements[i]);
				var baseCls = Element.getAttribute('class');
				Element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
			}
			isSetAnimateClass = true;
			return;
		}
		if(isAnimateDone === false) {
			for(var i = 0; i < animateElements.length; i++) {
				var Element = document.querySelector(animateElements[i]);
				var baseCls = Element.getAttribute('class');
				Element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
			}
			isAnimateDone = true;
			return;
		}
		if(isAnimateDone === true) {
			for(var i = 0; i < animateElements.length; i++) {
				var Element = document.querySelector(animateElements[i]);
				var baseCls = Element.getAttribute('class');
				Element.setAttribute('class', baseCls.replace('_animate_done', '_animate_init'));
			}
			isAnimateDone = false;
			return;
		}
	}
}
for(k in screenAnimateElements) {
	setScreenAnimate(k);
}