class Board {
  constructor() {
    this.rows = 8
    this.cols = 8
    this.cells = []
    this.w = 60

    for (let i = 0; i < this.rows; i++) {
      let row = []
      for (let j = 0; j < this.cols; j++) {
        row.push(new Cell(i, j, j * this.w, i * this.w, this.w))
      }
      this.cells.push(row)
    }
  }

  draw() {
    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.draw()
      })
    })
  }

  resetSelections() {
    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.selected = false
        cell.isValidMove = false
      })
    })
  }

  clearBoard() {
    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.piece = false
      })
    })
  }

  cloneFrom(board) {
    this.clearBoard()
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let piece = board.cells[i][j].piece
        if (piece) {
          let piece = board.cells[i][j].piece
          let chessType = piece.getType()
          let clonePiece = new chessType(piece.owner, piece.spriteSheet)
          // clonePiece.cloneProperties(piece)
          this.cells[i][j].piece = clonePiece
          // console.log(clonePiece)
          // console.log(board.cells[i][j].piece.getType())
        }
        // this.cells[i][j].piece = board[i][j].piece
      }
    }
  }

  printBoard() {
    console.log("========================")
    for (let i = 0; i < this.rows; i++) {
      let row = ''
      for (let j = 0; j < this.cols; j++) {
        let piece = this.cells[i][j].piece
        if (piece) {
          row += "[" + piece.short + "]"
        } else {
          row += "[ ]"
        }
      }
      console.log(row)
    }
    console.log("========================")
    console.log()
  }

  getBoardScore() {
    let score = 0
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let piece = this.cells[i][j].piece
        if (piece) {
          // if (piece.owner.type === player) {
            score += (piece.boardScore + piece.evaluation[i][j])
          // } else {
            // score = (score - piece.boardScore) + piece.evaluation[i][j]
          // }
        }
      }
    }
    return score
  }

  getAllValidMoves(player) {
    let validMoves = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let piece = this.cells[i][j].piece
        if (piece) {
          if (piece.owner.type === player) {
            let pieceMoves = piece.getValidMoves(this, i, j)
            pieceMoves.forEach(pieceMove => {
              validMoves.push({
                from: this.cells[i][j],
                to: pieceMove
              })
            })
            // validMoves.push(...piece.getValidMoves(this, i, j))
          }
        }
      }
    }
    return validMoves
  }

  getValidMoveBoardPositions(player) {
    let boardPositions = []
    let validMoves = this.getAllValidMoves(player)
    validMoves.forEach(validMove => {
      let board = new Board()
      board.cloneFrom(this)
      board.cells[validMove.from.row][validMove.from.col].move(board,validMove.to)
      boardPositions.push(board)
    })
    return boardPositions
  }
}