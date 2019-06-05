class Game {
  constructor() {
    this.cellWidth = 60
    this.board = false
    this.spritePath = 'Images/chess-pieces.png'
    this.spriteImage = false
    this.spriteSheet = false
    this.players = [BLACK, WHITE]
    this.tempCells = false
    this.currentPlayer = WHITE

  }

  loadSprite() {
    this.spriteImage = loadImage(this.spritePath)
  }

  initGame() {
    this.initBoard(this.cellWidth)
    this.initSpriteSheet()
    this.initChessPieces()
  }


  initBoard(cellWidth) {
    this.board = new Board(cellWidth)
  }

  initSpriteSheet() {
    this.spriteSheet = new SpriteSheet(this.spriteImage, 2, 6)
  }

  initChessPieces() {
    let cell
    this.players.forEach(player => {
      for (let i = 0; i < 8; i++) {
        cell = this.board.cells[6 - player * 5][i]
        let pawn = new Pawn(player, this.spriteSheet.sprites[5 + 6 * player], cell.row, cell.col, cell.x, cell.y, cell.w)
        cell.piece = pawn
      }

      for (let i = 0; i < 2; i++) {
        cell = this.board.cells[player * 7][i * 7]
        let rook = new Rook(this.players[player], this.spriteSheet.sprites[10 - 6 * player], cell.row, cell.col, cell.x, cell.y, cell.w)
        cell.piece = rook

        cell = this.board.cells[player * 7][1 + i * 5]
        let knight = new Knight(this.players[player], this.spriteSheet.sprites[9 - 6 * player], cell.row, cell.col, cell.x, cell.y, cell.w)
        cell.piece = knight

        cell = this.board.cells[player * 7][2 + i * 3]
        let bishop = new Bishop(this.players[player], this.spriteSheet.sprites[8 - 6 * player], cell.row, cell.col, cell.x, cell.y, cell.w)
        cell.piece = bishop
      }

      cell = this.board.cells[player * 7][4]
      let king = new King(this.players[player], this.spriteSheet.sprites[6 - 6 * player], cell.row, cell.col, cell.x, cell.y, cell.w)
      cell.piece = king

      cell = this.board.cells[player * 7][3]
      let queen = new Queen(this.players[player], this.spriteSheet.sprites[7 - 6 * player], cell.row, cell.col, cell.x, cell.y, cell.w)
      cell.piece = queen
    })
  }

  draw() {
    this.board.draw(cb => {
      this.currentPlayer = (this.currentPlayer+1) % 2
    })
    let promotingPiece = this.board.promoting()
    if (promotingPiece) {
      this.applyOverlay()
      this.createTempCellUI(promotingPiece)
      this.tempCells.forEach(tempCell => {
        tempCell.draw()
        if (tempCell.piece) tempCell.piece.draw()
      })
    }
  }

  mouseClicked() {
    this.board.mouseClicked(this.currentPlayer)
  }

  applyOverlay() {
    fill(255, 255, 255, 80)
    noStroke()
    rect(0, 0, width, height)
  }

  createTempCellUI(piece) {
    if (this.tempCells) return
    this.tempCells = []
    let cell = this.board.cells[piece.row][piece.col]

    let pieces = []

    let queen = new Queen(piece.owner, this.spriteSheet.sprites[7 - 6 * piece.owner], cell.row, cell.col, cell.x, cell.y, cell.w)
    let rook = new Rook(piece.owner, this.spriteSheet.sprites[10 - 6 * piece.owner], cell.row, cell.col, cell.x, cell.y, cell.w)
    let knight = new Knight(piece.owner, this.spriteSheet.sprites[9 - 6 * piece.owner], cell.row, cell.col, cell.x, cell.y, cell.w)
    let bishop = new Bishop(piece.owner, this.spriteSheet.sprites[8 - 6 * piece.owner], cell.row, cell.col, cell.x, cell.y, cell.w)
    
    pieces.push(queen)
    pieces.push(rook)
    pieces.push(knight)
    pieces.push(bishop)

    for (let i = 0; i < 4; i++) {
      let row = Math.abs(cell.row - i)
      let tempCell = new TempCell(row, cell.col, cell.w)
      pieces[i].row = tempCell.row
      pieces[i].col = tempCell.col
      pieces[i].x = tempCell.x
      pieces[i].y = tempCell.y
      pieces[i].w = tempCell.w
      tempCell.piece = pieces[i]
      this.tempCells.push(tempCell)
      
    }
  }
}