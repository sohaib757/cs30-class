// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theGrid = [];
let whitePawnArray = [];
let cellSize;
let cols;
let rows;
let numberOfPawns = 0;

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
  };
  whitePawnArray.push(whitePawn);
  numberOfPawns +=1;
}

function displayPawns() {
  for (let whitePawn of whitePawnArray) {
    fill("green");
    circle(whitePawn.cols * cellSize + cellSize/2, whitePawn.rows * cellSize + cellSize/2, cellSize/2);
  } 
}

function mouseClicked() {
  for (let whitePawn of whitePawnArray) {
    if (mouseX > whitePawn.cols * cellSize && mouseX < (whitePawn.cols + 1)* cellSize && mouseY < (whitePawn.rows + 1) * cellSize && mouseY > whitePawn.rows * cellSize) {
      fill("red");
      circle(whitePawn.cols * cellSize + cellSize/2, (whitePawn.rows - 1) * cellSize + cellSize/2,50);
    }
  }
}
