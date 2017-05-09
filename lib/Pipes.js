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
require('./game.js')

class Pipe {
  constructor(canvas, gapSize, padding) {
    this.width = 90;
    this.x = canvas.width;
    this.point = true;
    this.gapSize = gapSize;
    this.padding = padding;
    this.pipeArray = [],


    this.top = {
      y: 0,
      height: (Math.floor(Math.random() * (((canvas.height - pipe.gapSize - pipe.padding) - pipe.padding) + 1)) + pipe.padding)
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

  createNewPipes() {
    let newPipe;

    if (world.gameMode === 'easy') {
      newPipe = new Pipe(canvas, 300, 100);
      world.pipeSeparation = world.pipeSeparationValues.easy;
      world.pipeSpeed = 10;
    } else {
      newPipe = new Pipe(canvas, 135, 150);
      world.pipeSeparation = world.pipeSeparationValues.hard;
      world.pipeSpeed = 5;
    }

    pipe.pipeArray.push(newPipe);
  }
}

module.exports = Pipe;
