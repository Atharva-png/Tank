var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;
var respawn

function preload(){
  pathImg = loadImage("back.jpg");
  mainRacerImg1 = loadAnimation("t3.png");
  mainRacerImg2= loadAnimation("b1.png");
  
  
  
  oppPink1Img = loadAnimation("tank.png");
  oppPink2Img = loadAnimation("b1.png");
  
  oppYellow1Img = loadAnimation("t2.png");
  oppYellow2Img = loadAnimation("b1.png");
  
  oppRed1Img = loadAnimation("Armytank.png");
  oppRed2Img = loadAnimation("b1.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("gameover.png");
  
  respawnimg=loadImage("respawn.png")
}

function setup(){
  
createCanvas(600,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.scale=10

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.addAnimation("collided",mainRacerImg2);

mainCyclist.scale=0.7;
  
//set collider for mainCyclist

  
gameOver = createSprite(230,250);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
  mainCyclist.debug=false
  mainCyclist.setCollider("rectangle",0,0,mainCyclist.width,mainCyclist.height)

respwan=createSprite(290,80)
  respwan.addImage(respawnimg)
  respwan.scale=0.3

}


function draw() {
  background(0);
       mainCyclist.y = World.mouseY;

  drawSprites();
  textSize(20);
  fill("red");
  text("Distance: "+ distance,300,30);

  if(gameState===PLAY){
    
   // mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
    
    
   respwan.visible=false
    gameOver.visible=false
    
    
    
    
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background

  if(path.x < 0 ){
    path.x = width/2;
  }
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     pinkCG.destroyEach();
  //   player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      yellowCG.destroyEach();
    //  player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      redCG.destroyEach();
   //   player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  respwan.visible=true  
  //Add code to show restart game instrution in text here
   mainCyclist.changeAnimation("collided",mainRacerImg2);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
       pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

   // mainCyclist.destroy()
  if(mousePressedOver(respwan)){
reset()    
  }
  /*
  
  if(keyDown("enter")){
    reset()
  }  
  */
  //write condition for calling rset
  fill("red")
  text("press click respawn to start the war",250,100);

  

  
}
  
  
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.5;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.5;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.5;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

//create reset function here
function reset(){
  gameState=PLAY
  pinkCG.destroyEach()
  redCG.destroyEach()
  yellowCG.destroyEach()
    mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);

  distance=0;
  



}