
//window.onload = function(){
//	 getLink();
//}
//固定头部
  $(window).scroll(function(){
	    if(document.body.scrollTop >=80)
	      $('.head-area').addClass("head-area-on");
	    else{
	    	$('.head-area').removeClass("head-area-on");
	    }
	      
 });

//头部居顶
//function getLink(){
//
// var hlink = window.location.href;
// var headA =document.getElementById("head-area");
// var aA =headA.getElementsByTagName("li");
// var ali = headA.getElementsByTagName("a");
// var aTtr = [];
// var aTtrlink=[];
//
//		   for(var i=0;i<ali.length;i++){
//	   	         aTtr[i] = ali[i].getAttribute("href");
//	   	         aTtrlink[i] = "http://zoumm.500.cn/" + aTtr[i];
//	   	    
//	   	      
//	        }
//
//	    
//}
		  
   

