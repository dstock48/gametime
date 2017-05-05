require('./styles.css');
const Player = require('./Player.js');
const canvas = document.getElementById('canvas');
const easyBtn = document.getElementById('easy');
const hardBtn = document.getElementById('hard');
const c = canvas.getContext('2d');
const bird = new Player();
let frame = 0;
let gameScore = 0;
let gameSpeed = 100;
const gameSpeeds = {
  hard: 100,
  easy: 160
};
let gameMode = 'hard';


// const PipeBottom = require('./Pipes.js').PipeBottom;
//
// const PipeTop = require('./Pipes.js').PipeTop;

const Pipe = require('./Pipes.js').Pipe;

const gameStates = ['ready', 'gameOn', 'gameOver'];
let currentGameState = gameStates[0];

let pipeArray = []

bird.draw(c);



function createNewPipes() {
  let newPipe;

  //  AUTO DIFFICULTY INCREASE
  // if (gameScore > 2) {
  //   gameMode = 'hard'
  // }

  if (gameMode === 'easy') {
    newPipe = new Pipe(canvas, 300);
    gameSpeed = gameSpeeds.easy;
  } else {
    newPipe = new Pipe(canvas, 130);
    gameSpeed = gameSpeeds.hard;
  }

  pipeArray.push(newPipe);
}

function detectColllision() {
  if (bird.y + bird.height - 3 === canvas.height) {
    currentGameState = gameStates[2];
    // console.log(currentGameState);
  }
  if (pipeArray.length > 0) {
    if (
        bird.x < pipeArray[0].x + pipeArray[0].width &&
        bird.x + bird.width > pipeArray[0].x &&
        bird.y < pipeArray[0].top.y + pipeArray[0].top.height  &&
        bird.height + bird.y > pipeArray[0].top.y

        ||

        bird.x < pipeArray[0].x + pipeArray[0].width &&
        bird.x + bird.width > pipeArray[0].x &&
        bird.y < pipeArray[0].bottom.y + pipeArray[0].bottom.height  &&
        bird.height + bird.y > pipeArray[0].bottom.y

       ) {
      currentGameState = gameStates[2];
    }
  }
}

function animate() {


  if (currentGameState === 'gameOn') {
    frame++;
    c.clearRect(0, 0, canvas.width, canvas.height);
    increaseScore();
    pipeArray.forEach((pipe) => {
      pipe.move();
      pipe.draw(c, canvas);
    });

    pipeArray.forEach((pipe) => {
      if (pipe.x + pipe.width < 0) {
        pipeArray.shift();
      }
    });

    bird.fall(canvas);
    bird.draw(c);

    if (frame % gameSpeed === 0) {
      createNewPipes();
    }


  }

  // console.log(pipeArray)
  detectColllision();
  requestAnimationFrame(animate);
}

// setInterval( increaseScore, gameSpeed + ;

easyBtn.addEventListener('click', function() {
  resetGame();
  gameMode = 'easy'
  window.focus();
})
hardBtn.addEventListener('click', function() {
  resetGame();
  gameMode = 'hard'
  window.focus();
})

canvas.addEventListener('click', birdFly);
window.addEventListener('keypress', birdFly);

function birdFly(e) {
  if (e.type === 'click' || e.which === 32) {
    if (currentGameState === 'gameOver') {
      resetGame();
    }
    if (currentGameState === 'ready') {
      currentGameState = gameStates[1]
    }

    if (currentGameState === 'gameOn') {
      bird.fly();
    }
  }
}

function resetGame() {
  currentGameState = gameStates[0];
  c.clearRect(0, 0, canvas.width, canvas.height);
  pipeArray = [];
  gameScore = 0;
  bird.y = 300;
  bird.draw(c);
}

function increaseScore() {
  if (pipeArray.length > 0)  {
    if (bird.x > pipeArray[0].x + pipeArray[0].width + 20) {
      if (pipeArray[0].point === true) {
        gameScore++
        console.log('score', gameScore)
        pipeArray[0].point = false;
      }
    }
  }
}

requestAnimationFrame(animate);
