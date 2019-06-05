class Knight extends ChessPiece {
  constructor(owner, sprite) {
    super(owner, sprite)
    this.short = "N"
    this.boardScore =  this.owner.type === WHITE? -30 : 30
    let evaluation = [
      [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
      [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
      [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
      [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
      [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
      [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
      [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
      [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ]

    this.evaluation = this.owner.type === WHITE ? evaluation : reverseArray(evaluation)
  }

  getValidMoves(board, row, col) {
    let moves = []
    let rowsOffsets = [-2, -1, 1, 2]

    rowsOffsets.forEach(rowOffset => {
      for (let i = 0; i < 2; i++) {
        let colOffset = (-2 * i + 1) * (3 - Math.abs(rowOffset))
        let targetRow = row + rowOffset
        let targetCol = col + colOffset
        if (this.validateEmpty(board, targetRow, targetCol) || this.validateEnemy(board, targetRow, targetCol))
          moves.push(board.cells[targetRow][targetCol])
      }
    })
    return moves
  }

  // getType() {
  //   return Knight
  // }
}