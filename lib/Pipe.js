function Pipe() {
  this.x = 200;
  this.y = 200;
  this.width = 90;
  this.height = 0;
}

Pipe.prototype.draw = function (c, canvas) {
  c.fillStyle = "blue";
  c.fillRect(this.x, this.y, this.width, canvas.height - this.y);
};



module.exports = Pipe;
