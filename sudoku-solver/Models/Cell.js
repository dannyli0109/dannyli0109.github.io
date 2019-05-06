class Cell extends Box {
  constructor(row, col, x, y, w) {
    super(x, y, w, w)
    this.row = row
    this.col = col
    this.selected = false
    this.number = 0
    this.index = this.row * 9 + this.col
    this.possibleValues = Array.from(new Array(9), (x, i) => i + 1)
    this.possibleCols = Array.from(new Array(9), (x, i) => i + 1)
    this.possibleRows = Array.from(new Array(9), (x, i) => i + 1)
    this.possibleBoxes = Array.from(new Array(9), (x, i) => i + 1)
    this.untryValues = Array.from(new Array(9), (x, i) => i + 1)
    this.fixed = false

  }

  draw() {
    stroke(0)

    if (this.collide()) {
      fill(0, 0, 0, 50)
    } else {
      fill(255)
    }

    if (this.selected) {
      fill(255, 0, 0)
    }

    noStroke()
    if (this.fixed) {
      fill(255)
    }
    rect(this.x, this.y, this.w, this.w)

    this.checkNumber()

    if (this.number) {
      strokeWeight(0.5)
      textSize(20)
      if (this.fixed) {
        fill(0)
      } else {
        fill(0, 0, 255)
      }
      textAlign(CENTER, CENTER)
      text(this.number, this.x + this.w / 2, this.y + this.w / 2)
    }
  }

  checkNumber() {
    if (this.fixed) return
    if (this.selected) {
      for (let i = 49; i < 58; i++) {
        if (keyIsDown(i)) {
          this.number = i - 48
        }
      }
      if (keyIsDown(46) || keyIsDown(8)) {
        this.number = 0
      }
    }
  }

  updatePossibleValues(board) {
    let possibleRows = Array.from(new Array(9), (x, i) => i + 1)
    let possibleCols = Array.from(new Array(9), (x, i) => i + 1)
    let possibleBoxes = Array.from(new Array(9), (x, i) => i + 1)
    for (let i = 0; i < 9; i++) {
      let currentColNumber = board.cells[this.row][i].number
      if (currentColNumber) {
        possibleCols.splice(possibleCols.indexOf(currentColNumber), 1)
      }

      let currentRowNumber = board.cells[i][this.col].number
      if (currentRowNumber) {
        possibleRows.splice(possibleRows.indexOf(currentRowNumber), 1)
      }
    }

    let boxStartingRow = Math.floor(this.row / 3) * 3
    let boxStartingCol = Math.floor(this.col / 3) * 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let currentBoxNumber = board.cells[boxStartingRow + i][boxStartingCol + j].number
        if (currentBoxNumber) {
          possibleBoxes.splice(possibleBoxes.indexOf(currentBoxNumber), 1)
        }
      }
    }

    const getAvaliableSubset = (colSubset, rowSubset, boxSubset, untrySubset) => {
      let s1 = []
      let s2 = []
      let s3 = []
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

      s2.forEach(r => {
        if (untrySubset.indexOf(r) > -1) {
          s3.push(r)
        }
      })

      return s3
    }

    this.possibleValues = getAvaliableSubset(possibleCols, possibleRows, possibleBoxes, this.untryValues)
  }

  getNextAvaliableIndex() {
    let index = this.possibleValues.indexOf(this.number)
    if (this.number === 0 && this.possibleValues.length > 0) return 0
    if (index === this.possibleValues.length - 1) return -1
    // if (this.possibleValues.length === 1) return 0
    for (let i = 0; i < this.possibleValues.length; i++) {
      if (this.number < this.possibleValues[i]) return i
    }
    return this.possibleValues.indexOf(this.number) + 1
  }
}