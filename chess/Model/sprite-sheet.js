class SpriteSheet {
  constructor(image, rows, cols) {
    this.rows = rows
    this.cols = cols
    this.sprites = []
    this.image = image

    const cutSpriteSheet = () => {
      let spriteWidth = this.image.width / this.cols
      let spriteHeight = this.image.height / this.rows
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          let sprite = {
            offsetX: j * spriteWidth,
            offsetY: i * spriteHeight,
            spriteWidth: spriteWidth,
            spriteHeight: spriteHeight,
            image: this.image
          }
          this.sprites.push(sprite)
        }
      }
    }
    cutSpriteSheet()
  }
}