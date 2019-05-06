class Board {
  constructor(cols, rows, w) {
    this.cols = cols
    this.rows = rows
    this.w = w
    this.cells = []
  }

  init() {
    for (let i = 0; i < this.rows; i++) {
      let row = []
      for (let j = 0; j < this.cols; j++) {
        let cell = new Cell(i, j, j * this.w, i * this.w, this.w)
        row.push(cell)
      }
      this.cells.push(row)
    }
  }

  width() {
    return this.cols * this.w
  }

  height() {
    return this.rows * this.w
  }

  draw() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        // strokeWeight(1)
        stroke(0)

        if (cell.row % 3 === 0 && cell.row !== 0) {
          strokeWeight(3)

        } else {
          strokeWeight(0.5)
        }
        line(cell.x, cell.y, cell.x + cell.w, cell.y)

        if (cell.col % 3 === 0 && cell.col !== 0) {
          strokeWeight(5)

        } else {
          strokeWeight(0.5)
        }

        line(cell.x, cell.y, cell.x, cell.y + cell.w)
      }
    }
  }

  generateCells() {
    let array = Array.from(new Array(9), (x, index) => index + 1)
    let possibleCols = Array.from(new Array(9), (x, index) => [...array])
    let possibleRows = Array.from(new Array(9), (x, index) => [...array])
    let possibleBoxes = Array.from(new Array(9), (x, index) => [...array])
    let shouldRegenerate = false

    // let possibleValues = Array.from(new Array(9), (x, index) => [...array])

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        const getAvaliableSubset = (colSubset, rowSubset, boxSubset) => {
          let s1 = []
          let s2 = []
          colSubset.forEach(r => {
            if (rowSubset.indexOf(r) > -1) {
              s1.push(r)
            }
          })

          s1.forEach(r => {
            if (boxSubset.indexOf(r) > -1) {
              s2.push(r)
            }
          })

          return s2
        }

        let colSubset = possibleCols[i]
        let rowSubset = possibleRows[j]
        let boxSubset = possibleBoxes[Math.floor(j / 3) + Math.floor(i / 3) * 3]

        let avaliableSubset = getAvaliableSubset(colSubset, rowSubset, boxSubset)

        if (avaliableSubset.length === 0) {
          shouldRegenerate = true
        }
        let randomValue = pickRandom(avaliableSubset)
        if (colSubset.indexOf(randomValue) > -1) {
          colSubset.splice(colSubset.indexOf(randomValue), 1)
        }
        rowSubset.splice(rowSubset.indexOf(randomValue), 1)
        boxSubset.splice(boxSubset.indexOf(randomValue), 1)
        cell.number = randomValue
      }
    }
    if (shouldRegenerate) {
      this.generateCells()
    }
  }

  removeNumbers(num) {
    for (let i = 0; i < num; i++) {
      let randI = Math.floor(Math.random() * 9)
      let randJ = Math.floor(Math.random() * 9)

      while (!this.cells[randI][randJ].number) {
        randI = Math.floor(Math.random() * 9)
        randJ = Math.floor(Math.random() * 9)
      }

      this.cells[randI][randJ].number = 0
      this.cells[randI][randJ].fixed = false
    }
  }

  getNotFixedCells() {
    let notFixed = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        if (!cell.fixed) {
          notFixed.push(cell)
        }
      }
    }
    return notFixed
  }

  updatePossibleValues() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        cell.updatePossibleValues(this)
      }
    }
  }


  allFilled() {
    let result = true
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        if (!cell.number) result = false
      }
    }
    return result
  }

  printBoard() {
    for (let i = 0; i < this.rows; i++) {
      let line = ''
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        // if (!cell.number) result = false
        // console.log('[' + cell.number || ' ' + ']')
        line += '[' + ((cell.number && !cell.fixed) || ' ') + ']'
      }
      console.log(line)
    }
    console.log("===========================")
  }

  clearBoard() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        // if (!cell.number) result = false
        // console.log('[' + cell.number || ' ' + ']')
        // if (!cell.fixed && cell.number) {
        //   cell.number = 0
        // }
        cell.number = 0
        cell.fixed = false
      }
    }
  }

  enterBoard(board) {
    board.forEach((cell, index) => {
      let i = Math.floor(index / 9)
      let j = index % 9
      this.cells[i][j].number = cell
      this.cells[i][j].fixed = cell === 0 ? false : true
    })
  }

  fixCurrentState() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        if (cell.number) {
          cell.fixed = true
        }
      }
    }
  }
}