  
  //右边固定
  $(window).scroll(function(){
    	var sh = document.body.scrollTop || document.documentElement.scrollTop;
    	console.log(sh)
	    if(sh >=220)
	      //$('.side-area').addClass("side-area-on");
	      	$(".side-area").css({position:"fixed",top:"30px",bottom:"auto",});
	    else  
	    	$(".side-area").css({position: "absolute",top:"0px",bottom:"auto"});
});

	