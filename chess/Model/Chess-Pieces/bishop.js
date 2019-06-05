class Bishop extends ChessPiece {
  constructor(owner, sprite, row, col, x, y, w) {
    super(owner, sprite, row, col, x, y, w)
    this.short = "B"
  }

  getValidMoves(board) {
    let moves = []
    let directions = [{
        // top-left
        rowOffset: -1,
        colOffset: -1
      },
      {
        // top-right
        rowOffset: -1,
        colOffset: 1
      },
      {
        // bottom-left
        rowOffset: 1,
        colOffset: -1
      },
      {
        // bottom-right
        rowOffset: 1,
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