class Rook extends ChessPiece {
  constructor(owner, sprite, row, col, x, y, w) {
    super(owner, sprite, row, col, x, y, w)
    this.short = "R"
  }

  getValidMoves(board) {
    let moves = []
    let directions = [{
        // up
        rowOffset: -1,
        colOffset: 0
      },
      {
        // down
        rowOffset: 1,
        colOffset: 0
      },
      {
        // left
        rowOffset: 0,
        colOffset: -1
      },
      {
        //right
        rowOffset: 0,
        colOffset: 1
      }
    ]

    directions.forEach(({
      rowOffset,
      colOffset
    }) => {
      for (let i = 0; i < 8; i++) {
        let targetRow = this.row + i * rowOffset
        let targetCol = this.col + i * colOffset
        if (!board.isValidCoordinate(targetRow, targetCol) || (this.row === targetRow && this.col === targetCol)) {
          continue
        }
        if (board.isEmpty(targetRow, targetCol)) {
          moves.push(board.cells[targetRow][targetCol])
        } else {
          if (board.isEnemy(this, targetRow, targetCol)) {
            moves.push(board.cells[targetRow][targetCol])
            
          } 
          break
        }
      }
    })
    return moves
  }
}