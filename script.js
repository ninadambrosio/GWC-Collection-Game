//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject, fallObj;
let score = 0;
let backImg, fallImg, catchImg;
const PLAY = 0;
const END = 1;

let gameState = PLAY;
/* PRELOAD LOADS FILES */
function preload() {
  backImg = loadImage("assets/pixelcity.jpg");
  fallImg = loadImage("assets/droplet.png");
  catchImg = loadImage("assets/umbrella.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);
  //resize imgs
  backImg.resize(400, 0);
  catchImg.resize(100, 100);
  fallImg.resize(70, 0);
  //Create catcher 
  catcher = new Sprite(catchImg, 200, 350, 100, 20, "k");
  catcher.color = color(95, 158, 160);

  //Create falling object
  fallingObject = new Sprite(fallImg, 100, 0, 10);
  fallingObject.color = color(0, 128, 128);
  fallingObject.vel.y = 2;
  fallingObject.rotationLock = true;

  fallObj = new Sprite(fallImg, 109, 0, 10);
  fallObj.color = color(0, 128, 128);
  fallObj.vel.y = 2;
  fallObj.rotationLock = true;
}

/* DRAW LOOP REPEATS */
function draw() {
  if (gameState == PLAY) {
    draw_game();
  } else if (gameState == END) {
    draw_end();
  }
}
function draw_game() {
  //img bg
  image(backImg, 0, 0);
  // Draw directions to screen
  fill(0);
  textSize(12);
  text("Move the \numbrella with the \nleft and right \narrow keys to \ndroplets.", width - 100, 20);

  //if falling object reaches bottom, move back to top

  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(3, 8);
  }
  if (fallObj.y >= height) {
    fallObj.y = 0;
    fallObj.x = random(width);
    fallObj.vel.y = random(3, 8);
  }
  //move catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -8;
  }
  else if (kb.pressing("right")) {
    catcher.vel.x = 8;
  }
  else {
    catcher.vel.x = 0;
  }
  //stop on sides
  if (catcher.x < 50) {
    catcher.x = 50;
  }
  else if (catcher.x > 350) {
    catcher.x = 350;
  }
  //if falling object colides w catcher, move back to top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(3, 8);
    fallingObject.direction = "down";
    score = score + 1;
  }
  else if (fallingObject.y > 360) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(3, 8);
    fallingObject.direction = "down";
    score = score - 1;
  }
  if (fallObj.collides(catcher)) {
    fallObj.y = 0;
    fallObj.x = random(width);
    fallObj.vel.y = random(3, 8);
    fallObj.direction = "down";
    score = score + 1;
  }
  else if (fallObj.y > 360) {
    fallObj.y = 0;
    fallObj.x = random(width);
    fallObj.vel.y = random(3, 8);
    fallObj.direction = "down";
    score = score - 1;
  }

  //display score
  fill("black");
  textSize(20);
  text("Score = " + score, 10, 30);
  if (score <= -2 || score >= 10) {
    gameState = END;
    fallingObject.remove();
    fallObj.remove();
    catcher.remove();
  }
}
function draw_end() {
  textSize(20);
  textAlign(CENTER);

  if (score <= -2) {
    background("grey")
    fill("black");
    text("It got too rainy. \n Refresh to try again!", 200, 150);

  } else if (score >= 10) {
    background("yellow")
    fill("black");
    text("The rain stopped!", width / 2, 150);
  }
}