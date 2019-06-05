class Board {
  constructor(w) {
    this.rows = 8
    this.cols = 8
    this.cells = []
    this.w = w

    this.initCells()
  }

  initCells() {
    for (let i = 0; i < this.rows; i++) {
      let row = []
      for (let j = 0; j < this.cols; j++) {
        row.push(new Cell(i, j, this.w))
      }
      this.cells.push(row)
    }
  }

  draw(cb) {

    let selected = this.getSelectedPiece()
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        cell.draw()
      }
    }

    if (selected) {
      let validMoves = selected.getValidMoves(this)
      validMoves.forEach(validMove => {
        validMove.valid = true
      })
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        if (cell.piece) {
          if (cell.piece !== selected) {
            cell.piece.draw()
          }
        }
      }
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        if (cell.piece) {
          if (cell.piece === selected) {
            cell.piece.draw(() => {
              let chessType = cell.piece.getType()
              let piece = new chessType(cell.piece.owner, cell.piece.sprite, cell.piece.target.row, cell.piece.target.col, cell.piece.x, cell.piece.y, cell.piece.w)
              piece.moved = true
              cell.piece.target.piece = piece
              cell.piece = false
              // piece.state = SELECTED_STATE
              this.resetClickState()

              // console.log(piece.shouldPromote())
              
              if (piece.shouldPromote()) {
                 piece.state = PROMOTE_STATE 
              }
              
              cb()

            })
          }
        }
      }
    }
  }

  mouseClicked(currentPlayer) {
    if (this.promoting()) return
    if (this.getTargetPiece()) return
    let selected = this.getSelectedPiece()
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        if (!selected) {
          cell.selectPiece(currentPlayer)
        } else {
          cell.targetPiece(selected)
        }
      }
    }
    selected = this.getSelectedPiece()
    if (!selected) {
      this.resetClickState()
    }
  }

  resetClickState() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        cell.selected = false
        cell.valid = false
      }
    }
  }

  getSelectedPiece() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        if (cell.piece) {
          if (cell.piece.state === SELECTED_STATE || cell.piece.state === MOVING_STATE) return cell.piece
        }
      }
    }
    return false
  }

  getTargetPiece() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        if (cell.piece) {
          if (cell.piece.target) return cell.piece.target
        }
      }
    }
    return false
  }

  isEmpty(row, col) {
    if (!this.isValidCoordinate(row, col)) return false
    return !this.cells[row][col].piece
  }

  isEnemy(piece, targetRow, targetCol) {
    if (!this.isValidCoordinate(targetRow, targetCol)) return false
    if (!this.cells[targetRow][targetCol].piece) return false
    if (targetRow === piece.row && targetCol === piece.col) return false
    return this.cells[targetRow][targetCol].piece.owner !== piece.owner
  }

  isValidCoordinate(row, col) {
    return row >= 0 && row <= 7 && col >= 0 && col <= 7
  }

  promoting() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j]
        if (cell.piece) {
          if (cell.piece.state === PROMOTE_STATE) return cell.piece
        }
      }
    }
    return false
  }
}