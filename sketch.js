var spy;
var spyimg;
var coinimg;
var ground;

var guard = [];
var Ob = [];
var guard1;
var guard2;
var guard3;
var guard4;
var guard5;
var guard6;
var guard7;

var g1,g2,g3,g4,g5,g6,g7;

var bgimg,bg2img,bg,bg2;

function preload(){
    bgimg = loadImage("BG.jpg");
    bg2img = loadImage("BG - Copy.jpg");
    spyimg = loadImage("spy1.jpg");
    coinimg = loadImage("coin.jpg");
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

  bg = createSprite(400,200,800,400);
  bg.velocity.x = -3;
  bg.addImage(bgimg);
  bg.scale = 3.1;

  bg2 = createSprite(1200,227,800,400);
  bg2.velocity.x = -3;
  bg2.addImage(bg2img);
  bg2.scale = 3.1;

  spy = createSprite(50,330,5,5);
  spy.addImage(spyimg);
  spy.scale = 0.3;

  ground = createSprite(200,395,1600,10);
  ground.velocity.x = -3;
}

function draw() {
  background("white");

  spawnCoins();

  if(bg.x<0){
      bg.x = 400;
  }

  if(bg2.x<800){
      bg2.x = 1200;
  }

  if(ground.x<0){
    ground.x = ground.width/2;
  }

  if(spy.y>348){
      spy.y = 347.25;
  }

  spy.velocity.y = spy.velocity.y + 0.8;

  spawnObstacles();
  spawnobstacles2();

  spawnEnemies();

  spy.collide(ground);
  spy.collide(Ob);

console.log(spy.y);

  drawSprites();
}

function spawnObstacles(){
    if(frameCount%120===0){
        var r = random(0,100);
        var r2 = random(0,75);
          var obs = createSprite(800,350,20,50);
          obs.velocity.x = -3;
          obs.y = random(200,280);
          obs.width = r;
          obs.height = r2;
          Ob.push(obs);
    }
}

function spawnobstacles2(){
  if(frameCount%80===0){
    var r = random(0,100);
    var r2 = random(0,75);
      var obs = createSprite(800,350,20,50);
      obs.velocity.x = -3;
      obs.y = random(320,400);
      obs.width = r;
      obs.height = r2;
      Ob.push(obs);
  }
}

function spawnCoins(){
    if(frameCount%320===0){
        var r = random(150,300);
        var coin = createSprite(800,200,20,20);
        coin.y = r;
        coin.velocity.x = -2;
        coin.addImage(coinimg);
        coin.scale = 0.3;
    }
}

function spawnEnemies(){
  if(frameCount%280===0){
    var r = random(2,4);
    var enemy = createSprite(400,400,50,50);
    enemy.x = random(600,800);
    enemy.y = random(250,350);
    enemy.velocity.x = -r;
    var rand = Math.round(random(1,7));

    switch(rand){
        case 1: enemy.addImage(guard1);
              break;
        case 2: enemy.addImage(guard2);
              break;
        case 3: enemy.addImage(guard3);
              break
        case 4: enemy.addImage(guard4);
              break;
        case 5: enemy.addImage(guard5);
              break;
        case 6: enemy.addImage(guard6);
              break;
        case 7: enemy.addImage(guard7);
              break;
    }
    enemy.scale = 0.3;
  }
}

function keyPressed(){
    if(keyCode===32 && spy.y>200){
        spy.velocity.y = -15;
    }
}