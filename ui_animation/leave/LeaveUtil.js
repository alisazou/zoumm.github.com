










 function LeaveUtil(id,oo){
         this.$ = function(id){return document.getElementById(id)};
         this.id = id;
       
         this.oo = oo;//oo.minSize, oo.maxSize, oo.flakeCount,oo.images ,oo.autoPlay();     
         return this.init();
     }
 
     LeaveUtil.prototype = {
         init : function(){//初始化设置
           //  this.picLis = this.$(this.id).getElementsByTagName("div");//divs
             //this.num(this.oo.flakeCount,this.oo.options,this.oo.maxSize,this.oo.minSize);
            this.num(this.oo.flakeCount,this.oo.options,this.oo.maxSize,this.oo.minSize,this.oo.iCount,this.oo.autoTime);
            
         },
         num:function(flakeCount,options,maxSize,minSize,iCount,autoTime){
         	for(var i=0;i<flakeCount;i++){
         		
         		this.oo.autoPlay==true ?this.$(this.id).appendChild(this.createLeave(options,maxSize,minSize,iCount,autoTime)):0;
         		  
         		
         	}
         },
       
  		//获取随机整数，在范围内 
	    randomInteger: function(low, high) {      
	         return low + Math.floor(Math.random() * (high - low))
	        
	    } ,
	    //获取随机数，在范围内 
	    randomFloat: function(low, high) {      
	        return low + Math.random() * (high - low);         
	         
	    } ,
	    //获取物体距离屏幕的边距
	    pixelValue: function(value) {      
	         return value + 'px';     
	    } ,
	      //动画时间
	    durationValue: function(value) {      
	          return value + 's';        
	    },
	    
     createLeave : function(option,maxSize,minSize,iCount,autoTime){//创建div
     	
         var leafDiv = document.createElement("div"),
             createImage = document.createElement('span'),
             pageWidth  =  document.documentElement.clientWidth,
            //随机选择一个旋转动画
			  spinAnimationName = (Math.random() < 0.5) ? 'leaveRotate' : 'leaveRotateAndScale',
			 // fadeAndDropDuration =this.durationValue(this.randomFloat(4, 8)),
			 fadeAndDropDuration =autoTime;
			
			//找出另一个随机时间的旋转动画
			   spinDuration = this.durationValue(this.randomFloat(4, 8)),
			 //找出一个随机时间消失动画
			   leafDelay = this.durationValue(this.randomFloat(0, 5));
		   	   createImage.src = option;
		       createImage.style.width =   minSize + Math.floor(Math.random() * (maxSize - minSize))+"px";
		    leafDiv.style.top = "-100px";
		    //沿着屏幕位置的叶子在随机位置*
		    leafDiv.style.left = this.pixelValue(this.randomInteger(0, pageWidth));
		    //设置-webkit-animation-name属性与这些值
		    leafDiv.style.webkitAnimationName = 'fade, drop';
		    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;//动画运动一次时长
		    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;//延迟时间
		    leafDiv.style.webkitAnimationIterationCount =iCount+','+ iCount;//运动次数
		    createImage.style.webkitAnimationName = spinAnimationName;
		    createImage.style.webkitAnimationDuration = fadeAndDropDuration;
		 
		    leafDiv.appendChild(createImage);
		    return leafDiv;
            
     }
     
 
     }
