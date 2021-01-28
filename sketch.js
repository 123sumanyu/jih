var PLAY=0;
var END=1;
var gameState=PLAY;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var endImg;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);



//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.debug=false;
boy.setCollider("circle",0,0,450);
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
}

function draw() {

  background(0);
  
  if(gameState===PLAY){
  boy.x = World.mouseX;
  boy.y=330;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
    path.velocityY = 4;
    
    boy.changeAnimation("SahilRunning",boyImg);
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+150
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        cashG.setVelocityYEach(0);
        cashG.destroyEach();
        diamondsG.setVelocityYEach(0);
        diamondsG.destroyEach();
        jwelleryG.setVelocityYEach(0);
        jwelleryG.destroyEach();
        gameState=END;
        
    }
  }
  }
  drawSprites();
  
  if(gameState===END){
    path.velocityY = 0;
    fill("red");
    textSize(16);
    text("PRESS ENTER TO RESTART",100,300)
    treasureCollection=0;
    if(keyDown("enter")){
      gameState=PLAY;
    }
    image(endImg,50,150,300,100);
    boy.x=500;
    boy.y=550;
  }
  
  
  
  textSize(20);
  fill("yellow");
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(150, 350),50, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 125;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(200, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 125;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(250, 350),45, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 125;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(300, 350),60, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 125;
  swordGroup.add(sword);
  }
}