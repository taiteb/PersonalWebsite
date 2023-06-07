// Defining color items
let colorIndex = 0;
let targetColor;
let currentColor;
let colors = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

// Creating array of line objects
let lineSet = [];
let linesLength;

function setup() {
  let box = document.querySelector('#p5');
  let width = box.clientWidth;
  let height = box.offsetHeight;
  let myCanvas = createCanvas(width, 125);
  myCanvas.parent("p5");
  // createCanvas(200, 200)
  // Filling color list
  for (let i = 0; i < colors.length; i++) {
    colors[i][0] = random(90);
    colors[i][1] = random(90, 255);
    colors[i][2] = random(100, 255);
  }

  targetColor = color(colors[colorIndex][0],
    colors[colorIndex][1], colors[colorIndex][2]);
  currentColor = targetColor;

  // Filling array with objects 
  linesLength = width;
  for (let i = 0; i < linesLength; i += 14) {
    lineSet.push(new straightLine(i, windowHeight, i, 0, 13, i));
  }
}

function draw() {
  currentColor = lerpColor(currentColor, targetColor, 0.01);
  // background(currentColor);

  // Drawing lines to canvas
  for (let i = 0; i < lineSet.length; i++) {
    let l = lineSet[i];
    l.show();
    l.colorUpdate();
  }

  // Updating current and projected color values
  if (frameCount % 25 === 0) {
    colorIndex = (colorIndex + 1) % colors.length;
    targetColor = color(colors[colorIndex][0],
      colors[colorIndex][1], colors[colorIndex][2]);
  }
  // Resetting color values every 150 frames 
  if (frameCount % 150 === 0) {
    for (let i = 0; i < colors.length; i++) {
      colors[i][0] = random(90);
      colors[i][1] = random(90, 255);
      colors[i][2] = random(100, 255);
    }
  }
}

function windowResized() {
  let box = document.querySelector('#p5');
  let width = box.clientWidth;
  let myCanvas = createCanvas(width, 125);
  myCanvas.parent("p5");

  linesLength = width;
  for (let i = 0; i < linesLength; i += 14) {
    lineSet.push(new straightLine(i, windowHeight, i, 0, 13, i));
  }
}

// Creating line class
class straightLine {
  constructor(x1, y1, x2, y2, w, cI) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.w = w;
    this.cI = cI;
  }

  objectTarget = currentColor;
  objectCurrent = targetColor;

  show() {
    // this.cI = currentColor;
    stroke(this.objectCurrent);
    strokeWeight(this.w);
    fill(this.objectCurrent);
    line(this.x1, this.y1, this.x2, this.y2);
  }

  // this is what allows each line to be a separate color. the set palette is randomly reset every 150 frames, but within that, every 25 frames each line shifts to the next color from the set
  // cI (color index) is passed in on creation from the same i integer. from there, each line shifts to the next color sequentially
  colorUpdate() {
    this.objectCurrent = lerpColor(this.objectCurrent, this.objectTarget, 0.009);
    if (frameCount % 25 === 0) {
      this.cI = (this.cI + 1) % colors.length;
      this.objectTarget = color(colors[this.cI][0],
        colors[this.cI][1], colors[this.cI][2]);
    }
  }
}