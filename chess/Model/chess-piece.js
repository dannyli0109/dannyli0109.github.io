class ChessPiece {
  constructor(owner, sprite, row, col, x, y, w) {
    if (this.constructor === ChessPiece) {
      throw new TypeError('Abstract class "ChessPiece" cannot be instantiated directly.');
    }
    this.row = row
    this.col = col
    this.x = x
    this.y = y
    this.w = w
    this.originalW = 60
    this.scaleFactor = 1.3
    this.state = NORMAL_STATE
    this.owner = owner
    this.sprite = sprite
    this.moved = false
    this.target = false
  }

  draw(cb) {
    if (this.state === SELECTED_STATE) {
      this.w = lerp(this.w, this.originalW * this.scaleFactor, 0.1)
    } else if (this.state === DYING_STATE) {
      this.w = lerp(this.w, 0, 0.1)
    } else {
      this.w = lerp(this.w, this.originalW, 0.1)
    }

    if (this.target) {
      this.state = MOVING_STATE
      // this.target.state = DYING_STATE
      if (this.target.piece) {
        this.target.piece.state = DYING_STATE
      }
      this.x = lerp(this.x, this.target.x, 0.2)
      this.y = lerp(this.y, this.target.y, 0.2)
      // this.w = lerp(this.w, this.originalW, 1)

      if (Math.abs(this.x - this.target.x) < 0.5 &&
        Math.abs(this.y - this.target.y) < 0.5) {
        cb()
      }
    }
    image(this.sprite.image, this.x - (this.w - this.originalW) / 2, this.y - (this.w - this.originalW) / 2, this.w, this.w, this.sprite.offsetX, this.sprite.offsetY, this.sprite.spriteWidth, this.sprite.spriteHeight)
  }

  getType() {
    return this.constructor
  }
  cloneFrom(piece) {
    this.x = piece.x
    this.y = piece.y
    this.w = piece.w
    this.originalW = piece.originalW
    this.scaleFactor = piece.scaleFactor
    this.selected = piece.selected
    this.owner = piece.owner
    this.sprite = piece.sprite
    this.moved = piece.moved
    this.target = piece.target
  }

  getValidMoves() {
    return []
  }

  isEnemy(cell) {
    console.log(cell)
    if (!cell) return false
    if (!cell.piece) return false
    return cell.piece.owner !== this.owner
  }

  validateMoves(moves) {
    let results = []
    moves.forEach(move => {
      if (move) {
        results.push(move)
      }
    })
    return results
  }

  shouldPromote() {
    return false
  }
}