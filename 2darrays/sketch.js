// 2d Array moving/capturing pawns
// Sohaib Hassan
// Nov 12th
//
// Extra for Experts:
// - added constraints on the pawns using constrain() ensuring they remain on the board

// Global variables

// Arrays
let theGrid = [];
let whitePawnArray = [];
let blackPawnArray = [];

// Pawn images
let whitePawnImg;
let blackPawnImg;

// Grid and layout variables
let cellSize;
let cols;
let rows;
let numberOfPawns = 0;

// State variables
let blackTurn = false;
let whiteTurn = true;

// Preloads pawn images before initializing the game
function preload() {
  whitePawnImg = loadImage("whitepawn.png");
  blackPawnImg = loadImage("blackpawn.png");
}

// Creates the canvas depending on the size of the user's screen and defines the grid size
function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else if (windowHeight > windowWidth) {
    createCanvas(windowWidth, windowWidth);
  }
  cellSize = width/8;
  cols = Math.floor(width/cellSize);
  rows = Math.floor(height/cellSize);

  generateGrid();

  // Adds no more than 8 pawns to the board
  for (let x = 0; x < 8; x ++) { 
    pawns();
  }
}

// Resizes the window in accordance to the user's screen size
function windowResized() {
  if (windowWidth > windowHeight) {
    resizeCanvas(windowHeight, windowHeight);
  }
  else {
    resizeCanvas(windowWidth, windowWidth);
  }
  cellSize = width/8;
}

// Calls all the functions needed to run the experience
function draw() {
  displayGrid();
  displayPawns();
  displayPossibleMoves();
}

// Creates the 8x8 chess board grid
function generateGrid() {
  let isWhite = false;
  for (let y = 0; y < rows; y++) {
    theGrid.push([]);
    for (let x = 0; x < cols; x++) {
      theGrid[y].push(x);  
    }
  }
}

// Displays the 8x8 chess board with alternating black and white squares
function displayGrid() {
  let isWhite = false;
  for (let y = 0; y < rows; y++) {
    isWhite = !isWhite;
    for (let x = 0; x < cols; x++) {
      if (isWhite) {
        fill("white");
      }
      else if (!isWhite) {
        fill("black");
      }
      square(x * cellSize, y * cellSize, cellSize);
      isWhite = !isWhite;
    }
  }
}

//Creates each pawn as an object and adds them to their respective arrays
function pawns() {
  let whitePawn = {
    cols: numberOfPawns,
    rows: 6,
    pawnSelected: false,
    canMove: false,
    firstMove: true,
  };
  whitePawnArray.push(whitePawn);
  let blackPawn = {
    cols: numberOfPawns,
    rows: 1,
    pawnSelected: false,
    canMove: false,
    firstMove: true,
  };
  blackPawnArray.push(blackPawn);
  numberOfPawns +=1;
}

// Displays each pawn in their respective positions
function displayPawns() {
  for (let whitePawn of whitePawnArray) {
    image(whitePawnImg, whitePawn.cols * cellSize - cellSize/2, whitePawn.rows * cellSize, cellSize * 2, cellSize);
  }
  for (let blackPawn of blackPawnArray) {
    image(blackPawnImg, blackPawn.cols * cellSize - cellSize/2, blackPawn.rows * cellSize, cellSize * 2, cellSize);
  }
}

// Controls mouse clicks for selecting and moving pawns
function mouseClicked() {
  x = Math.floor(mouseX/cellSize);
  y = Math.floor(mouseY/cellSize);
  
  clickPawns(x,y);
  movePawns(x,y);
}

// Selects pawns that were clicked
function clickPawns(x,y) {
  for (let whitePawn of whitePawnArray){
    if (x === whitePawn.cols && y === whitePawn.rows){
      whitePawn.pawnSelected = true;
    }
    else {
      whitePawn.pawnSelected = false;
    }
  }
  for (let blackPawn of blackPawnArray){
    if (x === blackPawn.cols && y === blackPawn.rows){
      blackPawn.pawnSelected = true;
    }
    else {
      blackPawn.pawnSelected = false;
    }
  }
}

