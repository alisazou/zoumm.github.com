 
  iSpeed = 0,
  timer= null;
  //弹性运动
 function startMove(obj,target){
		       	 clearInterval(timer);
		       	timer = setInterval(function(){
		       		 iSpeed += (target - obj.offsetLeft)/6;
            		 iSpeed *= 0.75;
			      	 console.log(iSpeed);
		       		if(Math.abs(target-obj.offsetLeft) <=1 && Math.abs(iSpeed) <=1){
		       			 obg.style.left = target+"px";
		       			 iSpeed = 0;
		       			 clearInterval(timer);	 
		       		}else{
		       	     
			      	 obj.style.left  = obj.offsetLeft+iSpeed+"px"; 
		       		}
			       	 
		       	},30)
		      	 
		      }
 //摩擦运动

  function startRub(obj,target){
		       	 clearInterval(timer);
		       	timer = setInterval(function(){
		       		 iSpeed = (target - obj.offsetLeft)/6;
		       		  //iSpeed *= 0.75;
		       		 iSpeed =iSpeed>0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
			      	 //console.log(iSpeed);
		       		if(obj.offsetLeft == target){
//		       			
		       			 clearInterval(timer);	 
		       		}else{
		       	     
			      	 obj.style.left  = obj.offsetLeft+iSpeed+"px";
		       		}
			       	 
		       	},30)
		      	 
		      }