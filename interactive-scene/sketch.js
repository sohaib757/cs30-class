// Moving Pawns
// Sohaib Hassan
// October 3rd, 2025
//
// Extra for Experts:
// - Created a functioning timer using the setInterval() function
// - Added text that changes size based on the screen size.

// Global Variables 

// Chess piece images
let whitePawnImg;
let blackPawnImg;
let whiteQueenImg;
let blackQueenImg;

// Size of each square on the board depending on screen size
let size;

// State variables
let whitePawnOneClicked = false;
let blackPawnOneClicked = false;
let whitePawnOneTurn = true;
let firstMove = true;
let blackPawnOneTurn = false;
let canMoveW = false;
let canMoveB = false;
let whitePromoting = false;
let blackPromoting = false;
let whitePromoted = false;
let blackPromoted = false;

// Adjust pawn postion
let whitePawnOneForward = 0;
let blackPawnOneForward = 0;
let changePawnW = 0;
let changePawnB = 0;

// Adjust circle position
let changeCircleW = 0;
let changeCircleB = 0;
let blackCircleY= 2.5;
let whiteCircleY = 4.5;

// Time for both colours in seconds
let timeW = 30;
let timeB = 30;

// Preloads the images of the chess pieces before initializing the game
function preload() {
  whitePawnImg = loadImage("whitepawn.png");
  blackPawnImg = loadImage("blackpawn.png");
  whiteQueenImg = loadImage("whitequeen.jpg");
  blackQueenImg = loadImage("blackqueen.png")
}

// Sets window size depending on the size of the user's screen and controls timer
function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  size = width/8;
  
  // Start timer that runs every one second
  setInterval(timer, 1000);
}

// Calls the functions needed for the experience to run
function draw() {
  background(220);
  showBoard();
  showPawns();
  noStroke();
  movePawns();
  promotion();
  keyPressed();
  showTimer();
  gameOver();
  // Scale text size according to canvas size
  textSize(width/40);
}

// Resizes the window in accordance to the user's screen size
function windowResized() {
  if (windowWidth > windowHeight) {
    resizeCanvas(windowHeight, windowHeight);
  }
  else {
    resizeCanvas(windowWidth, windowWidth);
  }
  size = width/8;
}

// Displays an 8x8 chess board that also adjusts to the screen size
function showBoard() {
  let isWhite = false;
  for (let y = 0; y < 8; y ++){
    isWhite = !isWhite;
    for (let x = 0; x < 8; x ++) {
      if (isWhite) {
        fill("white");
      }
      else {
        fill("black");
      }
      rect(x *size, size * y, size, size);
      isWhite = !isWhite;
    }
  }
}

// Displays the pawn images in their respective positions
function showPawns() {
  image(whitePawnImg, size/2 - size, 6 * size - whitePawnOneForward, size * 2, size);
  image(blackPawnImg, size/2, size + blackPawnOneForward, size *2, size);
}

// Controls whether or not pawns can be moved and the positions of the circles
function movePawns() {
  
  // Check if white pawn is in first move to determine how many squares it can move
  if (whitePawnOneClicked && firstMove) {
    fill("grey");
    circle(size/2, size * whiteCircleY, size/4);
    circle(size/2, size * (whiteCircleY + 1), size/4);
    canMoveW = true;
  }
  
  // Make sure white pawn can only move when clicked
  if (!whitePawnOneClicked) {
    canMoveW = false;
  }
  
  // White pawn can only move 1 square after first move
  else if (whitePawnOneClicked && !firstMove) {
    fill("grey");
    circle(size/2, 6 * size - changePawnW - changeCircleW - size/2, size/4);
    canMoveW = true;
  }
  
  // Check if black pawn is in first move to determine how many squares it can move
  if (blackPawnOneClicked && firstMove) {
    fill("grey");
    circle(size * 1.5, size * blackCircleY, size/4);
    circle(size * 1.5, size * (blackCircleY + 1), size/4);
    canMoveB = true;
  }
  
  // Make sure black pawn can only move when clicked
  if (!blackPawnOneClicked) {
    canMoveB = false;
  }
  
  // Black pawn can only move 1 square after first move
  else if (blackPawnOneClicked && !firstMove) {
    fill("grey");
    circle(size * 1.5, 2 * size + changePawnB + changeCircleB + size/2, size/4);
    canMoveB = true;
  }
}

