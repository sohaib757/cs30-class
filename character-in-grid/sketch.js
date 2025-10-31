// Rect neighbours 2d array demo

const CELL_SIZE = 50;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 9;
let grid;
let cols;
let rows;
let thePlayer = {
  x: 0,
  y: 0,
};

function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);

  //add player to grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background("blue");
  displayGrid();
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols,rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  else if (key === "e") {
    grid = generateEmptyGrid(cols,rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  else if (key === "w") {
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  else if (key === "s") {
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  else if (key === "a") {
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
  else if (key === "d") {
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === OPEN_TILE) {
        fill("white");
      }
      else if (grid[y][x] === IMPASSIBLE) {
        fill("green");
      }
      else if (grid[y][x] === PLAYER) {
        fill("red");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(OPEN_TILE);
      }
      else {
        newGrid[y].push(IMPASSIBLE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid() {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}

function mousePressed() {
  x = Math.floor(mouseX/CELL_SIZE);
  y = Math.floor(mouseY/CELL_SIZE);

  toggleCell(x, y);
}

function toggleCell(x,y) {
  if(x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSIBLE;
    }
    else if (grid[y][x] === IMPASSIBLE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function movePlayer(x , y) {
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] !== IMPASSIBLE) {
    //previous position
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;
  
    //moving the player
    thePlayer.x = x;
    thePlayer.y = y;
  
    //put player on grid
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  
    //reset old spot
    grid[oldY][oldX] = OPEN_TILE;
  }
}