var can;
var ctx;
var w;
var h;
var girlPic = new Image();
var starPic = new Image();
var num = 60;
var stars =[];
var lastTime;
var deltaTime;
function init(){
	
	can = document.getElementById("canvas");
	ctx = can.getContext("2d");
	  w = can.width ;
	  h  = can.height;
	 girlPic.src = "src/girl.jpg";
	 starPic.src = "src/star.png";
	 for(var i= 0;i<num;i++){
	 	var obj = new startObj();
	 	stars.push(obj);
	 	
	 	stars[i].init();
	 }
	 lastTime = Date.now();
	gameloop();
	
}
document.body.onload = init;
function gameloop(){
	drawBackground();
	window.requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now-lastTime;
	deltaTime =now;
	drawGirl();
	drawStars();
	
}
 function drawBackground(){
 	 ctx.fillStyle = "#393550";
 	 ctx.fillRect(0,0,w,h);
 }
 function drawGirl(){
 	 //drawImages(img,x,y,width,height)
 	 ctx.drawImage(girlPic,150,150,600,300);
 }
