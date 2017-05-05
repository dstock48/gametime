// function PipeTop(num) {
//   this.x = 500;
//   this.y = 0;
//   this.width = 90;
//   this.height = num;
// }
//
// PipeTop.prototype.draw = function (c) {
//   c.fillRect(this.x, this.y, this.width, this.height);
// };

// PipeTop.prototype.move = function () {
//   this.x -= 3;
// };

function Pipe(canvas, gapSize = 150) {
  this.width = 90;
  this.x = canvas.width;
  this.point = true;
  this.gapSize = gapSize;

  this.top = {
    y: 0,
    height: (Math.floor(Math.random() * ((460 - 200) + 1)) + 100)
  }

  this.bottom = {
    y: this.top.height + this.gapSize,
    height: canvas.height - (this.top.height + this.gapSize)

  }
}

Pipe.prototype.move = function () {
  this.x -= 3;
};


Pipe.prototype.draw = function (c) {
  c.fillStyle = '#000';
  c.fillRect(this.x, this.top.y, this.width, this.top.height);               // top
  c.fillRect(this.x, this.bottom.y, this.width, this.bottom.height);    // bottom
};

// function PipeBottom(num) {
//   this.x = 500;
//   this.y = num + 150;
//   this.width = 90;
//   this.height = 0;
// }

// PipeBottom.prototype.draw = function (c, canvas) {
//   c.fillRect(this.x, this.y, this.width, canvas.height - this.y);
// };
//
// PipeBottom.prototype.move = function () {
//   this.x -= 3;
// };

// module.exports = {PipeTop, PipeBottom};
module.exports = {Pipe};
