require('./styles.css');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const easyBtn = document.getElementById('easy');
const hardBtn = document.getElementById('hard');

const Pipe = require('./Pipes.js').Pipe;
const Player = require('./Player.js');
const player = new Player();

let gameScore = 0;
let highScore = 0;
let pipeSeparation = 100;
let pipeSpeed;
const pipeSeparationValues = {
  hard: 190,
  easy: 100
};
let gameMode = 'hard';
const gameStates = ['ready', 'gameOn', 'gameOver'];
let currentGameState = gameStates[0];
let pipeArray = []

const playerImg = new Image();

playerImg.src = '../images/fly.png'

playerImg.onload = function () {
  player.drawImg(c, playerImg);
}
player.draw(c);
gameReadyMsg();
displayScore();

function createNewPipes() {
  let newPipe;

  if (gameMode === 'easy') {
    newPipe = new Pipe(canvas, 300, 100);
    pipeSeparation = pipeSeparationValues.easy;
    pipeSpeed = 10;
  } else {
    newPipe = new Pipe(canvas, 135, 150);
    pipeSeparation = pipeSeparationValues.hard;
    pipeSpeed = 5;
  }

  pipeArray.push(newPipe);
}

function gameOver() {
  currentGameState = gameStates[2];
  c.fillStyle = '#fff'
  c.font = '48px PressStart2P';
  c.fillText('☠️ GAME OVER ☠️', (canvas.width / 2) - 300, (canvas.height / 2))
  c.font = '20px PressStart2P';
  c.fillText('(Press Enter to play again)', (canvas.width / 2) - 260, (canvas.height / 2) + 40)
}

function gameReadyMsg() {
  c.fillStyle = '#fff'
  c.font = '48px PressStart2P';
  c.fillText('READY', (canvas.width / 2) - 120, (canvas.height / 2))
  c.font = '20px PressStart2P';
  c.fillText('(Press Space to begin)', (canvas.width / 2) - 220, (canvas.height / 2) + 40)
}

function displayScore() {
  c.fillStyle = '#fff'
  c.font = '20px PressStart2P';
  c.fillText('SCORE: ', 10, 30)
  c.fillText(gameScore, 140, 30)
  c.fillText('HIGHSCORE: ', 10, 60)
  c.fillText(highScore, 220, 60)
}

function animate() {

  if (currentGameState === 'gameOn') {
    c.clearRect(0, 0, canvas.width, canvas.height);
    increaseScore();
    pipeArray.forEach((pipe) => {
      pipe.move(pipeSpeed);
      pipe.draw(c, canvas);
    });

    pipeArray.forEach((pipe) => {
      if (pipe.x + pipe.width < 0) {
        pipeArray.shift();
      }
    });

    player.fall(canvas);
    player.draw(c);
    player.drawImg(c, playerImg);



    if (pipeArray.length === 0) {
      createNewPipes();
    } else if (pipeArray[pipeArray.length - 1].x + pipeArray[pipeArray.length - 1].width < canvas.width - pipeSeparation) {
      createNewPipes();
    }

    displayScore();
    player.detectColllision(canvas, pipeArray, gameOver);
  }

  requestAnimationFrame(animate);
}

easyBtn.addEventListener('click', function() {
  resetGame();
  gameMode = 'easy';
  highScore = 0;
  this.classList.add('active');
  hardBtn.classList.remove('active')
})
hardBtn.addEventListener('click', function() {
  resetGame();
  gameMode = 'hard';
  highScore = 0;
  this.classList.add('active');
  easyBtn.classList.remove('active')
})

canvas.addEventListener('click', playerFly);
window.addEventListener('keypress', playerFly);

function playerFly(e) {

  if (currentGameState === 'gameOver' && e.which === 13) {
    resetGame();
  }

  if (e.type === 'click' || e.which === 32) {

    if (currentGameState === 'ready') {
      currentGameState = gameStates[1]
    }

    if (currentGameState === 'gameOn') {
      player.fly();
    }
  }
}

function resetGame() {
  currentGameState = gameStates[0];
  c.clearRect(0, 0, canvas.width, canvas.height);
  pipeArray = [];
  gameScore = 0;
  player.y = 300;
  player.draw(c);
  player.drawImg(c, playerImg);
  gameReadyMsg();
  displayScore();
}

function increaseScore() {
  if (pipeArray.length > 0)  {
    if (player.x > pipeArray[0].x + pipeArray[0].width) {
      if (pipeArray[0].point === true) {
        gameScore++
        if (gameScore > highScore) {
          let newHighScore = gameScore

          highScore = newHighScore;
        }
        pipeArray[0].point = false;
      }
    }
  }
}

requestAnimationFrame(animate);
