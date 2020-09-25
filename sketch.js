var spy;
var spyimg,spy2img,spy3img,end,jump;
var coinimg;
var ground,groundimg;
var Coins,coincount,coinCollected;
var Guards;
var Ob;
var guard1;
var guard2;
var guard3;
var guard4;
var guard5;
var guard6;
var guard7;
var clash;
var homeimg;

var START = 0;
var PLAY = 1;
var END = 2;
var endSound;

var life;

var gameState;

var score;

var hr;

var bgimg,bg2img,bg,bg2;

function preload(){
    homeimg = loadImage("HomeBg.jpg");
    bgimg = loadImage("BG.jpg");
    groundimg = loadImage("base.png");
    spyimg = loadImage("spy1.jpg");
    spy2img = loadImage("spy2.jpg");
    spy3img = loadImage("spy3.jpg");
    end = loadImage("spy-hurt.jpg");
    endSound = loadSound("die-sound.mp3");
    jump = loadSound("jump-sound.mp3");
    coinimg = loadImage("coin.jpg");
    coinCollected = loadSound("collected coin-sound.mp3");
    guard1 = loadImage("guards-1.jpg");
    guard2 = loadImage("guards-2.jpg");
    guard3 = loadImage("guards-3.jpg");
    guard4 = loadImage("guards-4.jpg");
    guard5 = loadImage("guards-5.jpg");
    guard6 = loadImage("guards-6.jpg");
    guard7 = loadImage("guards-7.jpg");
    clash = loadSound("clash-sound.mp3");
}

function setup() {
  createCanvas(800,400);
  bg = createSprite(363,200,800,400);
  bg.velocity.x = 0;
  bg.addImage(bgimg);
  bg.scale = 3.1;

  bg2 = createSprite(1003,200,800,400);
  bg2.addImage(bgimg);
  bg2.scale = 3.1;

  ground = createSprite(200,510,1600,10);
  ground.addImage(groundimg);
  ground.scale = 8.0;

  spy = createSprite(50,330,5,5);
  spy.addImage(spyimg);
  spy.scale = 0.3;

  Coins = new Group();
  coincount = 0;

  Guards = new Group();

  Ob = new Group();

  gameState = START;

  score = 0;

  life = 3;

  hr = hour();
}

