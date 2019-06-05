class ChessPiece {
  constructor(owner, sprite) {
    if (this.constructor === ChessPiece) {
      throw new TypeError('Abstract class "ChessPiece" cannot be instantiated directly.');
    }
    this.owner = owner
    this.sprite = sprite
    this.moved = false
  }

  move(board, fromRow, fromCol, toRow, toCol) {
    if (!this.isValidMove(board, fromRow, fromCol, toRow, toCol)) {
      console.log("invalid")
      return false
    }

    board.cells[toRow][toCol].piece = board.cells[fromRow][fromCol].piece
    board.cells[fromRow][fromCol].piece = false
    this.moved = true
    board.cells[toRow][toCol].target = false
    board.cells[toRow][toCol].cb = false
    return true
  }
  
  setTarget(board, fromRow, fromCol, toRow, toCol, cb) {
    if (!this.isValidMove(board, fromRow, fromCol, toRow, toCol)) {
      console.log("invalid")
      return false
    }
    board.cells[fromRow][fromCol].target = board.cells[toRow][toCol]
    board.cells[fromRow][fromCol].cb = cb
    return true
  }
  
  
  movable(board, fromRow, fromCol, toRow, toCol) {
    if (!this.isValidMove(board, fromRow, fromCol, toRow, toCol)) {
      console.log("invalid")
      return false
    }

    // board.cells[toRow][toCol].piece = board.cells[fromRow][fromCol].piece
    // board.cells[fromRow][fromCol].piece = false
    // this.moved = true
    return true
  }

  validateEmpty(board, row, col) {
    if (!this.validateBoardPosition(row, col)) return false
    return !board.cells[row][col].piece
  }

  validateEnemy(board, row, col) {
    if (!this.validateBoardPosition(row, col)) return false
    if (!board.cells[row][col].piece) {
      return false
    }
    return board.cells[row][col].piece.owner.type !== this.owner.type

  }

  validateBoardPosition(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8
  }

  getValidMoves(board, row, col) {
    return []
  }

  isValidMove(board, fromRow, fromCol, toRow, toCol) {
    let validMoves = this.getValidMoves(board, fromRow, fromCol)
    return validMoves.some(move => {
      return move.row === toRow && move.col === toCol
    })
  }
  
  getType() {
    return this.constructor
  }
  
  cloneProperties(piece) {
    this.owner = piece.owner
    this.sprite = piece.sprite
    this.moved = piece.moved
  }
}