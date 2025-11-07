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

  generateGrid();

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
  displayGrid();
  displayPawns();
  displayPossibleMoves();
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

function displayPawns() {
  for (let whitePawn of whitePawnArray) {
    image(whitePawnImg, whitePawn.cols * cellSize - cellSize/2, whitePawn.rows * cellSize, cellSize * 2, cellSize);
  }
  for (let blackPawn of blackPawnArray) {
    image(blackPawnImg, blackPawn.cols * cellSize - cellSize/2, blackPawn.rows * cellSize, cellSize * 2, cellSize);
  }
}

function mouseClicked() {
  x = Math.floor(mouseX/cellSize);
  y = Math.floor(mouseY/cellSize);
  
  clickPawns(x,y);
  movePawns(x,y);
}

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

function movePawns(x,y) {
  for (let whitePawn of whitePawnArray) {
    for (let blackPawn of blackPawnArray) {
      if(whitePawn.firstMove && whitePawn.canMove && x === whitePawn.cols && y === whitePawn.rows - 2 && whitePawn.cols === blackPawn.cols && whitePawn.rows - 2 !== blackPawn.rows) {
        whitePawn.rows -= 2;
        whiteTurn = false;
        blackTurn = true;
        whitePawn.firstMove = false;
      }
      else if (whitePawn.canMove && x === whitePawn.cols && y === whitePawn.rows - 1 && whitePawn.cols === blackPawn.cols && whitePawn.rows - 1 !== blackPawn.rows) {
        whitePawn.rows -= 1;
        whiteTurn = false;
        blackTurn = true;
        whitePawn.firstMove = false;
      }
      if(blackPawn.firstMove && blackPawn.canMove && x === blackPawn.cols && y === blackPawn.rows + 2 && whitePawn.cols === blackPawn.cols && blackPawn.rows + 2 !== whitePawn.rows) {
        blackPawn.rows += 2;
        blackTurn = false;
        whiteTurn = true;
        blackPawn.firstMove = false;
      }
      else if (blackPawn.canMove && x === blackPawn.cols && y === blackPawn.rows + 1 && whitePawn.cols === blackPawn.cols && blackPawn.rows + 1 !== whitePawn.rows) {
        blackPawn.rows += 1;
        blackTurn = false;
        whiteTurn = true;
        blackPawn.firstMove = false;
      }
    }
  }
}

function displayPossibleMoves() {
  for (let whitePawn of whitePawnArray) {
    for (let blackPawn of blackPawnArray) {
      if (whiteTurn && whitePawn.pawnSelected && whitePawn.firstMove) {
        noStroke();
        fill("grey");
        circle(whitePawn.cols * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, cellSize/4);
        circle(whitePawn.cols * cellSize + cellSize/2, (whitePawn.rows - 1) * cellSize - cellSize/2, cellSize/4);
        whitePawn.canMove = true;
      }
      else if (whiteTurn && whitePawn.pawnSelected) {
        noStroke();
        fill("grey");
        circle(whitePawn.cols * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, cellSize/4);
        whitePawn.canMove = true;
      }
      else {
        whitePawn.canMove = false;
      }
      if (blackTurn && blackPawn.pawnSelected && blackPawn.firstMove) {
        noStroke();
        fill("grey");
        circle(blackPawn.cols * cellSize + cellSize/2, (blackPawn.rows + 2) * cellSize - cellSize/2, cellSize/4);
        circle(blackPawn.cols * cellSize + cellSize/2, (blackPawn.rows + 3) * cellSize - cellSize/2, cellSize/4);
        blackPawn.canMove = true;
      }
      else if (blackTurn && blackPawn.pawnSelected) {
        noStroke();
        fill("grey");
        circle(blackPawn.cols * cellSize + cellSize/2, (blackPawn.rows + 2) * cellSize - cellSize/2, cellSize/4);
        blackPawn.canMove = true;
      }
      else {
        blackPawn.canMove = false;
      }
    }
  }
}