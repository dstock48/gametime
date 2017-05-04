require('./styles.css');
const Player = require('./Player.js');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const bird = new Player();
let frame = 0;
let gameScore = 0;

// const PipeBottom = require('./Pipes.js').PipeBottom;
//
// const PipeTop = require('./Pipes.js').PipeTop;

const Pipe = require('./Pipes.js').Pipe;

const gameStates = ['ready', 'gameOn', 'gameOver'];
let currentGameState = gameStates[0];

let pipeArray = []

bird.draw(c);



function createNewPipes() {
  const newPipe = new Pipe(canvas);

  pipeArray.push(newPipe);
  // const randNum = Math.floor(Math.random() * ((460 - 200) + 1)) + 100;
  // const newPipeTop = new PipeTop(randNum);
  // const newPipeBottom = new PipeBottom(randNum);
  // pipeArray.push(newPipeTop);
  // pipeArray.push(newPipeBottom);
}

function detectCoollision() {
  if (bird.y + bird.height - 3 === canvas.height) {
    currentGameState = gameStates[2];
    // console.log(currentGameState);
  }
}

function animate() {
  detectCoollision();

  if (currentGameState === 'gameOn') {
    frame++;
    c.clearRect(0, 0, canvas.width, canvas.height);
    bird.fall(canvas);
    bird.draw(c);

    if (frame % 150 === 0) {
      createNewPipes();
    }

    pipeArray.forEach((pipe) => {
      pipe.move();
      pipe.draw(c, canvas);
      if (pipe.x + pipe.width < 0) {
        pipeArray.splice(0, 1)
      }
    });
  }

  // console.log(pipeArray)

  requestAnimationFrame(animate);
}

setInterval( increaseScore, 220);




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
      gameScore++
      console.log('score', gameScore)
    }
  }
}

requestAnimationFrame(animate);
