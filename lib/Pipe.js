class Pipe {
  constructor(canvas, gapSize, padding) {
    this.width = 90;
    this.x = canvas.width;
    this.point = true;
    this.gapSize = gapSize;
    this.padding = padding;

    this.top = {
      y: 0,
      height: (Math.floor(Math.random() * (((canvas.height - gapSize - padding) - padding) + 1)) + padding)
    };

    this.bottom = {
      y: this.top.height + this.gapSize,
      height: canvas.height - (this.top.height + this.gapSize)
    };
  }

  move(speed) {
    this.x -= speed;
  }

  draw(c) {
    c.fillStyle = 'transparent';
    c.fillRect(this.x, this.top.y, this.width, this.top.height);          // top
    c.fillRect(this.x, this.bottom.y, this.width, this.bottom.height);    // bottom
  }

  drawImg (c, img1, img2) {
    c.drawImage(img1, this.x, this.top.y, this.width, this.top.height);
    c.drawImage(img2, this.x, this.bottom.y, this.width, this.bottom.height);
  }
}

module.exports = Pipe;
