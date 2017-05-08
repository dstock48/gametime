// ES5 ==============================
// function Pipe(canvas, gapSize, padding) {
//   this.width = 90;
//   this.x = canvas.width;
//   this.point = true;
//   this.gapSize = gapSize;
//   this.padding = padding;
//
//   this.top = {
//     y: 0,
//     height: (Math.floor(Math.random() * (((canvas.height - gapSize - padding) - padding) + 1)) + padding)
//
//   }
//
//   this.bottom = {
//     y: this.top.height + this.gapSize,
//     height: canvas.height - (this.top.height + this.gapSize)
//
//   }
// }
//
// Pipe.prototype.move = function (speed) {
//   this.x -= speed;
// };
//
//
// Pipe.prototype.draw = function (c) {
//   c.fillStyle = '#000';
//   c.fillRect(this.x, this.top.y, this.width, this.top.height);          // top
//   c.fillRect(this.x, this.bottom.y, this.width, this.bottom.height);    // bottom
// };



// ES6 ==============================

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
    }

    this.bottom = {
      y: this.top.height + this.gapSize,
      height: canvas.height - (this.top.height + this.gapSize)
    }
  }

  move(speed) {
    this.x -= speed;
  }

  draw(c) {
    c.fillStyle = '#000';
    c.fillRect(this.x, this.top.y, this.width, this.top.height);          // top
    c.fillRect(this.x, this.bottom.y, this.width, this.bottom.height);    // bottom
  }
}

module.exports = {Pipe};