// Controls the movement of pawns
function movePawns(x,y) {
  for (let whitePawn of whitePawnArray) {
    for (let blackPawn of blackPawnArray) {
      // Checks if white pawn can move 2 squares forward only on first move
      if(whitePawn.firstMove && whitePawn.canMove && x === whitePawn.cols && y === whitePawn.rows - 2 && checkSquare(whitePawn.cols, whitePawn.rows - 1) === "empty" && checkSquare(whitePawn.cols, whitePawn.rows - 2) === "empty") {
        whitePawn.rows -= 2;
        whitePawn.rows = constrain(whitePawn.rows, 0, 7);
        whiteTurn = false;
        blackTurn = true;
        whitePawn.firstMove = false;
      }
      // Checks if white pawn can move one square forward
      else if (whitePawn.canMove && x === whitePawn.cols && y === whitePawn.rows - 1 && checkSquare(whitePawn.cols, whitePawn.rows - 1) === "empty") {
        whitePawn.rows -= 1;
        whitePawn.rows = constrain(whitePawn.rows, 0, 7);
        whiteTurn = false;
        blackTurn = true;
        whitePawn.firstMove = false;
      }
      // Checks if white pawn can capture a black pawn
      else if (whitePawn.canMove && (x === whitePawn.cols + 1 || x === whitePawn.cols - 1) && y === whitePawn.rows - 1 && checkSquare(x, whitePawn.rows - 1) === "black"){
        whitePawn.cols = x;
        whitePawn.cols = constrain(whitePawn.cols, 0, 7);
        whitePawn.rows -= 1;
        whitePawn.rows = constrain(whitePawn.rows, 0, 7);
        whiteTurn = false;
        blackTurn = true;
        whitePawn.firstMove = false;
        for (let i = 0; i < blackPawnArray.length; i++) {
          if (blackPawnArray[i].cols === x && blackPawnArray[i].rows === y) {
          blackPawnArray.splice(i,1);
          }
        }
      }
      // Checks if black pawn can move 2 squares forward only on first move
      if (blackPawn.firstMove && blackPawn.canMove && x === blackPawn.cols && y === blackPawn.rows + 2 && checkSquare(blackPawn.cols, blackPawn.rows + 1) === "empty" && checkSquare(blackPawn.cols, blackPawn.rows + 2) === "empty") {
        blackPawn.rows += 2;
        blackPawn.rows = constrain(blackPawn.rows, 0, 7);
        blackTurn = false;
        whiteTurn = true;
        blackPawn.firstMove = false;
      }
      // Checks if black pawn can move one square forward
      else if (blackPawn.canMove && x === blackPawn.cols && y === blackPawn.rows + 1 && checkSquare(blackPawn.cols, blackPawn.rows + 1) === "empty") {
        blackPawn.rows += 1;
        blackPawn.rows = constrain(blackPawn.rows, 0, 7);
        blackTurn = false;
        whiteTurn = true;
        blackPawn.firstMove = false;
      }
    }
  }
}

// Checks whether or not squares are empty or occupied by a pawn and if so which colour
function checkSquare(x,y) {
  for (let row = 0; row < rows; row ++) {
    for (let col = 0; col < cols ; col ++) {
      theGrid[row][col] = "empty";
    }
  }
  for (let whitePawn of whitePawnArray) {
    theGrid[whitePawn.rows][whitePawn.cols] = "white";
  }
  for (let blackPawn of blackPawnArray) {
    theGrid[blackPawn.rows][blackPawn.cols] = "black";
  }
  return theGrid[y][x];
}

