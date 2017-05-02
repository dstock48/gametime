function Pipe() {
  this.x = 500;
  this.y = 200;
  this.width = 90;
  this.height = 0;
}

Pipe.prototype.draw = function (c, canvas) {
  c.fillRect(this.x, this.y, this.width, canvas.height - this.y);
};

Pipe.prototype.move = function () {
  this.x -= 2.5
}


module.exports = Pipe;
