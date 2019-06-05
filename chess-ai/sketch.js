let board
let spriteImage
let spriteSheet
let game



function preload() {
  spriteImage = loadImage('images/chess-pieces.png')

}

function setup() {
  let canvas = createCanvas(481, 481);
  let canvasContainer = document.querySelector('.canvas-container')
  canvas.parent(canvasContainer)
  game = new Game()
  board = game.board
}

function draw() {
  background(220);
  board.draw()
}


function mouseClicked() {
  if (game.getCurrentTurnPlayer() === BLACK) return
  const showValidMoves = clickedOn => {
    let validMoves = clickedOn.piece.getValidMoves(board, clickedOn.row, clickedOn.col)
    validMoves.forEach(cell => {
      cell.isValidMove = true
    })
  }



  if (game.checkGameOver()) return
  let selected = false
  let clickedOn = false
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let cell = board.cells[i][j]
      if (cell.selected) {
        selected = cell
      }

      if (cell.collide()) {
        clickedOn = cell
      }
    }
  }

  if (selected) {
    if (clickedOn) {
      if (clickedOn.piece) {
        if (selected.piece.owner.type === clickedOn.piece.owner.type) {
          // reselect piece
          board.resetSelections()
          clickedOn.selected = true
          showValidMoves(clickedOn)
          return
        }
      }
    }
    //     if (selected.setTarget(board, clickedOn)) {

    //       // game.nextTurn()
    //     }

    // selected.setTarget(board, clickedOn, () => {
    if (selected.move(board, clickedOn)) {
      game.nextTurn()
      board.resetSelections()

    } else {
      selected.target = false
      // selected.cb = false
      board.resetSelections()
    }
    // })
    board.resetSelections()
  } else {
    if (clickedOn.piece) {
      if (clickedOn.piece.owner.type !== game.turnNumber % 2) {
        board.resetSelections()
        return
      }
      clickedOn.selected = true
      showValidMoves(clickedOn)
    } else {
      board.resetSelections()
    }
  }
}