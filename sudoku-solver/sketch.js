let board
// let cell
let solveButton
let solver
let solving = false

let clearButton

function setup() {
  let rows = 9
  let cols = 9
  let cellWidth = 50
  let canvasWidth = cellWidth * cols + 1
  let canvasHeight = cellWidth * rows + 1
  let canvas = createCanvas(canvasWidth, canvasHeight);

  canvas.class('block')

  let title = createP('Sudoku solver');
  title.class('text block')


  let buttonGroup = createDiv()
  buttonGroup.class('block')

  solveButton = createButton('solve');
  solveButton.class('pure-button inline-block margin-right')
  solveButton.mousePressed(solveSudoku)

  clearButton = createButton('clear')
  clearButton.class('pure-button inline-block')

  solveButton.parent(buttonGroup)
  clearButton.parent(buttonGroup)
  clearButton.mousePressed(clearBoard)


  // solveButton.position(canvasWidth, canvasHeight)

  let canvasContainer = document.querySelector('.canvas-container')
  title.parent(canvasContainer)
  canvas.parent(canvasContainer)
  buttonGroup.parent(canvasContainer)

  board = new Board(rows, cols, cellWidth)
  board.init()


  // console.log(board.cells)
  // board.generateCells()
  // store board state
  // board.removeNumbers(50)
  // board.enterBoard([
  //   0, 0, 1, 0, 6, 0, 0, 5, 9,
  //   0, 0, 0, 0, 0, 3, 0, 2, 0,
  //   0, 6, 0, 0, 8, 0, 0, 0, 0,
  //   4, 0, 0, 0, 0, 0, 5, 0, 0,
  //   0, 2, 0, 0, 0, 0, 0, 0, 0,
  //   0, 7, 0, 2, 0, 0, 4, 8, 0,
  //   8, 0, 0, 0, 0, 0, 9, 0, 5,
  //   7, 0, 0, 6, 0, 9, 0, 3, 0,
  //   0, 0, 5, 0, 0, 0, 0, 4, 0
  // ])

  // cells = board.getNotFixedCells()
  // frameRate(10)
  // solveSudoku()


}

function draw() {
  background(220)

  board.cells.forEach(row => {
    row.forEach(col => {
      col.draw()
    })
  })
  board.draw()
  if (solving) {
    solveButton.attribute('disabled', '');

    for (let i = 0; i < 20; i++) {
      solver.next()
    }
    if (solver.solved) {
      solving = false
    }
  } else {
    solveButton.removeAttribute('disabled');
  }

}

function mouseClicked() {
  board.cells.forEach(row => {
    row.forEach(cell => {

      if (cell.collide()) {
        cell.selected = true
      } else {
        cell.selected = false
      }
    })
  })
}


// let backtrack = []

// const solveSudoku = () => {

// const dfs = () => {
//   if (cells.length == 0 || board.allFilled()) {
//     return
//   }
//   let current = cells.shift()
//   board.updatePossibleValues()
//   let nextIndex = current.getNextAvaliableIndex()
//   if (nextIndex > -1) {
//     if (current.number < current.possibleValues[nextIndex]) {
//       current.number = current.possibleValues[nextIndex]
//       backtrack.push(current)
//       return
//     }
//   }
//   cells.unshift(current)
//   current.number = 0
//   board.updatePossibleValues()
//   let bt = backtrack.pop()
//   cells.unshift(bt)
// }

const solveSudoku = () => {
  // console.log(board)
  board.fixCurrentState()
  solver = new Solver(board)
  solving = true
}

const clearBoard = () => {
  solving = false
  board.clearBoard()
}