// Displays the potential moves for each pawn as grey circles
function displayPossibleMoves() {
  noStroke();
  fill("grey");
  for (let whitePawn of whitePawnArray) {
    for (let blackPawn of blackPawnArray) {
      // Displays three circles when white pawn can move forward twice and capture left (first move)
      if (whiteTurn && whitePawn.pawnSelected && whitePawn.firstMove && checkSquare(whitePawn.cols - 1, whitePawn.rows - 1) === "black" && checkSquare(whitePawn.cols, whitePawn.rows - 1) === "empty" && checkSquare(whitePawn.cols, whitePawn.rows - 2)) {
        circle(whitePawn.cols * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, cellSize/4);
        circle(whitePawn.cols * cellSize + cellSize/2, (whitePawn.rows - 1) * cellSize - cellSize/2, cellSize/4);
        circle((whitePawn.cols - 1) * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, cellSize/4);
        whitePawn.canMove = true;
      }
      // Displays three circles when white pawn can move forward twice and capture right (first move)
      else if (whiteTurn && whitePawn.pawnSelected && whitePawn.firstMove && checkSquare(whitePawn.cols + 1, whitePawn.rows - 1) === "black" && checkSquare(whitePawn.cols, whitePawn.rows - 1) === "empty" && checkSquare(whitePawn.cols, whitePawn.rows - 2)) {
        circle(whitePawn.cols * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, cellSize/4);
        circle(whitePawn.cols * cellSize + cellSize/2, (whitePawn.rows - 1) * cellSize - cellSize/2, cellSize/4);
        circle((whitePawn.cols + 1) * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, cellSize/4);
        whitePawn.canMove = true;
      }
      // Displays two circles when white pawn can both move forward and capture left
       else if (whiteTurn && whitePawn.pawnSelected && checkSquare(whitePawn.cols - 1, whitePawn.rows - 1) === "black" && checkSquare(whitePawn.cols, whitePawn.rows - 1) === "empty") {
        circle(whitePawn.cols * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, cellSize/4);
        circle((whitePawn.cols - 1) * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, cellSize/4);
        whitePawn.canMove = true;
      }
       // Displays two circles when white pawn can both move forward and capture right
       else if (whiteTurn && whitePawn.pawnSelected && checkSquare(whitePawn.cols + 1, whitePawn.rows - 1) === "black" && checkSquare(whitePawn.cols, whitePawn.rows - 1) === "empty") {
        circle(whitePawn.cols * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, cellSize/4);
        circle((whitePawn.cols + 1) * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, cellSize/4);
        whitePawn.canMove = true;
      }
      // Displays one circle when white pawn can capture left
      else if (whiteTurn && whitePawn.pawnSelected && checkSquare(whitePawn.cols - 1, whitePawn.rows - 1) === "black") {
        circle((whitePawn.cols - 1) * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, cellSize/4);
        whitePawn.canMove = true;
      }
       // Displays one circle when white pawn can capture right
      else if (whiteTurn && whitePawn.pawnSelected && checkSquare(whitePawn.cols + 1, whitePawn.rows - 1) === "black") {
        circle((whitePawn.cols + 1) * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, cellSize/4);
        whitePawn.canMove = true;
      }
      // Displays two circles for white pawn when allowed (first move)
      else if (whiteTurn && whitePawn.pawnSelected && whitePawn.firstMove && checkSquare(whitePawn.cols, whitePawn.rows - 1) === "empty" && checkSquare(whitePawn.cols, whitePawn.rows - 2) === "empty") {
        circle(whitePawn.cols * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, cellSize/4);
        circle(whitePawn.cols * cellSize + cellSize/2, (whitePawn.rows - 1) * cellSize - cellSize/2, cellSize/4);
        whitePawn.canMove = true;
      }
      // Displays one circle for white pawn when allowed
      else if (whiteTurn && whitePawn.pawnSelected && checkSquare(whitePawn.cols, whitePawn.rows - 1) === "empty") {
        circle(whitePawn.cols * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, cellSize/4);
        whitePawn.canMove = true;
      }
      else {
        whitePawn.canMove = false;
      }
      // Displays two circles for black pawn when allowed (first move)
      if (blackTurn && blackPawn.pawnSelected && blackPawn.firstMove && checkSquare(blackPawn.cols, blackPawn.rows + 1) === "empty" && checkSquare(blackPawn.cols, blackPawn.rows + 2) === "empty") {
        circle(blackPawn.cols * cellSize + cellSize/2, (blackPawn.rows + 2) * cellSize - cellSize/2, cellSize/4);
        circle(blackPawn.cols * cellSize + cellSize/2, (blackPawn.rows + 3) * cellSize - cellSize/2, cellSize/4);
        blackPawn.canMove = true;
      }
      // Displays one circle for white pawn when allowed
      else if (blackTurn && blackPawn.pawnSelected && checkSquare(blackPawn.cols, blackPawn.rows + 1) === "empty") {
        circle(blackPawn.cols * cellSize + cellSize/2, (blackPawn.rows + 2) * cellSize - cellSize/2, cellSize/4);
        blackPawn.canMove = true;
      }
      else {
        blackPawn.canMove = false;
      }
    }
  }
}