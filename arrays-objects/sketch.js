// Objects and Arrays
// Sohaib Hassan
// October 26, 2025
//
// Extra for Experts:
// - added sound effects and ambience

// Pawn arrays
let whitePawnsArray = [];
let blackPawnsArray = [];

// Global Variables 

// Chess piece images
let whitePawnImg;
let blackPawnImg;
let whiteQueenImg;
let blackQueenImg;

// Size of each square on the board depending on screen size
let size;

// State variables
let whitePawnTurn = true;
let firstMove = true;
let blackPawnTurn = false;

// Set the number of pawns to equal zero
let numberOfPawnsW = 0;
let numberOfPawnsB = 0;

// Time for both colours in seconds
let timeW = 30;
let timeB = 30;

// Preloads the images of the chess pieces before initializing the game
function preload() {
  whitePawnImg = loadImage("whitepawn.png");
  blackPawnImg = loadImage("blackpawn.png");
  whiteQueenImg = loadImage("whitequeen.jpg");
  blackQueenImg = loadImage("blackqueen.png");
  pawnMoved = createAudio("move-self.mp3");
  ambience = createAudio("ambient-noise.mp3");
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

  // Adds no more than 8 pawns to the board
  for (let x = 0; x < 8; x ++) {
  addPawns();
  }

  // Sets the volume of background ambience
  ambience.volume(0.2);
}

