var spy;
var spyimg,spy2img,end;
var coinimg;
var ground,groundimg;
var Coins,coincount;
var Guards;
var Ob;
var guard1;
var guard2;
var guard3;
var guard4;
var guard5;
var guard6;
var guard7;

var PLAY = 0;
var END = 1;
var gameState;

var score;

var bgimg,bg2img,bg,bg2;

function preload(){
    bgimg = loadImage("BG.jpg");
    bg2img = loadImage("BG - Copy.jpg");
    groundimg = loadImage("base.png");
    spyimg = loadImage("spy1.jpg");
    spy2img = loadImage("spy2.jpg");
    end = loadImage("spy-hurt.jpg");
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

  bg2 = createSprite(1130,200,800,400);
  bg2.velocity.x = -3;
  bg2.addImage(bg2img);
  bg2.scale = 3.1;

  spy = createSprite(50,330,5,5);
  spy.addImage(spyimg);
  spy.scale = 0.3;

  ground = createSprite(200,510,1600,10);
  ground.velocity.x = -3;
  ground.addImage(groundimg);
  ground.scale = 8.0;

  Coins = new Group();
  coincount = 0;

  Guards = new Group();

  Ob = new Group();

  gameState = PLAY;

  score = 0;
}

function draw() {
  background("red");

//start of the running part
  if(gameState===PLAY){
    spawnCoins();
    collectCoins();

    changeImagesWhenNeeded();

    score = score+1;

    if(bg.x<40){
        bg.x = 400;
    }

    if(bg2.x<770){
        bg2.x = 1130;
    }

    if(ground.x<0){
      ground.x = ground.width/2;
    }

    if(spy.x<50){
        spy.x = 50;
    }

    if(spy.y>348){
        spy.y = 347.25;
    }

    spy.velocity.y = spy.velocity.y + 0.8;

    spawnObstacles();
    spawnobstacles2();

    spawnEnemies();

    if(Coins.isTouching(spy)){
        Coins.destroyEach();
        coincount = coincount+1;
    }

    spy.collide(ground);
    spy.collide(Ob);

    if(coincount===0 && Guards.isTouching(spy)){
        gameState = END;
    }
    //end of the running part
  }

  //start of the ending part
  if(gameState===END){
    End();
    spy.addImage(end);
    spy.x = 400;
    spy.y = 200;
    spy.scale = 0.5;
    image(guard1,600,230,120,120);
    image(guard2,200,240,140,160);
    image(guard3,620,120,100,100);
    image(guard4,160,80,100,110);
    image(guard5,450,100,70,70);
    image(guard6,380,30,70,70);
    image(guard7,480,300,100,100);
    score = score+0;

    textSize(30);
    text("Score: "+ score,500,50);
  }
  //end of the ending part

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
        Ob.add(obs);
    }
}

function spawnobstacles2(){
  if(frameCount%75===0){
    var r = random(0,100);
    var r2 = random(0,75);
      var obs = createSprite(800,350,20,50);
      obs.velocity.x = -3;
      obs.y = random(320,400);
      obs.width = r;
      obs.height = r2;
      Ob.add(obs);
  }
}

function spawnCoins(){
    if(frameCount%335===0){
        var r = random(80,300);
        var coin = createSprite(800,200,20,20);
        coin.y = r;
        coin.velocity.x = -3;
        coin.addImage(coinimg);
        coin.scale = 0.3;
        Coins.add(coin);
    }
}

function spawnEnemies(){
  if(frameCount%290===0){
    var r = random(3,5);
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
    Guards.add(enemy);
  }
}

function keyPressed(){
    if(keyCode===32 && spy.y>200){
        spy.velocity.y = -15;
        changeImagesWhenNeeded();
    }
}

function changeImagesWhenNeeded(){
  if(spy.collide(Ob) && spy.y<347){
    spy.addImage(spy2img);
  }else{
    spy.addImage(spyimg);
  }
}

function collectCoins(){
    if(coincount>0){
        if(Guards.isTouching(spy)){
            Guards.destroyEach();
            coincount = coincount-1;
        }

        if(keyCode===107){
            Ob.destroyEach();
            coincount = coincount-1;
        }
    }
}

function End(){
    bg.destroy();
    bg2.destroy();
    ground.destroy();

    Coins.setVelocityEach(0,0);
    Guards.setVelocityEach(0,0);
    Ob.setVelocityEach(0,0);

    Coins.destroyEach();
    Guards.destroyEach();
    Ob.destroyEach();

    if(keyCode===32){
      spy.velocity.x = 0;
      spy.velocity.y = 0;
    }
  
}