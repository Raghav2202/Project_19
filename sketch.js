var SpaceShip,SpaceShipImg;
var Space,SpaceImg;
var bullet,bulletImg,bulletGroups;
var motherShip, motherShipImg;
var gameState = "before"
var gunShot,motherShipSound;
var score = 0;

function preload(){
//loading images
    SpaceShipImg = loadImage("pngfind.com-fighter-jet-png-410089 (1).png");
    SpaceImg = loadImage("background.png");
    motherShipImg = loadImage("kisspng-technology-5b01a5037dc191.2218002515268344355151.png");
    bulletImg = loadImage("Daco_4084688.png")

//loading sounds
    gunShot = loadSound("Photon gun shot.wav")
    motherShipSound = loadSound("Mother ship 1.wav")
//creating groups
    bulletGroups = new Group();
}

function setup() {
 createCanvas(600,400);

//creating and moving background
    Space = createSprite(300,200);
    Space.addImage("Background",SpaceImg);
    Space.velocityY = 1;
    Space.scale = 4
    
//creating player's ship
    SpaceShip = createSprite(300,350);
    SpaceShip.addImage("Player",SpaceShipImg);
    SpaceShip.scale = 0.1

//creating mothership
    motherShip = createSprite(300,50);
    motherShip.addImage("Enemy",motherShipImg);
    motherShip.scale = 0.3
}

function draw() {
 if(gameState === "before"){
    stroke("black");
    fill("yellow")
    text("Dodge The Bullets",300,200);
    text("Use Arrow Keys to move",290,220);
    if(keyDown("Space")){
        gameState = "play"
    }
 }
 
 if(gameState === "play"){
     if(Space.y>300){
         Space.y = 200
     }
     text("Score = "+score,550,50);
     if(keyDown("Left_Arrow")){
         SpaceShip.x -=2
     }
     if(keyDown("Right_Arrow")){
        SpaceShip.x +=2
     }
     if(bulletGroups.isTouching(SpaceShip)){
         gameState ="end";
     }   
    spawnBullets();
    motherShipSound.loop();

     drawSprites();
 }

 if(gameState === "end"){
     background("black");
     text("Game Over",300,200)
    motherShipSound.pause(); 
 }
    
}

function spawnBullets(){
    if(frameCount % 30 === 0){
        bullet = createSprite(300,150,);
        bullet.addImage(bulletImg);
        bullet.scale = 0.03
        bullet.x = Math.round(random(50,350));
        bullet.velocityY = 1;
        bullet.lifetime = 250;
        bulletGroups.add(bullet);
        gunShot.play();
        score = score+1;
    }
}