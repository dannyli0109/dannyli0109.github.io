class Pawn extends ChessPiece {
  constructor(owner, sprite, row, col, x, y, w) {
    super(owner, sprite, row, col, x, y, w)
    this.short = "P"
  }

  getValidMoves(board) {
    let moves = []
    let direction = this.owner * 2 - 1
    for (let i = -1; i < 2; i++) {
      let targetRow = this.row + direction
      let targetRowDouble = this.row + direction * 2
      let targetCol = this.col + i
      if (i === 0) {
        if (board.isEmpty(targetRow, targetCol)) {
              moves.push(board.cells[targetRow][targetCol])
        }

        if (!this.moved) {
          if (board.isEmpty(targetRowDouble, targetCol)) {
            if (board.isEmpty(targetRow, targetCol)) {
              moves.push(board.cells[targetRowDouble][targetCol])
            }
          }
        }
      } else {
        if (board.isEnemy(this, targetRow, targetCol))
          moves.push(board.cells[targetRow][targetCol])
      }
    }
    return moves
  }
  
  shouldPromote() {
    return this.row === this.owner * 7
  }
}