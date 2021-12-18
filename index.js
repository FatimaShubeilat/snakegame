// adding js file
const canvas = document.getElementById("game");
// to draw on the screen
const ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;

// to draw the snake now
let tileCount = 20; // since 400 we split it to 20
let tileSize = canvas.width / tileCount - 2; // 400/20 - 2 to make it smaller a lil bit
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

// apples
let appleX = 5;
let appleY = 5;

// for your snake velocity using the arrows on the keyboard
let xVelocity = 0;
let yVelocity = 0;

// game loop
function drawGame() {
  clearScreen();
  changeSnakePosition();

  checkAppleCollision();
  drawApple();
  drawSnake();
  console.log("draw game");
  setTimeout(drawGame, 1000 / speed); // since it takes mill seconds to it is 1 second
}

function clearScreen() {
  ctx.fillStyle = "black"; // like creating a paint brush
  ctx.fillRect(0, 0, canvas.width, canvas.height); // draw a rectangle and start with 0 x and 0 y
}

function drawSnake() {
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY)); // put an item at the end of the list

  if (snakeParts.length > tailLength) {
    snakeParts.shift(); // which remove further from the head
  }
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

// just change like if the snake ate it!
function checkAppleCollision() {
  if (appleX == headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
  }
}

// add event listener
document.body.addEventListener("keydown", keyDown); // keyDown function will listen to any key that is pressed

function keyDown(event) {
  // so when push the up u change the y velocity 1 tile at a time up
  if (event.keyCode == 38) {
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0; // only the y changes
  }

  // down key
  if (event.keyCode == 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }

  //left
  if (event.keyCode == 37) {
    if (xVelocity == 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }

  //right
  if (event.keyCode == 39) {
    if (xVelocity == -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
// game loop to continue update the game

// requestAnimationFrame
// setInterval xtimes per a second
// setTimeOut --
