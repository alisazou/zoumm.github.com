if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    clickEvent="tap";
} else {
    clickEvent="click";
}

/*** 参数说明：
* speed: 滚动速度（数值越大，滚动越慢）
* paddingLeft: 初始化box左边距，用于形成错落有致的视差效果
* html: 评论字母内容，含html标签及style样式，例如:<span>评论一</span><span style="font-size:16px;">评论二</span><spa style="margin-right:40px;">评论三</span>; 此参数需要技术方传入数据（具体形式待确定）
* callBack: 滚动完成一次，回调函数

***/
;(function($){
$.fn.marquee = function(options){
	var defaults = {	//默认参数
		speed : 20,
		paddingLeft: 0,
		commentList : '',
		callBack : function(){}
	}
	var opts = $.extend({},defaults,options);//使用jQuery.extend 覆盖插件默认参数，合并defaults和options，不修改defaults。
	var $this = $(this); //获取当前dom 的 jQuery对象，这里的this是当前循环的dom
	var T = null;
	var num = 0, iW =0, i, str='';
	var pW = $this.parent().width();
	
	//根据参数初始化
	var listLen = opts.commentList.length;
	for (i=0;i<listLen;i++){
		str += "<span>" + opts.commentList[i] +"</span>"; 
	}
	if(opts.html!='' && $this.html() != str){
		$this.html(str);
	}
	
	var itm = $this.find('span');
	var itmLen = itm.length;
	var fontArr = [12,16,20];
	var marArr = [20,40,60,80,100];
	for (i=0;i<itmLen;i++){
		iW += $(itm[i]).width() + parseInt($(itm[i]).css('margin-right'));
		var n = Math.floor(Math.random() * fontArr.length + 1)-1;
		var n2 = Math.floor(Math.random() * marArr.length + 1)-1;
		$(itm[i]).css({'font-size':fontArr[n],'margin-right':marArr[n2]});
	}
	$this.width(iW).css('padding-left',opts.paddingLeft);
	//初始化完成
	
	this.change = function (){	//动画
		$this.css('-webkit-transform','translateX(-'+num+'px)'); 
			num += 1;
		if(num>=2*iW+pW){
			num=0;
			opts.callBack();
		}
	}
		
	this.goPlay = function (){	//开始动画
		window.clearInterval(T);
		T = setInterval(this.change,opts.speed);
	}
		
	this.goPlay();
    return this.each(function(){});	//this就是Zepto对象,这里return为了支持链式调用
}
})(Zepto);


$(function(){

function theMarquee(){
	$($('.ui-barrage-inner')[0]).marquee({
		paddingLeft:100,
		speed:10,
		commentList: ["1111111","2222222","3333333","1111111","2222222","3333333","1111111","2222222","3333333","3333333"]
		//callBack:function(){alert("0000")}
	});
	$($('.ui-barrage-inner')[1]).marquee({
		paddingLeft:30,
		speed:14,
		commentList: ["44444444","55555555","ddddddddddddd","44444444","55555555","ddddddddddddd","44444444","55555555","ddddddddddddd","ddddddddddddd"]
		});
	$($('.ui-barrage-inner')[2]).marquee({
		paddingLeft:80,
		speed:12,
		commentList: ["666666666","7777777777777","a567457556","666666666","7777777777777","a567457556","666666666","7777777777777","a567457556","a567457556"]
		});
	$($('.ui-barrage-inner')[3]).marquee({
		parginLeft:50,
		speed:16,
		commentList: ["888888888888888888888888","998888889","0000000","888888888888888888888888","998888889","0000000","888888888888888888888888","998888889","0000000","0000000"]
		});
}
theMarquee();

	
function formInteraction(){
	var obj = $('.ui-barrage');
	var box = obj.find('.ui-barrage-box');
	var txt = $('.ui-barrage-txt');
	var subBtn = $('#ui-barrage-sub');
	var T, time=10000;
	txt.focus(function(){
		clearTimeout(T);
		var val = $(this).defaultValue;
		if($(this).val()=='欢迎评论...'){
			$(this).val('').css('color','#333');
		}
	});
	txt.blur(function(){
		var val = $(this).defaultValue;
		if (val == ''){
			$(this).val(val);
		}
		T = setTimeout(checkBtn,time);
	});
	
	subBtn.bind("click",function(){
		var val = txt.val();
		if(val=='欢迎评论...' || val== ''){
			txt.val('欢迎评论...').css('color','#999');
			return false
		}
		if(obj.has('.ui-barrage-my')){
			$('.ui-barrage-my').remove();
		}
		obj.append("<span class='ui-barrage-my'>"+ val +"</span>");
		txt.val('10秒后继续评论').css('color','#999');
		$(this).addClass('ui-button-gray').attr('disabled',false);
		T = setTimeout(checkBtn,time);
	});
	
	function checkBtn(){
		txt.val("欢迎评论...").css('color','#999');
		subBtn.removeClass('ui-button-gray').removeAttr('disabled');
		
	}
	T = setTimeout(checkBtn,time);
};
formInteraction();
	
});

