const c = canvas.getContext('2d');
require('./game.js')



class World {
  constructor(c) {
    this.gameScore = 0,
    this.highScore = 0,
    this.pipeSeparation = 100,
    this.pipespeed = 0,
    this.pipeSeparationValues = {hard: 190, easy: 100},
    this.gameMode = 'hard',
    this.gameStates = ['ready', 'gameOn', 'gameOver'],
    this.currentGameState = this.gameStates[0]
  }


  gameOver() {
    world.currentGameState = world.gameStates[2];
    c.fillStyle = '#fff'
    c.font = '48px PressStart2P';
    c.fillText('☠️ GAME OVER ☠️', (canvas.width / 2) - 300, (canvas.height / 2))
    c.font = '20px PressStart2P';
    c.fillText('(Press Enter to play again)', (canvas.width / 2) - 260, (canvas.height / 2) + 40)
  }

  gameReadyMsg() {
    c.fillStyle = '#fff'
    c.font = '48px PressStart2P';
    c.fillText('READY', (canvas.width / 2) - 120, (canvas.height / 2))
    c.font = '20px PressStart2P';
    c.fillText('(Press Space to begin)', (canvas.width / 2) - 220, (canvas.height / 2) + 40)
  }

  displayScore() {
    c.fillStyle = '#fff'
    c.font = '20px PressStart2P';
    c.fillText('SCORE: ', 10, 30)
    // c.fillText(world.gameScore, 140, 30)
    c.fillText('HIGHSCORE: ', 10, 60)
    // c.fillText(world.highScore, 220, 60)
  }

  animate() {

    if (World.currentGameState === 'gameOn') {
      c.clearRect(0, 0, canvas.width, canvas.height);
      world.increaseScore();
      pipe.pipeArray.forEach((pipe) => {
        pipe.move(world.pipeSpeed);
        pipe.draw(c, canvas);
      });

      pipe.pipeArray.forEach((pipe) => {
        if (pipe.x + pipe.width < 0) {
          pipe.pipeArray.shift();
        }
      });

      player.fall(canvas);
      player.draw(c);
      player.drawImg(c, playerImg);



      if (pipe.pipeArray.length === 0) {
        pipe.createNewPipes();
      } else if (pipe.pipeArray[pipe.pipeArray.length - 1].x + pipe.pipeArray[pipe.pipeArray.length - 1].width < canvas.width - pipeSeparation) {
        pipes.createNewPipes();
      }

      world.displayScore();
      player.detectColllision(canvas, pipe.pipeArray, gameOver);
    }

    requestAnimationFrame(world.animate);
  }

  playerFly(e) {

    if (world.currentGameState === 'gameOver' && e.which === 13) {
      world.resetGame();
    }

    if (e.type === 'click' || e.which === 32) {

      if (world.currentGameState === 'ready') {
        world.currentGameState = world.gameStates[1]
      }

      if (world.currentGameState === 'gameOn') {
        player.fly();
      }
    }
  }

  resetGame() {
    world.currentGameState = world.gameStates[0];
    c.clearRect(0, 0, canvas.width, canvas.height);
    pipe.pipeArray = [];
    gameScore = 0;
    player.y = 300;
    player.draw(c);
    player.drawImg(c, playerImg);
    world.gameReadyMsg();
    world.displayScore();
  }

  increaseScore() {
    if (pipe.pipeArray.length > 0)  {
      if (player.x > pipe.pipeArray[0].x + pipe.pipeArray[0].width) {
        if (pipe.pipeArray[0].point === true) {
          gameScore++
          if (world.gameScore > world.highScore) {
            let newHighScore = world.gameScore

            world.highScore = newHighScore;
          }
          pipe.pipeArray[0].point = false;
        }
      }
    }
  }



}

module.exports = World;
