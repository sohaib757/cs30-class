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
    circleShow: true,
    canCaptureRight: false,
    canCaptureLeft: false,
  };
  whitePawnArray.push(whitePawn);
  let blackPawn = {
    cols: numberOfPawns,
    rows: 1,
    pawnSelected: false,
    canMove: false,
    circleShow: true,
    canCaptureRight: false,
    canCaptureLeft: false,
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
}

function movePawns(x,y) {
  for (let whitePawn of whitePawnArray) {
    if (whitePawn.canMove && x === whitePawn.cols && y === whitePawn.rows - 1) {
      whitePawn.rows -= 1;
      whiteTurn = false;
    }
  }
}

function displayPossibleMoves() {
  for (let whitePawn of whitePawnArray) {
    if (whiteTurn && whitePawn.pawnSelected) {
      noStroke();
      fill("grey");
      circle(whitePawn.cols * cellSize + cellSize/2, whitePawn.rows * cellSize - cellSize/2, 50);
      whitePawn.canMove = true;
    }
    else {
      whitePawn.canMove = false;
    }
  }
}