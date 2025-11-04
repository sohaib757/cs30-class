// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theGrid = [];
let whitePawnArray = [];
let blackPawnArray = [];
let whitePawnImg;
let blackPawnImg;
let cellSize;
let cols;
let rows;
let numberOfPawns = 0;
let blackTurn = false;
let whiteTurn = true;

function preload() {
  whitePawnImg = loadImage("whitepawn.png");
  blackPawnImg = loadImage("blackpawn.png");
}

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

  for (let x = 0; x < 8; x ++) { 
    pawns();
  }
}

function windowResized() {
  if (windowWidth > windowHeight) {
    resizeCanvas(windowHeight, windowHeight);
  }
  else {
    resizeCanvas(windowWidth, windowWidth);
  }
  cellSize = width/8;
}

function draw() {
  background(220);
  generateGrid();
  displayGrid();
  displayPawns();
  movePawns();
}

function generateGrid() {
  let isWhite = false;
  for (let y = 0; y < rows; y++) {
    theGrid.push([]);
    for (let x = 0; x < cols; x++) {
      theGrid[y].push(x);  
    }
  }
}

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

function pawns() {
  let whitePawn = {
    cols: numberOfPawns,
    rows: 6,
    pawnSelected: false,
    canMove: false,
  };
  whitePawnArray.push(whitePawn);
  let blackPawn = {
    cols: numberOfPawns,
    rows: 1,
    pawnSelected: false,
    canMove: false,
  };
  blackPawnArray.push(blackPawn);
  numberOfPawns +=1;
}

function displayPawns() {
  for (let whitePawn of whitePawnArray) {
    fill("green");
    image(whitePawnImg, whitePawn.cols * cellSize - cellSize/2, whitePawn.rows * cellSize, cellSize*2, cellSize);
  } 
  for (let blackPawn of blackPawnArray) {
    fill("green");
    image(blackPawnImg, blackPawn.cols * cellSize - cellSize/2, blackPawn.rows * cellSize, cellSize*2, cellSize);
  } 
}

function mouseClicked() {
  for (let whitePawn of whitePawnArray) {
    if (whiteTurn && mouseX > whitePawn.cols * cellSize && mouseX < (whitePawn.cols + 1)* cellSize && mouseY < (whitePawn.rows + 1) * cellSize && mouseY > whitePawn.rows * cellSize) {
      whitePawn.pawnSelected = true;
    }
    else {
      whitePawn.pawnSelected = false;
    }
    if (whiteTurn && whitePawn.canMove && mouseX > whitePawn.cols * cellSize && mouseX < (whitePawn.cols + 1) * cellSize && mouseY < whitePawn.rows * cellSize && mouseY > ( whitePawn.rows - 1)* cellSize) {
      whitePawn.rows -= 1;
      whitePawn.canMove = false;
      blackTurn = true;
      whiteTurn = false;
    }
  }
  for (let blackPawn of blackPawnArray) {
    if (blackTurn && mouseX > blackPawn.cols * cellSize && mouseX < (blackPawn.cols + 1)* cellSize && mouseY < (blackPawn.rows + 1) * cellSize && mouseY > blackPawn.rows * cellSize) {
      blackPawn.pawnSelected = true;
    }
    else {
      blackPawn.pawnSelected = false;
    }
    if (blackTurn && blackPawn.canMove && mouseX > blackPawn.cols * cellSize && mouseX < (blackPawn.cols + 1) * cellSize && mouseY < (blackPawn.rows + 2)* cellSize && mouseY > (blackPawn.rows + 1) * cellSize) {
      blackPawn.rows += 1;
      blackPawn.canMove = false;
      whiteTurn = true;
      blackTurn = false;
    }
  }
}

function movePawns() {
  for (let whitePawn of whitePawnArray) {
    if (whitePawn.pawnSelected) {
      fill("red");
      circle(whitePawn.cols * cellSize + cellSize/2, (whitePawn.rows - 1) * cellSize + cellSize/2,50);
      whitePawn.canMove = true;
    }
    else {
      whitePawn.canMove = false;
    }
  }
  for (let blackPawn of blackPawnArray) {
    if (blackPawn.pawnSelected) {
      fill("red");
      circle(blackPawn.cols * cellSize + cellSize/2, (blackPawn.rows + 1) * cellSize + cellSize/2,50);
      blackPawn.canMove = true;
    }
    else {
      blackPawn.canMove = false;
    }
  }
  for (let whitePawn of whitePawnArray) {
    for (let blackPawn of blackPawnArray) {
      if (whitePawn.cols === blackPawn.cols && whitePawn.rows - 1 === blackPawn.rows) {
        whitePawn.canMove = false;
      }
      if (blackPawn.cols === whitePawn.cols && blackPawn.rows + 1 === whitePawn.rows) {
        blackPawn.canMove = false;
      }
    }
  }
}
