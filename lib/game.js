require('./styles.css');
const Player = require('./Player.js');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const bird = new Player();

const PipeBottom = require('./Pipes.js').PipeBottom;
const pipeBottom = new PipeBottom();

const PipeTop = require('./Pipes.js').PipeTop;
const pipeTop = new PipeTop();

const gameStates = ['ready', 'gameOn', 'gameOver'];
let currentGameState = gameStates[0];

bird.draw(c);

function animate() {

  if (currentGameState === 'gameOn') {
    c.clearRect(0, 0, canvas.width, canvas.height);
    bird.fall(canvas);
    bird.draw(c);
    pipeTop.move();
    pipeTop.draw(c);
    pipeBottom.move();
    pipeBottom.draw(c, canvas);
  }

  requestAnimationFrame(animate);
}

canvas.addEventListener('click', birdFly);
window.addEventListener('keypress', birdFly);

function birdFly(e) {
  if (e.type === 'click' || e.which === 32) {
    currentGameState = gameStates[1];
    bird.fly();
  }
}

requestAnimationFrame(animate);
