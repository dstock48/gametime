// ES5 =============================
//
// function Player () {
//   this.x = 60;
//   this.y = 300;
//   this.width = 30;
//   this.height = 30;
// }
//
// Player.prototype.draw = function (c) {
//   c.fillStyle = 'transparent'
//   c.fillRect(this.x, this.y, this.width, this.height);
// };
//
// Player.prototype.drawImg = function (c, img) {
//   c.drawImage(img, this.x - 5, this.y - 5, this.width + 10, this.height + 10);
// };
//
// Player.prototype.fall = function (canvas) {
//   if (this.y < canvas.height - this.height) {
//     this.y += 5;
//   }
// };
//
// Player.prototype.fly = function () {
//   if (this.y > 75) {
//     this.y -= 75;
//   }
// };
//
// Player.prototype.detectColllision = function (canvas, pipeArray, gameOver) {
//   if (this.y + this.height - 3 === canvas.height) {
//     gameOver();
//   }
//   if (pipeArray.length > 0) {
//     if (
//         this.x < pipeArray[0].x + pipeArray[0].width &&
//         this.x + this.width > pipeArray[0].x &&
//         this.y < pipeArray[0].top.y + pipeArray[0].top.height  &&
//         this.height + this.y > pipeArray[0].top.y
//
//         ||
//
//         this.x < pipeArray[0].x + pipeArray[0].width &&
//         this.x + this.width > pipeArray[0].x &&
//         this.y < pipeArray[0].bottom.y + pipeArray[0].bottom.height  &&
//         this.height + this.y > pipeArray[0].bottom.y
//
//        ) {
//       gameOver();
//     }
//   }
// }


// ES6 =============================

class Player {
  constructor() {
    this.x = 60;
    this.y = 300;
    this.width = 30;
    this.height = 30;
  }

  draw (c) {
    c.fillStyle = 'transparent'
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  drawImg (c, img) {
    c.drawImage(img, this.x - 5, this.y - 5, this.width + 10, this.height + 10);
  }

  fall (canvas) {
    if (this.y < canvas.height - this.height) {
      this.y += 5;
    }
  }

  fly () {
    if (this.y > 75) {
      this.y -= 75;
    }
  }

  detectColllision (canvas, pipeArray, gameOver) {
    if (this.y + this.height - 3 === canvas.height) {
      gameOver();
    }
    if (pipeArray.length > 0) {
      if (
          this.x < pipeArray[0].x + pipeArray[0].width &&
          this.x + this.width > pipeArray[0].x &&
          this.y < pipeArray[0].top.y + pipeArray[0].top.height  &&
          this.height + this.y > pipeArray[0].top.y

          ||

          this.x < pipeArray[0].x + pipeArray[0].width &&
          this.x + this.width > pipeArray[0].x &&
          this.y < pipeArray[0].bottom.y + pipeArray[0].bottom.height  &&
          this.height + this.y > pipeArray[0].bottom.y

         ) {
        gameOver();
      }
    }
  }
}


module.exports = Player;
