var fruitsGroup, microbesGroup
var chopper, chopperImage, fruit, fruit1, fruit2, fruit3, fruit4, microbe, microbeImage
var gameOver, gameOverImage
var chopperSound, gameOverSound
var cross1, cross2, cross3, cross4
var score = 0;
var PLAY = 1;
var END = 0;
var n

gameState = PLAY;

function preload()
{
  chopperImage = loadImage("sword.png");
  chopperSound = loadSound("knifeSwooshSound.mp3");
  microbeImage = loadImage("alien1.png", "alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  
  chopper = createSprite(width/4,height/2,10,10);
  chopper.addImage(chopperImage);
  chopper.scale=height/700;
  
  microbesGroup = createGroup();
  fruitsGroup = createGroup();
  //cross1 = ellipse(380,20,20,20);
  
  gameOver = createSprite(width/2,height/2,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale = height/200;
  gameOver.visible = false;
}


function draw()
{
  background("Chartreuse");
  
  if(gameState===PLAY)
    { 
      Fruits();
      
      Microbes();
      
      
      chopper.x = World.mouseX;
      chopper.y = World.mouseY;
      
      
      
      if(fruitsGroup.isTouching(chopper))
        {
          chopperSound.play();
          fruitsGroup.destroyEach();
          score=score+3;
        }
    
      else 
        { if(microbesGroup.isTouching(chopper))
            {
              gameState = END;
              gameOverSound.play();
            }
        }
    }
    else
      {
        if(gameState === END)
          {
              gameOver.visible = true;
              fruitsGroup.destroyEach();
              microbesGroup.destroyEach();
              chopper.destroy();

              
          }
      }
      drawSprites();
      
      stroke("black");
      textSize(height/20);
      text("S C 0 R E : "+ score, width*17/40, 100);
}


function Fruits()
{
  if(World.frameCount%80===0)
    {
      fruit = createSprite(width,height/2,20,20);
      fruit.scale=height/2000;
      
      n = Math.round(random(1,4));
      
      if(n===1)
        {
          fruit.addImage(fruit1);
        }
      else if(n===2)
        {
          fruit.addImage(fruit2);
        }
      else if(n===3)
        {
          fruit.addImage(fruit3);
        }
      else
        {
          fruit.addImage(fruit4);
        }
      
      fruit.y = Math.round(random(height/8,height*7/8));
      
      fruit.velocityX=-8;
      fruit.lifeTime=width/8;
      
      fruitsGroup.add(fruit);
    }
   
}

function Microbes()
{
  if(World.frameCount%200===0)
    {
      microbe = createSprite(width,height/2,20,20);
      microbe.addImage("moving",microbeImage);
      microbe.y=Math.round(random(height/4,height*3/4));
      microbe.velocityX=-8;
      microbe.lifeTime=width/8;
      
      microbesGroup.add(microbe);
    }
  
    
}