function draw() {
  background("blue");

//start of the start part
  if(gameState===START){
      if(hr>=6 && hr<=21){
        bg.addImage(bgimg);
      }else{
        bg.addImage(homeimg);
      }
      bg.scale = 3.3;
      if(hr>=6 && hr<=21){
        bg2.addImage(bgimg);
      }else{
        bg2.addImage(homeimg);
      }
      bg2.scale = 3.3;
      spy.addImage(spy3img);
      spy.x = 400;
      spy.y = 200;
      spy.scale = 0.9;
  }

//start of the running part
  if(gameState===PLAY){
    spawnCoins();
    spy.addImage(spyimg);
    spy.scale = 0.3;
    changeImagesWhenNeeded();
    if(coincount>0){
      bg.velocity.x = -(3 + 90*coincount/100);
    }else{
      bg.velocity.x = -3;
    }

    score = score+1;

    if(bg.x<40){
        bg.x = 363;
    }
    bg.scale = 3.1;
    bg2.scale = 3.1;

    bg2.x = bg.x+696;
    bg2.y = bg.y-28;

    if(coincount>0){
      Ob.setVelocityEach(-(3 + 90*coincount/100),0);
    }else{
      Ob.setVelocityEach(-3,0);
    }

    if(coincount>0){
        Guards.setVelocityEach(-(random(5,3) + 90*coincount/100),0);
    }else{
        Guards.setVelocityEach(-(random(5,3)),0);
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
        coinCollected.play();
    }

    spy.collide(ground);
    spy.collide(Ob);

    if(Guards.isTouching(spy) && life>0){
        life=life-1;
        Guards.destroyEach();
        spy.addImage(spy2img);
        clash.play();
        if(life===0){
          gameState=END;
          endSound.play();
        }
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
    image(guard2,200,240,140,160);
    image(guard3,620,120,100,100);
    image(guard4,160,80,100,110);
    image(guard5,450,100,70,70);
    image(guard6,380,30,70,70);
    image(guard7,480,300,100,100);
    score = score+0;

    var finalscore = score+coincount;

    textSize(25);
    if(finalscore<=550){
        text("DUDE!Can you jump?!",10,220);
    }

    if(finalscore>550 && score<=1050){
        text("OH NO!SOOO close?!",10,220);
        text("IMPROVEMENT!",0,280);
    }

    if(finalscore>1050 && score<=2050){
        text("Just the coins that's all!",10,220);
    }

    if(finalscore>2050 && score<=3050){
        text("You just got lucky in this one",10,220);
    }

    if(finalscore>3050 && score<=4050){
        text("It's an Average Average score",10,220);
    }

    if(finalscore>4050 && score<=5050){
      text("Average score!!",10,220);
    }

    if(finalscore>5050 && score<=6050){
      text("OK Alright! You ain't a NOOB",10,220);
    }

    if(finalscore>6050 && score<=8050){
      text("OK, confession- you're great",10,220);
    }

    if(finalscore>8050 && score<=10050){
      text("Wonderful at it! BUT Not Pro",10,220);
    }

    if(finalscore>10050 && score<=12050){
      text("Great Score, AVERAGE Pro!",10,220);
    }

    if(finalscore>12050 && score<=14050){
      text("WHAT!Don't dare to do it again!",0,220);
      text("Kidding!Dare ya...",0,280);
      text("Do it again!",0,320);
      text("If you can,PRO!!!",0,360);
    }

    if(finalscore>14050 && score<=16050){
      text("Yup!You're a true spy-mentally",0,220);
      text("Keep it up!!",0,280);
    }

    if(finalscore>16050 && score<=18050){
      text("Super Game,Advanced PRO!!!",0,220);
    }

    if(finalscore>18050 && score<=20050){
      text("Superhuman,BUT not SUPERHUMAN",0,220);
    }

    if(finalscore>20050 && score<=25000){
      text("ADVANCED!!PRO!!SPY!!",0,220);
    }

    if(finalscore>25000){
      text("SUPERHUMAN!!You're a",0,220);
      text("TRUE!SPY!PRO!!",0,280);
    }

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
        if(coincount>0){
          obs.velocity.x = -(3 + 90*coincount/100);
        }else{
          obs.velocity.x = -3;
        }
        obs.y = random(200,280);
        obs.width = r;
        obs.height = r2;
        obs.shapeColor=color(random(176,0),random(96,0),0);
        Ob.add(obs);
    }
}

function spawnobstacles2(){
  if(frameCount%75===0){
    var r = random(0,100);
    var r2 = random(0,75);
      var obs = createSprite(800,350,20,50);
      if(coincount>0){
        obs.velocity.x = -(3 + 90*coincount/100);
      }else{
        obs.velocity.x = -3;
      }
      obs.y = random(320,400);
      obs.width = r;
      obs.height = r2;
      obs.shapeColor=color(random(45,0),0,0);
      Ob.add(obs);
  }
}

function spawnCoins(){
    if(frameCount%400===0){
        var r = random(30,350);
        var coin = createSprite(800,200,20,20);
        coin.y = r;
        if(coincount>0){
          coin.velocity.x = -(3 + 90*coincount/100);
        }else{
          coin.velocity.x = -3;
        }
        coin.addImage(coinimg);
        coin.scale = 0.3;
        Coins.add(coin);
        coin.x = coin.x+100;
    }
}

function spawnEnemies(){
  if(frameCount%260===0){
    var r = random(3,5);
    var enemy = createSprite(400,400,50,50);
    enemy.x = random(600,800);
    enemy.y = random(250,350);
    if(coincount>0){
      enemy.velocity.x = -(r + 90*coincount/100);
    }else{
      enemy.velocity.x = -r;
    };
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

function mousePressed(){
  if(gameState===START){
    gameState = PLAY;
    spy.x = 50;
    spy.y = 330;
  }

  if(gameState===PLAY){
    if(spy.y>200){
        spy.velocity.y = -15;
        changeImagesWhenNeeded();
    }
  }
}

function mouseReleased(){
  if(gameState===START){
    gameState = PLAY;
    spy.x = 50;
    spy.y = 330;
  }

  if(gameState===PLAY){
    if(spy.y>200){
        spy.velocity.y = -15;
        changeImagesWhenNeeded();
        jump.play();
    }
  }
}

function changeImagesWhenNeeded(){
  if(spy.collide(Ob) && spy.y<347){
    spy.addImage(spy2img);
  }else{
    spy.addImage(spyimg);
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
}