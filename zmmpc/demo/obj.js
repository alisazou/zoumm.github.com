// JavaScript Document
	
		
		var obtn = null;
	
		var odiv1 = null;
			
			window.onload = function(){
				
				
				var odiv = document.getElementById("name");
				 obtn = odiv.getElementsByTagName("input");
				 odiv1 =odiv.getElementsByTagName("div");
				for(var i=0;i<obtn.length;i++){
					obtn[i].index=i;
					obtn[i].onclick =onclick; 
					
					
				
				
				
			}
		
	};
	
	function onclick(){
		
	
						
						for(var i=0;i<obtn.length;i++){
							
							obtn[i].className ="";
							odiv1[i].style.display ='none';
							
						}
						this.className ="btn";
						odiv1[this.index].style.display="block";
						
						
				
		};
		