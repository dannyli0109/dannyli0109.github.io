class Cell extends Box {
  constructor(row, col, x, y, w) {
    super(x, y, w, w)
    this.row = row
    this.col = col
    this.piece = false
    this.selected = false
    this.isValidMove = false
    this.target = false
    this.cb = false
  }

  draw() {

    if ((this.row * 7 + this.col) % 2 === 0) {
      fill(255)
    } else {
      fill(200)
    }
    noStroke()
    // fill(255)


    if (this.isValidMove) {
      // fill(0,0,255)
      fill('#3CAEA3')
    }

    if (this.collide()) fill('#F6D55C')
    if (this.selected) {
      fill('#ED553B')
    }
    rect(this.x, this.y, this.w, this.w)

    if (this.piece) {
      
      if (this.target) {
          this.x = lerp(this.x, this.target.x, 0.05)
          this.y = lerp(this.y, this.target.y, 0.05)
        
        // console.log(this.x, this.y, this.piece)
          // console.log(this.y, this.target.y)
          if (Math.abs(this.x - this.target.x) < 0.01  && Math.abs(this.y - this.target.y) < 0.01) {
            this.cb()
          }
      }
      // console.log(this.piece)
      // console.log(this.piece)
      if (this.piece) {
      image(this.piece.sprite.image, this.x, this.y, this.w, this.w, this.piece.sprite.offsetX, this.piece.sprite.offsetY, this.piece.sprite.spriteWidth, this.piece.sprite.spriteHeight)   
      }
     
    }
  }
  
  setTarget(board, target, cb) {
    let setTargetSuccessful = false
    if (this.piece) {
      setTargetSuccessful = this.piece.setTarget(board, this.row, this.col, target.row, target.col, cb)
    }
    return setTargetSuccessful
  }

  move(board, target) {
    let moveSuccessful = false
    if (this.piece) {
      moveSuccessful = this.piece.move(board, this.row, this.col, target.row, target.col)
    }
    return moveSuccessful
  }
}