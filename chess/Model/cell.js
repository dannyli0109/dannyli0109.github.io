class Cell extends Box {
  constructor(row, col, w) {
    let x = col * w
    let y = row * w
    super(x, y, w, w)
    this.row = row
    this.col = col
    this.piece = false
    this.selected = false
    this.vaild = false
  }

  draw() {
    noStroke()
    if ((this.row * 7 + this.col) % 2 !== 0) {
      fill(255)
    } else {
      fill(200)
    }

    if (this.valid) fill(...VALID_COLOR)
    if (this.collide()) fill(...HOVER_COLOR)
    if (this.selected) fill(...SELECTED_COLOR)

    rect(this.x, this.y, this.w, this.w)
    // console.log(this.x, this.y)

    if ((this.row * 7 + this.col) % 2 === 1) {
      fill(255)
    } else {
      fill(200)
    }
    // circle(this.x, this.y, this.w/2)
    stroke(0)
    // beginShape();
    // curveVertex(this.x + this.w / 2, this.y);
    // curveVertex(this.x + this.w, this.y + this.w / 2);
    // curveVertex(this.x + this.w / 2, this.y + this.w);
    // curveVertex(this.x, this.y + this.w / 2);
    // endShape();

    // this.morphingCircle()

  }

  selectPiece(currentPlayer) {
    if (this.collide()) {
      if (this.piece) {
        if (this.piece.owner === currentPlayer) {
          this.selected = true
          this.piece.state = SELECTED_STATE
        }
      }
    }
  }

  targetPiece(selected) {
    if (this.collide()) {
      if (this.valid) {
        selected.target = this
        return true
      } else {
        selected.state = NORMAL_STATE
      }
    }
    return false
  }

  isEmpty() {
    return !this.piece
  }

}