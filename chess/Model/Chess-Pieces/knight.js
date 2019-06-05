class Knight extends ChessPiece {
  constructor(owner, sprite,row, col, x, y, w) {
    super(owner, sprite, row, col,x, y, w)
    this.short = "N"
  }
  
    getValidMoves(board) {
    let moves = []
    let rowsOffsets = [-2, -1, 1, 2]

    rowsOffsets.forEach(rowOffset => {
      for (let i = 0; i < 2; i++) {
        let colOffset = (-2 * i + 1) * (3 - Math.abs(rowOffset))
        let targetRow = this.row + rowOffset
        let targetCol = this.col + colOffset
        if (board.isEmpty(targetRow, targetCol) || board.isEnemy(this, targetRow, targetCol))
          moves.push(board.cells[targetRow][targetCol])
      }
    })
    return moves
  }
}