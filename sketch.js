//Create variables here
var dog, happyDog, database, foodS, foodStock, db

function preload()
{
  //load images here
  DogImg=loadImage("images/Dog.png");
  HappyDogImg = loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500, 500);
  //rectMode(CENTER);

  db = firebase.database();

  foodStock= db.ref('Food').on("value", readStock);

	//engine = Engine.create();
	//world = engine.world;

	dog=createSprite(250, 250, 30,30);
	dog.addImage(DogImg)
	dog.scale = 0.2

}


function draw() {  
  background(46,139,85);
  if(keyDown(UP_ARROW)){
    foodS = foodS - 1;
    writeStock(foodS);
    dog.addImage(HappyDogImg);
  }

  if(keyDown(DOWN_ARROW)){
    foodS = foodS + 1;
    writeStock(foodS);
    dog.addImage(DogImg);
  }
  drawSprites();
  textSize(35);
  fill("white");
  text("Food Stock "+foodS, 20,40);
  textSize(19);
  text("Up Arrow To Feed, Down Arrow To Increase Foodstock", 10, 400);
  
  //add styles here

}

function readStock(data){
  foodS= data.val();
  console.log(foodS);
}

function writeStock(x){
  if (x<= 0){
    x=0;
  }
  db.ref('/').update({
    Food:x
  })
}