// Controls the movement of the pawns based on mouse position and states
function mouseClicked() {
  
  // Allows white pawn to move only when it is white turn and when the mouse is on the pawn
  if (whitePawnOneTurn && mouseX < size && mouseY > 6 * size - changePawnW && mouseY < 7 * size - changePawnW) {
    whitePawnOneClicked = true;
  }
  else {
    whitePawnOneClicked = false; 
  }
  
  // White pawn move 1 square forward
  if (canMoveW && whitePawnOneTurn && mouseX < size && mouseY < size * 6 - changePawnW && mouseY > size * 5 - changePawnW) {
    whitePawnOneForward += size;
    whitePawnOneTurn = false;
    blackPawnOneTurn = true;
    canMoveW = false;
    canMoveB = true;
    changePawnW += size;
    changeCircleW += 1;
  }
  
  // White pawn move 2 squares forward only when it's the first move
  else if (canMoveW && firstMove && whitePawnOneTurn && mouseX <  size && mouseY < size * 5 - changePawnW && mouseY > size * 4 - changePawnW) {
    whitePawnOneForward += size * 2;
    whitePawnOneTurn = false;
    blackPawnOneTurn = true;
    canMoveB = true;
    canMoveW = false;
    changePawnW += 2 * size;
    changeCircleW += 1;
  }
  
  // Allows black pawn to move only when it is black turn and when the mouse is on the pawn
  if (blackPawnOneTurn && mouseX < 2 * size  && mouseX > size && mouseY > size + changePawnB && mouseY < 2 * size + changePawnB) {
    blackPawnOneClicked = true;
    firstMoveB = true;
  }
  else {
    blackPawnOneClicked = false;
  }
  
  // Black pawn move 1 square forward
  if (canMoveB && blackPawnOneTurn && mouseX < 2 * size  && mouseX > size && mouseY < size * 3 + changePawnB && mouseY > size * 2 + changePawnB) {
    blackPawnOneForward += size;
    blackPawnOneTurn = false;
    firstMove = false;
    whitePawnOneTurn = true;
    canMoveW = true;
    canMoveB = false;
    changePawnB += size;
    changeCircleB += 1;
  }
 
  // Black pawn move 2 squares forward only when it's the first move
  else if (canMoveB && firstMove && blackPawnOneTurn && mouseX < size * 2 && mouseX > size && mouseY < size * 4 + changePawnB && mouseY > size * 3 + changePawnB) {
    blackPawnOneForward += size * 2;
    blackPawnOneTurn = false;
    firstMove = false;
    whitePawnOneTurn = true;
    canMoveW = true;
    canMoveB = false;
    changePawnB += 2 * size;
    changeCircleB += 1;
  }
}

// Promotes from pawn to queen when applicable
function promotion() {
  // White Pawn Promotion
  if (changePawnW === 6 * size && !whitePromoted && !whitePromoting) {
    whitePromoting = true;
    canMoveW = false;
    canMoveB = false; 
  }

  if (whitePromoting) {
    // Display message for white promotion
    fill("grey");
    rect(width/2 - size, height/2 - size, 2*size, size);
    fill("red");
    text("Press 'p' for queen.", width/2 - size/1.2, height/2 - size/1.7, size*3, size);
    blackPawnOneTurn = false;
    
    // Promote when p is pressed
    if (keyIsDown(80)) { 
      whitePromoting = false;
      whitePromoted = true;
      canMoveB = true;    
      whitePawnOneTurn = false;
      blackPawnOneTurn = true;
    }
  }

  // Black Pawn Promotion 
  if (changePawnB === 6 * size && !blackPromoted && !blackPromoting) {
    blackPromoting = true;   
    canMoveB = false;     
    canMoveW = false;  
  }

  if (blackPromoting) {
    // Display message for black promotion
    fill("grey");
    rect(width/2 - size, height/2 - size, 2*size, size);
    fill("red");
    text("Press 'u' for queen.", width/2 - size/1.2, height/2 - size/1.7, size*3, size);
    whitePawnOneTurn = false;
    
    // Promote when u is pressed
    if (keyIsDown(85)) { 
      blackPromoting = false;
      blackPromoted = true; 
      canMoveW = true;  
      whitePawnOneTurn = true;
      blackPawnOneTurn = false;
    }
  }

  // Promote from pawn to queen by changing image
  if (whitePromoted) {
    image(whiteQueenImg, 0, 0, size, size);
  }
  if (blackPromoted) {
    image(blackQueenImg, size, size * 7, size, size);
  }
}

