class TempCell extends Cell {
  constructor(row, col, w) {
    super(row, col, w)
    this.squarePoints = []
    this.circlePoints = []
    this.currentPoints = []
    this.points = 200
    this.size = this.points / 4
    this.squarePoints = this.getSquarePoints()
    this.circlePoints = this.getCirclePoints()
    this.currentPoints = this.getCirclePoints()
    this.count = 10
    this.val = 0
    this.cir = true
    // console.log(this.squarePoints)


    this.radius = this.w / 2
    // console.log(this.x, this.y, this.w)
  }

  draw() {
    noStroke()
    fill(255)
    rect(this.x, this.y, this.w, this.w)
    // this.drawCircle()
    // console.log(1)
    // stroke(0)
    // strokeWeight(3);
    // fill(255)
    // if (this.valid) fill(...VALID_COLOR)
    // if (this.collide()) fill(...HOVER_COLOR)
    // if (this.selected) fill(...SELECTED_COLOR)

    fill(...HOVER_COLOR)
    beginShape()

    this.val = (this.count / 60) % 2
    if (this.collide()) {
      this.cir = false
    } else {
      this.cir = true
    }

    for (let i = 0; i < this.currentPoints.length; i++) {
      // console.log(1)
      let toPoints
      if (this.cir) {
        toPoints = this.circlePoints
      } else {
        toPoints = this.squarePoints
      }
      this.currentPoints[i].x = lerp(this.currentPoints[i].x, toPoints[i].x, this.val)
      this.currentPoints[i].y = lerp(this.currentPoints[i].y, toPoints[i].y, this.val)
      vertex(this.currentPoints[i].x, this.currentPoints[i].y)
    }
    endShape(CLOSE)
  }

  getSquarePoints() {
    let results = []
    for (let i = 0; i < this.size; i++) {
      let x = ((this.w) / (this.size - 1)) * i + this.w * this.col
      let y = 0 + this.w * this.row
      results.push({
        x,
        y
      })
    }

    for (let i = 0; i < this.size; i++) {
      let x = this.w + this.w * this.col
      let y = (this.w) / (this.size - 1) * i + this.w * this.row
      results.push({
        x,
        y
      })
    }

    for (let i = 0; i < this.size; i++) {
      let x = this.w - i * (this.w) / (this.size - 1) + this.w * this.col
      let y = this.w + this.w * this.row
      results.push({
        x,
        y
      })
    }

    for (let i = 0; i < this.size; i++) {
      let x = 0 + this.w * this.col
      let y = this.w - i * (this.w) / (this.size - 1) + this.w * this.row
      results.push({
        x,
        y
      })
    }
    return results
  }


  getCirclePoints() {
    let results = []
    let r = (this.w) / 2
    for (let i = 0; i < this.size; i++) {
      let x = r * Math.cos(degreesToRadians(225 + 90 / this.size * i)) + r + this.w * this.col
      let y = r * Math.sin(degreesToRadians(225 + 90 / this.size * i)) + r + this.w * this.row
      results.push({
        x,
        y
      })
    }

    for (let i = 0; i < this.size; i++) {
      let x = r * Math.cos(degreesToRadians(315 + 90 / this.size * i)) + r + this.w * this.col
      let y = r * Math.sin(degreesToRadians(315 + 90 / this.size * i)) + r + this.w * this.row
      results.push({
        x,
        y
      })
    }

    for (let i = 0; i < this.size; i++) {
      let x = r * Math.cos(degreesToRadians(45 + 90 / this.size * i)) + r + this.w * this.col
      let y = r * Math.sin(degreesToRadians(45 + 90 / this.size * i)) + r + this.w * this.row
      results.push({
        x,
        y
      })
    }

    for (let i = 0; i < this.size; i++) {
      let x = r * Math.cos(degreesToRadians(135 + 90 / this.size * i)) + r + this.w * this.col
      let y = r * Math.sin(degreesToRadians(135 + 90 / this.size * i)) + r + this.w * this.row
      results.push({
        x,
        y
      })
    }
    return results
  }
}