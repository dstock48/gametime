

function Player () {
  this.x = 60;
  this.y = 300;
  this.width = 30;
  this.height = 30;
  this.img = './assets/fly.jpg';
}

Player.prototype.draw = function (c) {
  c.fillStyle = 'red'
  c.fillRect(this.x, this.y, this.width, this.height);
};

Player.prototype.drawImg = function (c) {
  c.drawImage(this.img, 20, 20)
};

Player.prototype.fall = function (canvas) {
  if (this.y < canvas.height - this.height) {
    this.y += 5;
  }
};

Player.prototype.fly = function () {
  if (this.y > 75) {
    this.y -= 75;
  }
};



module.exports = Player;
