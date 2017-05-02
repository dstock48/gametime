function Player () {
  this.x = 60;
  this.y = 300;
  this.width = 30;
  this.height = 30;
}

Player.prototype.draw = function (c) {
  c.fillRect(this.x, this.y, this.width, this.height);
};

Player.prototype.fall = function (canvas) {
  if (this.y < canvas.height - this.height) {
    this.y += 4;
  }
};

Player.prototype.fly = function () {
  if (this.y > 100) {
    // this.y -= 150;
    this.y -= 150;
  }
};

module.exports = Player;
