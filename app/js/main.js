/*========================*\
	#Canvas setup
\*========================*/

var canvas = document.getElementById("context");
canvas.width = 1000;
canvas.height = 275;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";
var context = canvas.getContext("2d"),
	width = 1000,
	height = 275;

  // Add keys to array

  window.addEventListener("keydown", function(e){
  	keys[e.keyCode] = true;
  }, false);

  // Remove keys from array

  window.addEventListener("keyup", function(e){
  	delete keys[e.keyCode];
  }, false);

    window.addEventListener("mousemove", function(e){
      deltaX = event.clientX -10 - player.x;
      deltaY = event.clientY -10- player.y;
      console.log(deltaY);
      player.hand.rotation =   180/Math.PI * Math.atan2(deltaY, deltaX);
      // console.log( player.hand.rotation);
    }, false);

/*========================*\
  #Variables
\*========================*/
var loop,
    counter = 0,
    gameIsOver =false,
    enemies = [],
    gameSpeed = 1,
    keys = [],
    bgpos = 0,
    deltaX,
    deltaY,
    speed = 5,
    // Init images
  	images = [],
  	requiredImages = 0,
  	doneImages = 0;

var player = {
  width:20,
  height:20,
  y:100,
  x:50,
  hand:{
    rotation:0
  }
}
initImages(["road1.png"]);
var enemy = function(){
	this.x = width  + Math.random()*100;
	this.y= 25 + Math.floor(Math.random()*4)*50;
	this.width= 24;
	this.height= 50;
	this.isMoving = false;
	this.movingTime= 20;
	this.movingSpeed= 4;
	this.health= 5;
	this.isDead = false;
	this.maxHealth = 5;
	this.name_id= "normal";
	this.score = 4;
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



	if(keys[37] && !gameIsOver){player.x-=5;} // Left
	if(keys[39] && !gameIsOver){player.x+=5;} // Right
	if(keys[38] && !gameIsOver ){player.y-=5; } // Up
	if(keys[40] && !gameIsOver ){player.y+=5; } // Down
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
  context.fillRect(0, 0, 2500, 1);
  context.fillStyle='black';
  context.restore();
  context.fillRect(0, 225, width, 50);
  for (i in enemies){
    var enemy = enemies[i];
    context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
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
start();
