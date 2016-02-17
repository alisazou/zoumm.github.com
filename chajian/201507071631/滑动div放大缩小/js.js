// JavaScript Document
//=======================滑动js Star
 var  moveY = 0,mY1,mScale,sOrigin,windowH = $(window).height(),windowW = $(window).width(),
 	 startY=0;
    $(".mainPage2").on("touchstart",function(e){
        startY = e.changedTouches[0].pageY;
		e.preventDefault();
    });
   	$(".mainPage2").on("touchmove",function(e){
		 moveY = e.changedTouches[0].pageY - startY;
		
			if(moveY<0){
				console.log("向上滑动"+moveY);
				mFn(moveY);
			}else if(moveY>0){
				console.log("向下滑动"+moveY);
					mFn(moveY);
			}
			
    });
    $(".mainPage2").on("touchend",function(e){
			eFn(moveY);
	})
	
	//document.getElementById("body").addEventListener('touchmove', function(e){e.preventDefault();});

	function mFn(moveY){
	   
			if(moveY < 0){//向上滑

				mY1 = windowH + moveY;
				sOrigin = "top center";
			
			}else{//向下滑

				mY1 = moveY - windowH
				sOrigin = "bottom center";	
			}
			
				mScale = 1 - (Math.abs(moveY)/windowH);
			
				$(".main-page1").css({
					
					 "-webkit-transform": "scaleY("+mScale+")", 
					 "transform": "scaleY("+mScale+")",
					 "-webkit-transform-origin": ""+sOrigin
				});
				$(".mainPage-tt").css({
					 "-webkit-transform": "scale("+mScale+")", 
					 "transform": "scale("+mScale+")",
					 "-webkit-transform-origin": ""+sOrigin
				})
				
				$(".mainPage2").css({
					"-webkit-transform": "translateY("+moveY+"px)",
					"transform": "translateY("+moveY+"px)"
				})			
			
	};
	function eFn(moveY){
		if(moveY<0){ 
			if(-moveY < windowH*0.1){//向上滑的距离不到 1/10 返回
					mScale = 1;
					eY2 = windowH;
			}else{
				mScale = 0;
				eY2 = "-200";

			}
		}else{
			if(moveY < windowH*0.1){//向下滑的距离不到 1/10 返回
					mScale = 1;
			}else{
			
				mScale = 0;
			}			
		};
		$(".main-page1").css({
					"-webkit-transform": "scaleY("+mScale+")", 
					"transform": "scaleY("+mScale+")",
					"-webkit-transform-origin": ""+sOrigin
		});
		$(".mainPage2").css({
					"-webkit-transform": "translateY("+eY2+"px)",
					"transform": "translateY("+eY2+"px)"
		})	
		
	}

	
	
