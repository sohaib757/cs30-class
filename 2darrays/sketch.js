// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theGrid = [];
let cellSize;
let cols;
let rows;

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else if (windowHeight > windowWidth) {
    createCanvas(windowWidth, windowWidth);
  }
  cellSize = width/8
  cols = Math.floor(width/cellSize);
  rows = Math.floor(height/cellSize);
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    theGrid.push([]);
    for (let x = 0; x < cols; x++)
  }
}