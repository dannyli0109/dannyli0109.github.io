class Rook extends ChessPiece {
  constructor(owner, sprite) {
    super(owner, sprite)
    this.short = "R"
    this.boardScore = this.owner.type === WHITE ? -50 : 50
    let evaluation = [
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
      [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
      [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
      [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
      [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
      [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
      [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0]
    ]
    this.evaluation = this.owner.type === WHITE ? evaluation : reverseArray(evaluation)
  }

  getValidMoves(board, row, col) {
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
  //   return Rook
  // }
}