/*========================*\
	#Canvas setup
\*========================*/

var canvas = document.getElementById("context");
var context = canvas.getContext("2d"),
	width = 1000,
	height = 700;
canvas.width = width;
canvas.height = height;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";


  // Add keys to array

  window.addEventListener("keydown", function(e){
  	keys[e.keyCode] = true;
  }, false);

  // Remove keys from array

  window.addEventListener("keyup", function(e){
  	delete keys[e.keyCode];
  }, false);

  window.addEventListener("mousemove", function(e){
		mouseX = event.clientX;
		mouseY = event.clientY;
		findMouseAngle();
  }, false);
	window.addEventListener("click", function(e){
		shoot();
		console.log(bullets);
	}, false);

/*========================*\
  #Variables
\*========================*/
var loop,
    counter = 0,
    gameIsOver =false,
    enemies = [],
		bullets = [],
    gameSpeed = 1,
    keys = [],
    bgpos = 0,
    deltaX,
    deltaY,
    speed = 5,
    // Init images
  	images = [],
  	requiredImages = 0,
		mouseX,
		mouseY,
  	doneImages = 0;
	var vB,
	 vBx,
	 vBy;
var player = {
  width:20,
  height:20,
  y:100,
  x:50,
  hand:{
    rotation:0
  }
}
// initImages(["road1.png"]);
var enemy = function(){
	this.x = width  + Math.random()*100;
	this.y= 25 + Math.floor(Math.random()*12)*50;
	this.width= 24;
	this.height= 50;
}
var bullet = function(x,y){
	this.x = x;
	this.y = y;
	this.width= 3;
	this.height= 3;
	this.angle = player.hand.rotation * Math.PI / 180;
	this.deltaX = deltaX;

}
var start1;
function start(){
  start1 = performance.now();
  loop = window.requestAnimationFrame(start)
  if (counter % gameSpeed == 0){
    game();
  }
  counter++;
}
function game(){
  update();
  render();
}
function update(){
/* ---------------*\
   #Controls
\* ---------------*/
bgpos-=speed;
if (bgpos <= - width ){
  bgpos= 0;
}
for (i in enemies){
  enemies[i].x-=speed;
  if (enemies[i].x < -510){
    enemies.splice(i,1);
  }
}
if (counter % 50 == 0 ){
  enemies.push(new enemy());
}

for (i in bullets){
	vB = 22 //Speed of bullet
	vBx = vB*Math.cos(bullets[i].angle); //Speed of bullet on x-axis
	vBy = vB*Math.sin(bullets[i].angle); //Speed of bullet on y-axis
	bullets[i].x+=vBx;
	bullets[i].y+=vBy;
}

if(keys[37] && !gameIsOver){player.x-=5;findMouseAngle();} // Left
if(keys[39] && !gameIsOver){player.x+=5;findMouseAngle();} // Right
if(keys[38] && !gameIsOver ){player.y-=5;findMouseAngle(); } // Up
if(keys[40] && !gameIsOver ){player.y+=5;findMouseAngle(); } // Down
// if(keys[13] && gameIsOver){ chooseLevel(); } // Start new game

/* ---------------*\
 #Boudaries
\* ---------------*/

if(player.x < 0){player.x=0} // Left margin
if(player.y <= 25){player.y=25} // Top margin
if(player.x >= width - player.width){player.x=width - player.width}  // Right margin
if(player.y >= height - player.height - 50){player.y=height-player.height -50; } // Left margin

}
function render(){
  context.clearRect(0, 0, width, height);
  context.fillRect(0, 0, width, 25);
  context.fillRect(player.x, player.y, player.width, player.height);
  context.save();
  context.translate(player.x, player.y);
  context.rotate(player.hand.rotation * Math.PI/180);
  context.fillStyle='red';
  context.globalAlpha=0.1;
  context.fillRect(0, -1, 2500, 1);
  context.fillRect(0, 1, 2500, 1);
  context.globalAlpha=0.5;
  context.fillRect(0, 0, 2500, 1);
  context.globalAlpha=1;
  context.fillStyle='cyan';
  context.fillRect(0, 0 , 50, 4);
  context.fillStyle='black';
  context.restore();
  context.fillRect(0, height - 50, width, 50);
  for (i in enemies){
    var enemy = enemies[i];
    context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  }
	for (i in bullets){
		var bullet = bullets[i];
		context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
	}
}
function initImages(paths){
	requiredImages = paths.length;
	for (i in paths) {
		console.log(paths[i]);
		var img = new Image();
		img.src = '/image/'+paths[i];
		images[i] = img;
		images[i].onload = function(){
			doneImages++;
			console.log(doneImages);
		}
	}
}
function findMouseAngle(){
	deltaX = mouseX -10 - player.x;
	deltaY = mouseY -10- player.y;
	player.hand.rotation =   180/Math.PI * Math.atan2(deltaY, deltaX);
	console.log("searching");
}
function shoot(){
	bullets.push(new bullet(player.x,player.y));
}
function collision(first, second){
	return !(first.x > second.x + second.width ||
		first.x+first.width<second.x ||
		first.y > second.y + second.height ||
		first.y+first.height<second.y);
}
findMouseAngle();
start();
