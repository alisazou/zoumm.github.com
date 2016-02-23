function getstyle(obj, name) {
	if (obj.currentStyle) {
		return obj.currentStyle[name];

	} else {
		return getComputedStyle(obj, null)[name];
	}

}

function startmove(obj, json, fn) {
	//var odiv = document.getElementById("obj");
	var timer = null;

	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bstop = true; /*这次运动运动结束，所有值都到达了*/

		for (attr in json) {
			/*取当前值*/

			var icurrt = 0;
			// var alpha =30;
			if (attr == 'opacity') {
				var icurrt = parseInt(parseFloat(getstyle(obj, attr)) * 100);
			} else {
				var icurrt = parseInt(getstyle(obj, attr)); /*这个不能放到定时器外面,否则div移不动*/
			}
			/*计算速度*/
			var ispeed = (json[attr] - icurrt) / 8;
			var ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);
			/*检测停止*/

			if (icurrt != json[attr]) { /*关闭*/

				bstop = false;
			}

			if (attr == 'opacity') {

				obj.style.filter = "obj.alpha(opacity:'+(icurrt+ispeed)+')";
				obj.style.opacity = (icurrt + ispeed) / 100;
				//document.getElementById('txt').value =  obj.style.opacity

			} else {
				obj.style[attr] = icurrt + ispeed + 'px';
			}

			//alert(odiv.offsetLeft);

		}
		if (bstop) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}

	}, 100);
}