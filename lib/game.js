require('./styles.css');
const Player = require('./Player.js');
const Pipe = require('./Pipe.js');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const bird = new Player();
const pipeBottom = new Pipe();
const gameStates = ['ready', 'gameOn', 'gameOver'];
let currentGameState = gameStates[0];

bird.draw(c);

function animate() {

  if (currentGameState === 'gameOn') {
    c.clearRect(0, 0, canvas.width, canvas.height);
    bird.fall(canvas);
    bird.draw(c);
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
