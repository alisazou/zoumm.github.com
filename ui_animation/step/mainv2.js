(function() {
	var	component = document.getElementById( 'component' ),
		items = component.querySelector( 'ul.itemwrap' ).children,
		current = 0,
		specialPage = 9,
		itemsCount = items.length,
		isAnimating = false;

	var page10_first_flag=true;
	function init() {
		changeEffect("fxSlideBehind");

		$(".p10_card").tap(function (event) {
        	event.preventDefault();
        	triggerNext();
        });
        $(".arrow_left").bind("touchstart",function (event) {
        	event.preventDefault();
        	triggerPrev();
        });
        $(".p1_p1").bind("touchstart",function (event) {
        	event.preventDefault();
        	triggerNext();
        });
        $(".arrow_right").bind("touchstart",function (event) {
        	event.preventDefault();
        	triggerNext();
        });
		$(document).swipeLeft(function (event) {
			event.preventDefault();
			triggerNext();
        });
        $(document).swipeRight(function (event) {
        	event.preventDefault();
        	triggerPrev();
        });

        $(".p12_p1").tap(function (event) {
        	event.preventDefault();
        	showShareMask();
        });
        $(".p12_p2").tap(function (event) {
        	event.preventDefault();
        	showShareMask();
        });
        $(".p12_p3").tap(function (event) {
        	event.preventDefault();
        	showShareMask();
        });
        $(".p12_p4").tap(function (event) {
        	event.preventDefault();
        	showShareMask();
        });
        $(".share_mask").tap(function (event) {
        	event.preventDefault();
        	$(".share_mask").hide();
        });
	}

	function showShareMask(){
		if(isWxOrYx) $(".share_mask").show();
	}

	function triggerNext(){
		if(current<itemsCount-1){
			if(current==specialPage){
				changeEffect("fxFlip");
				if(page10_first_flag){
					page10_first_flag=false;
					$(".p10_card").addClass("p10_card_anim2");
					window.setTimeout(function() {
						navigate( 'next' );
			        }, 800);
			        return;
				}
			}else if(current==specialPage+1){
				changeEffect("fxSlideBehind");
			}
			navigate( 'next' );
		}else if(current==itemsCount-1){
			showShareMask();
		}
	}

	function triggerPrev(){
		if(current>0){
    		if(current==specialPage+1){
				changeEffect("fxFlip");
			}else if(current==specialPage-1){
				changeEffect("fxSlideBehind");
			}
        	navigate( 'prev' );
    	}
	}

	function changeEffect(animation) {
		component.className = component.className.replace(/\bfx.*?\b/g, '');
		classie.addClass( component, animation );
	}

	function navigate( dir ) {
		if( isAnimating) return false;
		sound_page.play();
		isAnimating = true;
		var cntAnims = 0;

		var currentItem = items[ current ];

		if( dir === 'next' ) {
			current = current < itemsCount - 1 ? current + 1 : 0;
		}
		else if( dir === 'prev' ) {
			current = current > 0 ? current - 1 : itemsCount - 1;
		}

		var nextItem = items[ current ];
		$(".page").removeClass("current");
		classie.addClass( currentItem, dir === 'next' ? 'navOutNext' : 'navOutPrev' );
		classie.addClass( nextItem, dir === 'next' ? 'navInNext' : 'navInPrev' );
		classie.addClass( nextItem, 'current' );

		switchPage(current);
		window.setTimeout(function() {
			$(".page").removeClass("navOutNext navInNext navOutPrev navInPrev current");
			classie.addClass( nextItem, 'current' );
			isAnimating = false;
			changeEffect("fxSlideBehind");
        }, 900);
	}

	function switchPage(cur){
		switch(cur) {
			case 1:	showPage2();break;
			case 2:	showPage3();break;
			case 3:	showPage4();break;
			case 4:	showPage5();break;
			case 5:	showPage6();break;
			case 6:	showPage7();break;
			case 7:	showPage8();break;
			case 8:	showPage9();break;
			case 9:	showPage10();break;
			case 10:showPage11();break;
			case 11:showPage12();break;
			default:break;
		}
	}

	function showPage2(){
		$(".p2_t1").addClass("p2_t1_anim");
		$(".p2_t2").addClass("p2_t2_anim");
		$(".p2_t3").addClass("p2_t3_anim");
		$(".p2_t4").addClass("p2_t4_anim");
		$(".p2_line1").addClass("p2_line1_anim");
		$(".p2_line2").addClass("p2_line2_anim");
		$(".p2_line3").addClass("p2_line3_anim");
	}

	var page3_first_flag=true;
	function showPage3(){
		if(!page3_first_flag) return;
		page3_first_flag=false;
		$(".page3 .slogan_sub").addClass("slogan_anim");
		var count=10;
		var duration=1000;
		var i=0;
		var slogan=setInterval(function(){
			$(".jay .slogan").css("background-image","url(img/s_jay/s_jay_"+i+".png)");
			if(i==count-1) clearInterval(slogan);
			i=i>=count-1?count-1:i+1;
		},duration/count);

	}

	var page4_first_flag=true;
	function showPage4(){
		if(!page4_first_flag) return;
		page4_first_flag=false;
		$(".page4 .slogan_sub").addClass("slogan_anim");
		var count=10;
		var duration=1000;
		var i=0;
		var slogan=setInterval(function(){
			$(".zxc .slogan").css("background-image","url(img/s_zxc/s_zxc_"+i+".png)");
			if(i==count-1) clearInterval(slogan);
			i=i>=count-1?count-1:i+1;
		},duration/count);
	}

	var page5_first_flag=true;
	function showPage5(){
		if(!page5_first_flag) return;
		page5_first_flag=false;
		$(".page5 .slogan_sub").addClass("slogan_anim");
		var count=10;
		var duration=1000;
		var i=0;
		var slogan=setInterval(function(){
			$(".fbb .slogan").css("background-image","url(img/s_fbb/s_fbb_"+i+".png)");
			if(i==count-1) clearInterval(slogan);
			i=i>=count-1?count-1:i+1;
		},duration/count);
	}

	var page6_first_flag=true;
	function showPage6(){
		if(!page6_first_flag) return;
		page6_first_flag=false;
		$(".page6 .slogan_sub").addClass("slogan_anim");
		var count=10;
		var duration=1000;
		var i=0;
		var slogan=setInterval(function(){
			$(".lyf .slogan").css("background-image","url(img/s_lyf/s_lyf_"+i+".png)");
			if(i==count-1) clearInterval(slogan);
			i=i>=count-1?count-1:i+1;
		},duration/count);
	}

	var page7_first_flag=true;
	function showPage7(){
		if(!page7_first_flag) return;
		page7_first_flag=false;
		$(".page7 .slogan_sub").addClass("slogan_anim");
		var count=10;
		var duration=1000;
		var i=0;
		var slogan=setInterval(function(){
			$(".zzd .slogan").css("background-image","url(img/s_zzd/s_zzd_"+i+".png)");
			if(i==count-1) clearInterval(slogan);
			i=i>=count-1?count-1:i+1;
		},duration/count);
	}

	var page8_first_flag=true;
	function showPage8(){
		if(!page8_first_flag) return;
		page8_first_flag=false;
		$(".page8 .slogan_sub").addClass("slogan_anim");
		var count=10;
		var duration=1000;
		var i=0;
		var slogan=setInterval(function(){
			$(".angela .slogan").css("background-image","url(img/s_angela/s_angela_"+i+".png)");
			if(i==count-1) clearInterval(slogan);
			i=i>=count-1?count-1:i+1;
		},duration/count);
	}

	function showPage9(){
		$(".p9_t1").addClass("p9_t1_anim");
		$(".p9_t2").addClass("p9_t2_anim");
		$(".p9_t3").addClass("p9_t3_anim");
		$(".p9_t4").addClass("p9_t4_anim");
	}
	function showPage10(){
		$(".p10_p1").addClass("p10_p1_anim");
		$(".p10_p2").addClass("p10_p2_anim");
		$(".p10_p3").addClass("p10_p3_anim");
		$(".p10_p4").addClass("p10_p4_anim");
		$(".p10_p5").addClass("p10_p5_anim");
		$(".p10_p6").addClass("p10_p6_anim");
		$(".p10_card").addClass("p10_card_anim");
		window.setTimeout(function() {
			$(".p10_card").removeClass("p10_card_anim");
        }, 1500);
	}
	function showPage11(){
		$(".p11_t1").addClass("p11_t1_anim");
		$(".p11_t2").addClass("p11_t2_anim");
		$(".p11_t3").addClass("p11_t3_anim");
		$(".p11_t4").addClass("p11_t4_anim");
		$(".p11_logo").addClass("p11_logo_anim");
	}
	var page12_first_flag=true;
	function showPage12(){
		if(!page12_first_flag) return;
		page12_first_flag=false;
		$(".p12_p1").addClass("p12_p1_anim");
		$(".p12_p2").addClass("p12_p2_anim");
		$(".p12_p3").addClass("p12_p3_anim");
		$(".p12_p4").addClass("p12_p4_anim");
		window.setTimeout(function() {
			$(".p12_p1").removeClass("p12_p1_anim");
			$(".p12_p2").removeClass("p12_p2_anim");
			$(".p12_p3").removeClass("p12_p3_anim");
			$(".p12_p4").removeClass("p12_p4_anim");
			$(".p12_p1").addClass("p12_p1_anim2");
			$(".p12_p2").addClass("p12_p2_anim2");
			$(".p12_p3").addClass("p12_p3_anim2");
			$(".p12_p4").addClass("p12_p4_anim2");
        }, 2000);
	}

	init();
})();