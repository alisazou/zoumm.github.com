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
		var bstop = true; /*����˶��˶�����������ֵ��������*/

		for (attr in json) {
			/*ȡ��ǰֵ*/

			var icurrt = 0;
			// var alpha =30;
			if (attr == 'opacity') {
				var icurrt = parseInt(parseFloat(getstyle(obj, attr)) * 100);
			} else {
				var icurrt = parseInt(getstyle(obj, attr)); /*������ܷŵ���ʱ������,����div�Ʋ���*/
			}
			/*�����ٶ�*/
			var ispeed = (json[attr] - icurrt) / 8;
			var ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);
			/*���ֹͣ*/

			if (icurrt != json[attr]) { /*�ر�*/

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