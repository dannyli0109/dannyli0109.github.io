class MiniMax {
  constructor(board) {
    this.board = board
    this.boardPositions = []
    this.boardValue = []
    this.move = false
    this.count = 0
    // return this.getBoardPositions(this.board, false, depth)
  }

  getBoardPositions(board, isMaximisePlayer, alpha, beta, depth) {
    this.count++
    let value
    if (depth === 0) return board.getBoardScore()
    let validMoves = []
    if (isMaximisePlayer) {
      validMoves = board.getAllValidMoves(BLACK)
    } else {
      validMoves = board.getAllValidMoves(WHITE)
    }

    if (isMaximisePlayer) {
      value = -9999
      for (let i = 0; i < validMoves.length; i++) {
        let newBoard = this.generateNewBoard(board)
        newBoard.cells[validMoves[i].from.row][validMoves[i].from.col].move(newBoard, validMoves[i].to)
        this.boardPositions.push(newBoard)
        // if (isMaximisePlayer) {
        value = Math.max(value, this.getBoardPositions(newBoard, false, alpha, beta, depth - 1))
        alpha = Math.max(value, alpha)
        if (alpha >= beta) break
      }
    } else {
      value = 9999
      for (let i = 0; i < validMoves.length; i++) {
        let newBoard = this.generateNewBoard(board)
        newBoard.cells[validMoves[i].from.row][validMoves[i].from.col].move(newBoard, validMoves[i].to)
        this.boardPositions.push(newBoard)

        value = Math.min(value, this.getBoardPositions(newBoard, true, alpha, beta, depth - 1))
        beta = Math.min(value, beta)
        if (alpha >= beta) break
      }
    }
    return value
  }

  generateNewBoard(board) {
    let newBoard = new Board()
    newBoard.cloneFrom(board)
    return newBoard
  }
}