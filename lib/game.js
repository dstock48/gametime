//  Imports
require('./styles.css');
const { score, hurt, flap, start } = require('./sounds.js');
const { playerImg, burritoImg, mtndewImg } = require('./images.js');
const Pipe = require('./Pipe.js');
const Player = require('./Player.js');

//  Element selectors
const easyBtn = document.getElementById('easy');
const hardBtn = document.getElementById('hard');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

//  Event Listeners
window.addEventListener('keypress', gameAction);
easyBtn.addEventListener('click', () => changeDifficulty('easy', easyBtn, hardBtn));
hardBtn.addEventListener('click', () => changeDifficulty('hard', hardBtn, easyBtn));

const gameStates = ['ready', 'gameOn', 'gameOver'];
let currentGameState = gameStates[0];
let gameMode = 'hard';
let gameScore = 0;

let pipeSeparation;
let pipeSpeed;
let pipeArray = [];

const difficulty = {
  hard: {
    pipeSeparation: 190,
    pipeSpeed: 5,
    pipeGap: 135,
    pipeMinHeight: 150,
  },
  easy: {
    pipeSeparation: 350,
    pipeSpeed: 7,
    pipeGap: 200,
    pipeMinHeight: 100,
  }
};

if (JSON.parse(localStorage.getItem('highScore')) === null) {
  var highScore = {
    easy: 0,
    hard: 0
  };
} else {
  highScore = JSON.parse(localStorage.getItem('highScore'));
}

gameReadyMsg();
displayScore();

const player = new Player();

playerImg.onload = () => player.drawImg(c, playerImg);
player.draw(c);
start.play(); //  play start sound

//  Main Game function
function animate() {

  if (currentGameState === 'gameOn') {
    c.clearRect(0, 0, canvas.width, canvas.height);
    updatePipes();
    updatePlayer();
    checkScoreIncrease();
    displayScore();
  }

  requestAnimationFrame(animate);
}

//  Helper functions
function changeDifficulty(difLevel, btn1, btn2) {
  gameMode = difLevel;
  resetGame();
  displayScore();
  btn1.classList.add('active');
  btn2.classList.remove('active');
}

function checkScoreIncrease() {
  const firstPipe = pipeArray[0];

  if (pipeArray.length > 0
  && player.x > firstPipe.x + firstPipe.width
  && firstPipe.point === true)  {
    gameScore++;
    score.play(); //  play score sound
    pipeArray[0].point = false;
    if (gameMode === 'easy' && gameScore > highScore.easy) {
      highScore.easy = gameScore;

    } else if (gameMode === 'hard' && gameScore > highScore.hard) {
      highScore.hard = gameScore;
    }
  }
  setHighScoreLocal();
}

function createNewPipes() {
  let newPipe;
  let diffLevel;

  gameMode === 'easy' ? diffLevel = 'easy' : diffLevel = 'hard';
  newPipe = new Pipe(canvas, difficulty[diffLevel].pipeGap, difficulty[diffLevel].pipeMinHeight);
  pipeSeparation = difficulty[diffLevel].pipeSeparation;
  pipeSpeed = difficulty[diffLevel].pipeSpeed;

  pipeArray.push(newPipe);
}

function displayScore() {
  c.fillStyle = '#000';
  c.font = '20px PressStart2P';
  c.fillText('SCORE: ', 10, 30);
  c.fillText(gameScore, 140, 30);
  c.fillText('HIGHSCORE: ', 10, 60);

  gameMode === 'easy' ? c.fillText(highScore.easy, 220, 60)
                      : c.fillText(highScore.hard, 220, 60);
}

function gameAction(e) {
  if (e.which === 32) {
    if (currentGameState === 'ready') {
      currentGameState = gameStates[1];
    } else if (currentGameState === 'gameOn') {
      player.fly();
      flap.play();  //  play flap sound
    }
  } else if (e.which === 101) {
    changeDifficulty('easy', easyBtn, hardBtn);
  } else if (e.which === 104) {
    changeDifficulty('hard', hardBtn, easyBtn);
  } else if (currentGameState === 'gameOver' && e.which === 13) {
    resetGame();
  }
}

function gameOver() {
  hurt.play();  //  play hurt sound
  currentGameState = gameStates[2];
  c.fillStyle = '#000';
  c.font = '48px PressStart2P';
  c.fillText('☠️ GAME OVER ☠️', (canvas.width / 2) - 300, (canvas.height / 2));
  c.font = '20px PressStart2P';
  c.fillText('(Press Enter to play again)', (canvas.width / 2) - 260, (canvas.height / 2) + 40);
}

function gameReadyMsg() {
  c.fillStyle = '#000';
  c.font = '48px PressStart2P';
  c.fillText('READY', (canvas.width / 2) - 120, (canvas.height / 2));
  c.font = '20px PressStart2P';
  c.fillText('(Press Space to fly)', (canvas.width / 2) - 210, (canvas.height / 2) + 40);
}

function resetGame() {
  start.play(); //  play start sound
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

function updatePipes() {
  pipeArray.forEach(pipe => {
    pipe.move(pipeSpeed);
    pipe.draw(c, canvas);
    pipe.drawImg(c, burritoImg, mtndewImg);
  });

  pipeArray.forEach(pipe => {
    if (pipe.x + pipe.width < 0) {
      pipeArray.shift();
    }
  });

  const lastPipe = pipeArray[pipeArray.length - 1];

  if (pipeArray.length === 0 || lastPipe.x + lastPipe.width < canvas.width - pipeSeparation) {
    createNewPipes();
  }
}

function updatePlayer() {
  player.fall(canvas);
  player.draw(c);
  player.drawImg(c, playerImg);
  if (player.detectColllision(canvas, pipeArray)) {
    gameOver();
  }
}

function setHighScoreLocal() {
  const setHighScore = JSON.stringify(highScore);

  localStorage.setItem('highScore', setHighScore);
}

requestAnimationFrame(animate);
