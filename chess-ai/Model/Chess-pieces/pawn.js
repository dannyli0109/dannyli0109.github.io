class Pawn extends ChessPiece {
  constructor(owner, sprite) {
    super(owner, sprite)
    this.short = "P"
    this.boardScore = this.owner.type === WHITE ? -10 : 10
    let evaluation = [
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
      [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
      [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
      [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
      [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
      [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
    ]

    this.evaluation = this.owner.type === WHITE ? evaluation : reverseArray(evaluation)
  }


  getValidMoves(board, row, col) {
    let moves = []
    let direction = (-2 * this.owner.type + 1)
    for (let i = -1; i < 2; i++) {
      let targetRow = row + direction
      let targetRowDouble = row + direction * 2
      let targetCol = col + i
      if (i === 0) {
        if (this.validateEmpty(board, targetRow, col + i)) {
          moves.push(board.cells[targetRow][targetCol])
        }
        if (!this.moved) {
          if (this.validateEmpty(board, targetRowDouble, targetCol)) {
            if (this.validateEmpty(board, targetRow, targetCol)) {
              moves.push(board.cells[targetRowDouble][targetCol])
            }
          }
        }
      } else {
        if (this.validateEnemy(board, targetRow, targetCol))
          moves.push(board.cells[targetRow][targetCol])
      }
    }
    return moves

  }


  // getType() {
  //  return Pawn 
  // }
}