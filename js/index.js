var getElem = function(selector) {
	return document.querySelector(selector);
}
var getAllElem = function(selector) {
	return document.querySelectorAll(selector);
}

var getCls = function(element) {
	return element.getAttribute('class');
}
var setCls = function(element, cls) {
	return element.setAttribute('class', cls);
}
var addCls = function(element, cls) {
	var baseCls = getCls(element);
	if(baseCls.indexOf(cls) === -1) {
		setCls(element, baseCls + ' ' + cls);
	}
}
var delCls = function(element, cls) {
	var baseCls = getCls(element);
	if(baseCls.indexOf(cls) != -1) {
		setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '));
	}
}
//初始化
var screenAnimateElements = {
	'.screen-1': ['.screen-1_head', '.screen-1_phone', '.screen-1_shadow'],
	'.screen-2': ['.screen-2_head', '.screen-2_phone', '.screen-2_sub', '.screen-2_point1', '.screen-2_point2', '.screen-2_point3'],
	'.screen-3': ['.screen-3_head', '.screen-3_phone', '.screen-3_sub', '.screen-3_fea'],
	'.screen-4': ['.screen-4_head', '.screen-4_sub', '.screen-4_typeItem_i_1', '.screen-4_typeItem_i_2', '.screen-4_typeItem_i_3', '.screen-4_typeItem_i_4', ],
	'.screen-5': ['.screen-5_head', '.screen-5_bg', '.screen-5_sub', ],
};
var setScreenAnimateInit = function(screenCls) {
	var Screen = document.querySelector(screenCls);
	var animateElements = screenAnimateElements[screenCls];
	for(var i = 0; i < animateElements.length; i++) {
		var Element = document.querySelector(animateElements[i]);
		var baseCls = Element.getAttribute('class');
		Element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
	}
}
var playScreenAnimateDone = function(screenCls) {
	var Screen = document.querySelector(screenCls);
	var animateElements = screenAnimateElements[screenCls];
	for(var i = 0; i < animateElements.length; i++) {
		var Element = document.querySelector(animateElements[i]);
		var baseCls = Element.getAttribute('class');
		Element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
	}
}
window.onload = function() {
	for(k in screenAnimateElements) {
		if(k==='.screen-1'){
			continue;
		}
		setScreenAnimateInit(k);
	}

}

var navItem = getAllElem('.headernavItem');
var outlineitem = getAllElem('.outline_item');
var switchNavItemactive = function(idx) {
	for(var i = 0; i < navItem.length; i++) {
		delCls(navItem[i], 'headernavItem_status_active');
	}
	addCls(navItem[idx], 'headernavItem_status_active');
}
window.onscroll = function() {
	var top = document.body.scrollTop;

	if(top > 80) {

		addCls(getElem('.header'), 'header_status_back');
		addCls(getElem('.outline'), 'outline_status_in');
	} else {
		delCls(getElem('.header'), 'header_status_back');
		delCls(getElem('.outline'), 'outline_status_in');
		switchNavItemactive(0);
	}
	if(top > 1) {
		playScreenAnimateDone('.screen-1');

	}
	if(top > 800 * 1 - 100) {
		playScreenAnimateDone('.screen-2');
		switchNavItemactive(1);
	}
	if(top > 800 * 2 - 100) {
		playScreenAnimateDone('.screen-3');
		switchNavItemactive(2);
	}
	if(top > 800 * 3 - 100) {
		playScreenAnimateDone('.screen-4');
		switchNavItemactive(3);
	}
	if(top > 800 * 4 - 100) {
		playScreenAnimateDone('.screen-5');
		switchNavItemactive(4);
	}

}

var setNavJump = function(i, lib) {
	var item = lib[i];
	item.onclick = function() {
		document.body.scrollTop = i * 800;
	}
}
for(var i = 0; i < navItem.length; i++) {
	setNavJump(i, navItem);
}
for(var i = 0; i < outlineitem.length; i++) {
	setNavJump(i, outlineitem);
}

//滚动条
var navTip = getElem('.header_nav-tip');
var setTip = function(idx, lib) {
	lib[idx].onmouseover = function() {
		console.log(this, idx);
		navTip.style.left = (idx * 90) + 'px';
	}
	var activeidx = 0;
	lib[idx].onmouseout = function() {
		
		for(var i = 0; i < lib.length; i++) {
			if(getCls(lib[i]).indexOf('headernavItem_status_active') > -1) {
				activeidx = i;
				break;
			}
		}
		console.log(activeidx);
		navTip.style.left = (activeidx * 90) + 'px';
	}
}
for(var i = 0; i < navItem.length; i++) {
	setTip(i, navItem);
}

setTimeout(function(){
	playScreenAnimateDone('.screen-1');
},200)
