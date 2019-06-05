class Bishop extends ChessPiece {
  constructor(owner, sprite) {
    super(owner, sprite)
    this.short = "B"
    this.boardScore = this.owner.type === WHITE ? -30 : 30
    let evaluation = [
      [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
      [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
      [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
      [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
      [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
      [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
      [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
      [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
    ]

    this.evaluation = this.owner.type === WHITE ? evaluation : reverseArray(evaluation)
  }

  getValidMoves(board, row, col) {
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
        let targetRow = row + i * rowOffset
        let targetCol = col + i * colOffset
        if (!this.validateBoardPosition(targetRow, targetCol) || (row === targetRow && col === targetCol)) {
          continue
        }
        if (this.validateEmpty(board, targetRow, targetCol)) {
          moves.push(board.cells[targetRow][targetCol])
        } else {
          if (this.validateEnemy(board, targetRow, targetCol)) {
            moves.push(board.cells[targetRow][targetCol])
          }
          break
        }
      }
    })
    return moves
  }

  // getType() {
  //   return Bishop
  // }
}