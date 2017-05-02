function PipeTop(num) {
  this.x = 500;
  this.y = 0;
  this.width = 90;
  this.height = num;
}

PipeTop.prototype.draw = function (c) {
  c.fillRect(this.x, this.y, this.width, this.height);
};

PipeTop.prototype.move = function () {
  this.x -= 3
}


function PipeBottom(num) {
  this.x = 500;
  this.y = num + 150;
  this.width = 90;
  this.height = 0;
}

PipeBottom.prototype.draw = function (c, canvas) {
  c.fillRect(this.x, this.y, this.width, canvas.height - this.y);
};

PipeBottom.prototype.move = function () {
  this.x -= 3
}

module.exports = {PipeTop, PipeBottom};
