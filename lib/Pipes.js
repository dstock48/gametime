const randNum = Math.floor(Math.random() * ((460 - 200) + 1)) + 100;

function PipeTop() {
  this.x = 500;
  this.y = 0;
  this.width = 90;
  this.height = randNum;
}

PipeTop.prototype.draw = function (c) {
  c.fillRect(this.x, this.y, this.width, this.height);
};

PipeTop.prototype.move = function () {
  this.x -= 2.5
}






function PipeBottom() {
  this.x = 500;
  this.y = randNum + 200;
  this.width = 90;
  this.height = 0;
}

PipeBottom.prototype.draw = function (c, canvas) {
  c.fillRect(this.x, this.y, this.width, canvas.height - this.y);
};

PipeBottom.prototype.move = function () {
  this.x -= 2.5
}


module.exports = {PipeTop, PipeBottom};
