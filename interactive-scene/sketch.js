let whitePawnImg;
let blackPawnImg;
let size;
let whitePawnOneClicked = false;
let blackPawnOneClicked = false;
let whitePawnOneForward = 0;
let blackPawnOneForward = 0;
let whitePawnOneTurn = true;
let firstMove = true;
let blackPawnOneTurn = false;
let canMoveW = false;
let canMoveB = false;
let whiteCircleY = 4.5;
let changePawnW = 0;
let changePawnB = 0;
let changeCircleW = 0;
let changeCircleB = 0;
let blackCircleY= 2.5;
let timeW = 60000;
let timeB = 60000;

function preload() {
  whitePawnImg = loadImage("whitepawn.png");
  blackPawnImg = loadImage("blackpawn.png");
}
function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  size = width/8;
}

function draw() {
  background(220);
  showBoard();
  showPawns();
  noStroke();
  movePawns();
  promotion();
  keyPressed();
  showTimer();
  setInterval(timer, 1000);
}

function windowResized() {
  if (windowWidth > windowHeight) {
    resizeCanvas(windowHeight, windowHeight);
  }
  else {
    resizeCanvas(windowWidth, windowWidth);
  }
  size = width/8;
}

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

function showPawns() {
  image(whitePawnImg, size/2 - size, 6 * size - whitePawnOneForward, size * 2, size);
  image(blackPawnImg, size/2, size + blackPawnOneForward, size *2, size);
}

function movePawns() {
  if (whitePawnOneClicked && firstMove) {
    fill("grey");
    circle(size/2, size * whiteCircleY, size/4);
    circle(size/2, size * (whiteCircleY + 1), size/4);
    canMoveW = true;
  }
  if (!whitePawnOneClicked) {
    canMoveW = false;
  }
  else if (whitePawnOneClicked && !firstMove) {
    fill("grey");
    circle(size/2, 6 * size - changePawnW - changeCircleW - size/2, size/4);
    canMoveW = true;
  }
  if (blackPawnOneClicked && firstMove) {
    fill("grey");
    circle(size * 1.5, size * blackCircleY, size/4);
    circle(size * 1.5, size * (blackCircleY + 1), size/4);
    canMoveB = true;
  }
  if (!blackPawnOneClicked) {
    canMoveB = false;
  }
  else if (blackPawnOneClicked && !firstMove) {
    fill("grey");
    circle(size * 1.5, 2 * size + changePawnB + changeCircleB + size/2, size/4);
    canMoveB = true;
  }
}

function mouseClicked() {
  if (whitePawnOneTurn && mouseX < size && mouseY > 6 * size - changePawnW && mouseY < 7 * size - changePawnW) {
    whitePawnOneClicked = true;
  }
  else {
    whitePawnOneClicked = false; 
  }
  if (canMoveW && whitePawnOneTurn && mouseX < size && mouseY < size * 6 - changePawnW && mouseY > size * 5 - changePawnW) {
    whitePawnOneForward += size;
    whitePawnOneTurn = false;
    blackPawnOneTurn = true;
    canMoveW = false;
    canMoveB = true;
    changePawnW += size;
    changeCircleW += 1;
  }
  else if (canMoveW && firstMove && whitePawnOneTurn && mouseX <  size && mouseY < size * 5 - changePawnW && mouseY > size * 4 - changePawnW) {
    whitePawnOneForward += size * 2;
    whitePawnOneTurn = false;
    blackPawnOneTurn = true;
    canMoveB = true;
    canMoveW= false;
    changePawnW += 2 * size;
    changeCircleW += 1;
  }
  if (blackPawnOneTurn && mouseX < 2 * size  && mouseX > size && mouseY > size + changePawnB && mouseY < 2 * size + changePawnB) {
    blackPawnOneClicked = true;
    firstMoveB = true;
  }
  else {
    blackPawnOneClicked = false;
  }
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

function promotion() {
  if (changePawnW === 876) {
    canMoveB = false;
    fill("grey");
    rect(2 * size, 0, size * 3, size);
    if (mouseX <= 3 * size && mouseX >= 2 * size && mouseY <= size) {
      circle(size/2,size/2,50);
    }
  }
}

function keyPressed() {
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

function showTimer() {
  fill("green");
  rect(width-width/15, height/900, width/8, height/30);
  fill("red");
  text(timeW, width-width/20, height/50);
}

function timer() {
  if(whitePawnOneTurn) {
    timeW --;
  }
  if (timeW < 0) {
    
  }
}