// Calls the functions needed for the experience to run
function draw() {
  background(220);
  showBoard();
  showPawns();
  noStroke();
  movePawns();
  promotion();
  boardColour();
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

// Creates each pawn as an object and pushes them to their respective arrays
function addPawns() {
  let whitePawn = {
    x: numberOfPawnsW * size - size/2,
    y: size*6,
    changePawnW: 0,
    changeCircleW: 0,
    whiteCircleY: 4.5,
    whitePawnForward: 0,
    whitePawnClicked: false,
    canMoveW: false,
    firstMove: true,
    whitePromoting: false,
    whitePromoted: false,
  };
  whitePawnsArray.push(whitePawn);
  numberOfPawnsW ++;

let blackPawn = {
    x: numberOfPawnsB * size - size/2,
    y: size,
    changePawnB: 0,
    changeCircleB: 0,
    blackCircleY: 2.5,
    blackPawnForward: 0,
    blackPawnClicked: false,
    canMoveB: false,
    firstMove: true,
    blackPromoting: false,
    blackPromoted: false,
  };
  blackPawnsArray.push(blackPawn);
  numberOfPawnsB ++;
}

// Displays the pawn images in their respective positions
function showPawns() {
  for (let whitePawn of whitePawnsArray) {
    image(whitePawnImg, whitePawn.x, whitePawn.y - whitePawn.whitePawnForward, size * 2, size);   
  }
  for (let blackPawn of blackPawnsArray) {
    image(blackPawnImg, blackPawn.x, blackPawn.y + blackPawn.blackPawnForward, size *2, size);
  }
}

// Controls whether or not pawns can be moved and the positions of the circles
function movePawns() {
  
  // Check if white pawn is in first move to determine how many squares it can move
  for (let whitePawn of whitePawnsArray) {
    if (whitePawn.whitePawnClicked && whitePawn.firstMove) {
      fill("grey");
      circle(whitePawn.x + size, size * whitePawn.whiteCircleY, size/4);
      circle(whitePawn.x + size, size * (whitePawn.whiteCircleY + 1), size/4);
      whitePawn.canMoveW = true;
    }
    
    // Make sure white pawn can only move when clicked
    if (!whitePawn.whitePawnClicked) {
      whitePawn.canMoveW = false;
    }
    
    // White pawn can only move 1 square after first move
    else if (whitePawn.whitePawnClicked && !whitePawn.firstMove) {
      fill("grey");
      circle(whitePawn.x + size, 6 * size - whitePawn.changePawnW - whitePawn.changeCircleW - size/2, size/4);
      whitePawn.canMoveW = true;
    }
  }
    // Check if black pawn is in first move to determine how many squares it can move
  for (let blackPawn of blackPawnsArray) {
    if (blackPawn.blackPawnClicked && blackPawn.firstMove) {
      fill("grey");
      circle(blackPawn.x + size, size * blackPawn.blackCircleY, size/4);
      circle(blackPawn.x + size, size * (blackPawn.blackCircleY + 1), size/4);
      blackPawn.canMoveB = true;
    }
    
    // Make sure black pawn can only move when clicked
    if (!blackPawn.blackPawnClicked) {
      blackPawn.canMoveB = false;
    }
    
    // Black pawn can only move 1 square after first move
    else if (blackPawn.blackPawnClicked && !blackPawn.firstMove) {
      fill("grey");
      circle(blackPawn.x + size, 2 * size + blackPawn.changePawnB + blackPawn.changeCircleB + size/2, size/4);
      blackPawn.canMoveB = true;
    }
  }
}

// Controls the movement of the pawns based on mouse position and states
function mouseClicked() {

  // Loops the background ambience after the mouse is clicked
  ambience.loop();
  
  // Allows white pawn to move only when it is white turn and when the mouse is on the pawn
  for (let whitePawn of whitePawnsArray) {
    if (whitePawnTurn && mouseX < whitePawn.x + 1.5 *size && mouseX > whitePawn.x + size/2 && mouseY > whitePawn.y - whitePawn.changePawnW && mouseY < whitePawn.y + size - whitePawn.changePawnW) {
      whitePawn.whitePawnClicked = true;
    }
    else {
      whitePawn.whitePawnClicked = false; 
    }
    
    // White pawn move 1 square forward
    if (whitePawn.canMoveW && whitePawnTurn && mouseX < whitePawn.x + 1.5 * size && mouseX > whitePawn.x + size/2 && mouseY < whitePawn.y - whitePawn.changePawnW && mouseY > whitePawn.y - size - whitePawn.changePawnW) {
      whitePawn.whitePawnForward += size;
      whitePawnTurn = false;
      blackPawnTurn = true;
      whitePawn.changePawnW += size;
      whitePawn.changeCircleW += 1;
      whitePawn.firstMove = false;
      pawnMoved.play();
    }
    
    // White pawn move 2 squares forward only when it's the first move
    else if (whitePawn.canMoveW && whitePawn.firstMove && whitePawnTurn && mouseX > whitePawn.x + size/2 && mouseX < whitePawn.x + 1.5 * size && mouseY < whitePawn.y - whitePawn.changePawnW * 2 && mouseY > whitePawn.y - 2 * size) {
      whitePawn.whitePawnForward += size * 2;
      whitePawnTurn = false;
      blackPawnTurn = true;
      whitePawn.changePawnW += 2 * size;
      whitePawn.changeCircleW += 1;
      whitePawn.firstMove = false;
      pawnMoved.play();
    }
  }
    
  // Allows black pawn to move only when it is black turn and when the mouse is on the pawn
  for (let blackPawn of blackPawnsArray) {
    if (blackPawnTurn && mouseX < blackPawn.x + 1.5 * size  && mouseX > blackPawn.x  + size/2 && mouseY > blackPawn.y + blackPawn.changePawnB && mouseY < blackPawn.y + blackPawn.changePawnB + size) {
      blackPawn.blackPawnClicked = true;
    }
    else {
      blackPawn.blackPawnClicked = false;
    }
    
    // Black pawn move 1 square forward
    if (blackPawn.canMoveB && blackPawnTurn && mouseX < blackPawn.x + 1.5 * size  && mouseX > blackPawn.x + size/2 && mouseY < blackPawn.y + blackPawn.changePawnB + 2 * size && mouseY > blackPawn.y + blackPawn.changePawnB + size) {
      blackPawn.blackPawnForward += size;
      blackPawnTurn = false;
      blackPawn.firstMove = false;
      whitePawnTurn = true;
      blackPawn.changePawnB += size;
      blackPawn.changeCircleB += 1;
      pawnMoved.play();
    }
     
    // Black pawn move 2 squares forward only when it's the first move
    else if (blackPawn.canMoveB && blackPawn.firstMove && blackPawnTurn && mouseX < blackPawn.x + 1.5 * size && mouseX > blackPawn.x + size/2 && mouseY < blackPawn.y + blackPawn.changePawnB + size * 3 && mouseY > blackPawn.y + blackPawn.changePawnB + size * 2) {
      blackPawn.blackPawnForward += size * 2;
      blackPawnTurn = false;
      blackPawn.firstMove = false;
      whitePawnTurn = true;
      blackPawn.changePawnB += 2 * size;
      blackPawn.changeCircleB += 1;
      pawnMoved.play();
    }
  }
}

// Promotes from pawn to queen when applicable
function promotion() {
  // White Pawn Promotion
  for (let whitePawn of whitePawnsArray) {
    if (whitePawn.changePawnW === 6 * size && !whitePawn.whitePromoted && !whitePawn.whitePromoting) {
      whitePawn.whitePromoting = true;
      whitePawn.canMoveW = false;
    }
  
    if (whitePawn.whitePromoting) {
      // Display message for white promotion
      fill("grey");
      rect(width/2 - size, height/2 - size, 2*size, size);
      fill("red");
      text("Press 'p' for queen.", width/2 - size/1.2, height/2 - size/1.7, size*3, size);
      blackPawnTurn = false;
      
      // Promote when p is pressed
      if (keyIsDown(80)) {  
        whitePawn.whitePromoting = false;
        whitePawn.whitePromoted = true;   
        whitePawnTurn = false;
        blackPawnTurn = true;
        pawnMoved.play();
      }
    }

    // Promote from pawn to queen by changing image
    if (whitePawn.whitePromoted) {
      image(whiteQueenImg, whitePawn.x + size/2, whitePawn.y - whitePawn.changePawnW, size, size);
    }
  }

  for (let blackPawn of blackPawnsArray) {
    // Black Pawn Promotion 
    if (blackPawn.changePawnB === 6 * size && !blackPawn.blackPromoted && !blackPawn.blackPromoting) {
      blackPawn.blackPromoting = true;    
      blackPawn.canMoveB = false;
    }
  
    if (blackPawn.blackPromoting) {
      // Display message for black promotion
      fill("grey");
      rect(width/2 - size, height/2 - size, 2*size, size);
      fill("red");
      text("Press 'u' for queen.", width/2 - size/1.2, height/2 - size/1.7, size*3, size);
      whitePawnTurn = false;
      
      // Promote when u is pressed
      if (keyIsDown(85)) { 
        blackPawn.blackPromoting = false;
        blackPawn.blackPromoted = true; 
        whitePawnTurn = true;
        blackPawnTurn = false;
        pawnMoved.play();
      }
    }
    // Promote from pawn to queen by changing image
    if (blackPawn.blackPromoted) {
      image(blackQueenImg, blackPawn.x + size/2, blackPawn.y + blackPawn.changePawnB, size, size);
    }
  }
}

// Can be used to change the colour of the chess board
function boardColour() {
  
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
  for (let whitePawn of whitePawnsArray) {
    if(whitePawnTurn && timeW >= 0){
      timeW -= 1/numberOfPawnsW;
    }
    if (whitePawn.whitePromoting && timeW >= 0) {
      timeW --;
    }
  }
  for (let blackPawn of blackPawnsArray) {
    if(blackPawnTurn && timeB >= 0) {
      timeB -= 1/numberOfPawnsB;
    }
    if (blackPawn.blackPromoting && timeW >= 0) {
      timeB --;
    }
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

    //Prevents any pawns from moving after the time ends
    whitePawnTurn = false;
    blackPawnTurn = false;
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

    //Prevents any pawns from moving after the time ends
    whitePawnTurn = false;
    blackPawnTurn = false;
  }
  
  // Restarts the experience after time runs out for either side and r is clicked 
  if (keyIsDown(82) && (timeB < 0 || timeW < 0)) {
    for (let whitePawn of whitePawnsArray) {
      whitePawn.whitePawnClicked = false;
      whitePawn.whitePawnForward = 0;
      whitePawnTurn = true;
      whitePawn.firstMove = true;
      whitePawn.whiteCircleY = 4.5;
      whitePawn.changePawnW = 0;
      whitePawn.changeCircleW = 0;
      timeW = 30;
      whitePawn.whitePromoting = false;
      whitePawn.whitePromoted = false;
    }
    for (let blackPawn of blackPawnsArray) {
      blackPawn.blackPawnClicked = false;
      blackPawn.blackPawnForward = 0;
      blackPawn.firstMove = true;
      blackPawnTurn = false;
      blackPawn.changePawnB = 0;
      blackPawn.changeCircleB = 0;
      blackPawn.blackCircleY= 2.5;
      timeB = 30;
      blackPawn.blackPromoting = false;
      blackPawn.blackPromoted = false;
    }
  }
}