var spy;
var spyimg;
var ground;

var guard = [];
var guard1;
var guard2;
var guard3;
var guard4;
var guard5;
var guard6;
var guard7;

var g1,g2,g3,g4,g5,g6,g7;

var bgimg;

function preload(){
    spyimg = loadImage("spy1.jpg");
    guard1 = loadImage("guards-1.jpg");
    guard2 = loadImage("guards-2.jpg");
    guard3 = loadImage("guards-3.jpg");
    guard4 = loadImage("guards-4.jpg");
    guard5 = loadImage("guards-5.jpg");
    guard6 = loadImage("guards-6.jpg");
    guard7 = loadImage("guards-7.jpg");
}

function setup() {
  createCanvas(800,400);

  spy = createSprite(50,330,5,5);
  spy.addImage(spyimg);
  spy.scale = 0.3;

  ground = createSprite(200,390,1600,10);
  ground.velocity.x = -3;
}

function draw() {
  background("white");

  spy.collide(ground);

  if(ground.x<0){
    ground.x = ground.width/2;
  }

  if(keyCode === 32 && spy.y>=300){
      spy.velocity.y = -7;
  }

  spy.y = spy.y + 0.8;
  
  console.log(spy.y);

  spawnObstacles();

  drawSprites();
}

function spawnObstacles(){
    if(frameCount%100===0){
        var r = random(0,100);
        var r2 = random(0,75);
        var obs = createSprite(800,350,20,50);
        obs.velocity.x = -3;
        obs.width = r;
        obs.height = r2;
    }
}