// Can be used to change the colour of the chess board
function keyPressed() {
  
  // Tan/brown board if user presses q
  if (key === 'q') {
    let isWhite = false;
    for (let y = 0; y < 8; y ++){
      isWhite = !isWhite;
      for (let x = 0; x < 8; x ++) {
        if (isWhite) {
          fill("tan");
        }
        else {
          fill("brown");
        }
        rect(x *size, size * y, size, size);
        isWhite = !isWhite;
      }
    }
    showPawns();
    movePawns();
    promotion();
  }
  
  // Return to white/black theme if user presses e
  if (key === 'e') {
    let isWhite = false;
    for (let y = 0; y < 8; y ++){
      isWhite = !isWhite;
      for (let x = 0; x < 8; x ++) {
        if (isWhite) {
          fill("white");
        }
        else {
          fill("black");
        }
        rect(x *size, size * y, size, size);
        isWhite = !isWhite;
      }
    }
  }
  showPawns();
  movePawns();
  promotion();
}

// Displays the timer for both white and black
function showTimer() {
  
  // White timer
  fill("green");
  rect(width-width/15, height/900, width/8, height/30);
  fill("red");
  text(timeW, width-width/25, height/40);
  
  // Black timer
  fill("green");
  rect(width - width/15, height - size/4, width/8, height/30);
  fill("red");
  text(timeB, width-width/25, height - height/150);
}

// A timer that decreases for each colour when its their turn and when their time is positive
function timer() {
  if((whitePawnOneTurn || whitePromoting) && timeW >= 0){
    timeW --;
  }
  if((blackPawnOneTurn || blackPromoting) && timeB >= 0) {
    timeB --;
  }
}

// Ends the game if either side runs out of time
function gameOver() {
  
  // Gives black the win if white runs out of time 
  if (timeW < 0) {
    fill("blue");
    rect(width/2 - size, height/2 - size, 2*size, size);
    rect(width/2 - size, height/1.7 - size, 2*size, size);
    fill(255,255,0);
    
    // Displays text declaring black as the winner and how to restart
    text("Black wins on time.", width/2- size/1.2, height/2 - size/1.7, size*3, size);
    text("Press R to restart.", width/2- size/1.2, height/1.7 - size/1.7, size*3, size);
    canMoveW = false;
    canMoveB = false;
  }
  
  // Gives white the win if black runs out of time
  if (timeB < 0) {
    fill("blue");
    rect(width/2 - size, height/2 - size, 2*size, size);
    rect(width/2 - size, height/1.7 - size, 2*size, size);
    fill(255,255,0);
    
    // Displays text declaring white as the winner and how to restart
    text("White wins on time", width/2- size/1.2, height/2 - size/1.7, size*3, size);
    text("Press R to restart.", width/2- size/1.2, height/1.7 - size/1.7, size*3, size);
    canMoveW = false;
    canMoveB = false;
  }
  
  // Restarts the experience after time runs out for either side and r is clicked 
  if (keyIsDown(82) && (timeB < 0 || timeW < 0)) {
    whitePawnOneClicked = false;
    blackPawnOneClicked = false;
    whitePawnOneForward = 0;
    blackPawnOneForward = 0;
    whitePawnOneTurn = true;
    firstMove = true;
    blackPawnOneTurn = false;
    canMoveW = false;
    canMoveB = false;
    whiteCircleY = 4.5;
    changePawnW = 0;
    changePawnB = 0;
    changeCircleW = 0;
    changeCircleB = 0;
    blackCircleY= 2.5;
    timeW = 30;
    timeB = 30;
    whitePromoting = false;
    blackPromoting = false;
    whitePromoted = false;
    blackPromoted = false;
  }
}