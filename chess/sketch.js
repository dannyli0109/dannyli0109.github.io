let spriteImage
let spriteSheet
let game

function preload() {
  game = new Game()
  game.loadSprite()
}


function setup() {
  let canvas = createCanvas(481, 481)
  let canvasContainer = document.querySelector('.canvas-container')
  canvas.parent(canvasContainer)
  game.initGame()
  ellipseMode(CORNER)
  // rectMode(CENTER)
}

function draw() {
  background(220);
  game.draw()
}


function mouseClicked() {
  game.mouseClicked()
}