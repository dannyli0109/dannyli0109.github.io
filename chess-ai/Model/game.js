class Game {
  constructor() {
    this.players = []
    this.turnNumber = 1
    this.initBoard()
    this.initPlayers(2)
    this.initSpriteSheet()
    this.initBlackChessPieces()
    this.initWhiteChessPieces()
  }

  initBoard() {
    this.board = new Board()
  }

  initPlayers(numberOfPlayers) {
    for (let i = 0; i < numberOfPlayers; i++) {
      let player = new Player(i)
      this.players.push(player)
    }
  }

  initSpriteSheet() {
    this.spriteSheet = new SpriteSheet(spriteImage, 2, 6)
  }

  initBlackChessPieces() {
    for (let i = 0; i < 8; i++) {
      let pawn = new Pawn(this.players[BLACK], this.spriteSheet.sprites[PAWN_BLACK])
      this.board.cells[1][i].piece = pawn
    }

    for (let i = 0; i < 2; i++) {
      let rook = new Rook(this.players[BLACK], this.spriteSheet.sprites[ROOK_BLACK])
      this.board.cells[0][i * 7].piece = rook

      let knight = new Knight(this.players[BLACK], this.spriteSheet.sprites[KNIGHT_BLACK])
      this.board.cells[0][1 + i * 5].piece = knight

      let bishop = new Bishop(this.players[BLACK], this.spriteSheet.sprites[BISHOP_BLACK])
      this.board.cells[0][2 + i * 3].piece = bishop
    }

    let king = new King(this.players[BLACK], this.spriteSheet.sprites[KING_BLACK])
    this.board.cells[0][3].piece = king
    let queen = new Queen(this.players[BLACK], this.spriteSheet.sprites[QUEEN_BLACK])
    this.board.cells[0][4].piece = queen
  }
  initWhiteChessPieces() {
    for (let i = 0; i < 8; i++) {
      let pawn = new Pawn(this.players[WHITE], this.spriteSheet.sprites[PAWN_WHITE])
      this.board.cells[6][i].piece = pawn
    }

    for (let i = 0; i < 2; i++) {
      let rook = new Rook(this.players[WHITE], this.spriteSheet.sprites[ROOK_WHITE])
      this.board.cells[7][i * 7].piece = rook

      let knight = new Knight(this.players[WHITE], this.spriteSheet.sprites[KNIGHT_WHITE])
      this.board.cells[7][1 + i * 5].piece = knight

      let bishop = new Bishop(this.players[WHITE], this.spriteSheet.sprites[BISHOP_WHITE])
      this.board.cells[7][2 + i * 3].piece = bishop
    }

    let king = new King(this.players[WHITE], this.spriteSheet.sprites[KING_WHITE])
    this.board.cells[7][3].piece = king
    let queen = new Queen(this.players[WHITE], this.spriteSheet.sprites[QUEEN_WHITE])
    this.board.cells[7][4].piece = queen
  }

  getCurrentTurnPlayer() {
    return this.turnNumber % 2
  }

  nextTurn() {
    // console.log(this.check(this.getCurrentTurnPlayer()))
    this.turnNumber++
    let count = 0
    if (this.getCurrentTurnPlayer() === BLACK) {
      let boardPositions = this.board.getValidMoveBoardPositions(BLACK)
      // console.log(boardPositions)
      let boardScore = boardPositions.map(boardPosition => {
        // boardPosition.printBoard() 
        let mm = new MiniMax(boardPosition)
        let boardValue =  mm.getBoardPositions(boardPosition, false, -9999, 9999, 2)
        count += mm.count
        return boardValue
      })
      
      
      // console.log(boardScore)
      
      let max = Math.max(...boardScore)
      let maxIndex = boardScore.indexOf(max)
      let move = board.getAllValidMoves(BLACK)[maxIndex]
      this.board.cells[move.from.row][move.from.col].move(this.board, move.to)
      this.turnNumber++
      
      this.board.printBoard()
    }
    console.log(count)
  }

  checkGameOver() {
    let kingNum = 0
    this.board.cells.forEach(row => {
      row.forEach(cell => {
        if (cell.piece) {
          if (cell.piece instanceof King) {
            kingNum++
          }
        }
      })
    })
    if (kingNum < 2) {
      return true
    }
    return false
  }

  check(player) {
    let check = false
    this.board.cells.forEach(row => {
      row.forEach(cell => {
        if (cell.piece) {
          if (cell.piece.owner.type === player) {
            cell.piece.getValidMoves(this.board, cell.row, cell.col).forEach(move => {
              if (move.piece) {
                if (move.piece.owner.type !== player) {
                  if (move.piece instanceof King) {
                    check = true
                  }
                }
              }
            })
          }
        }
      })
    })
    return check
  }
}