
  function setHtmlFontSize() {
                var baseWidth = 640,
                baseFontSize = 100,
               pageWidth  =  document.documentElement.clientWidth;
               if(pageWidth>640){
               	pageWidth = 640;
               }
                newSize = parseInt( ((pageWidth) / baseWidth) * 100);
                document.documentElement.style.fontSize = ((pageWidth) / baseWidth) * 100 + "px";
                
              
               
            
}
setHtmlFontSize();
window.onresize = function() {
    setHtmlFontSize();
}     

var date = new Date().getTime();

		var links = document.getElementsByTagName('link');
		for(var i=0;i<links.length;i++){
			
			var link = links[i];
			link.href+=(link.href.indexOf('?') ==-1 ? '?':'&')+date;
	
		
		
		}
		
		

