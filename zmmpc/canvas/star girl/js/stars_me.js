var startObj = function(x,y){
	this.x = x;
	this.y = y;
	this.picNum;
}
startObj.prototype.init = function(){
	 this.x = Math.random()*600+100;
	 this.y = Math.random()*300+150;
	 this.picNum = 0;
}
startObj.prototype.update = function(){
	this.picNum+=1;
	if(this.picNum>7){
		this.picNum = 0;
	}
}
startObj.prototype.draw = function(){
	//drawimages
	 ctx.drawImage(starPic,this.picNum*7,0,7,7,this.x,this.y,7,7)
}
function drawStars(){
	for(var i= 0;i<num;i++){
		stars[i].update();
		 stars[i].draw();
	}
}




