require('./styles.css');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const easyBtn = document.getElementById('easy');
const hardBtn = document.getElementById('hard');
const Pipe = require('./Pipes.js');
const Player = require('./Player.js');
const player = new Player();
const World = require('./World.js');
const world = new World(c);


const playerImg = new Image(); // NOTE: this should probably go in the player class -NB

// playerImg.src = '../images/fly.png'


player.draw(c);
world.gameReadyMsg();
world.displayScore();


easyBtn.addEventListener('click', function() {
  world.resetGame();
  world.gameMode = 'easy';
  world.highScore = 0;
  this.classList.add('active');
  hardBtn.classList.remove('active')
})
hardBtn.addEventListener('click', function() {
  world.resetGame();
  world.gameMode = 'hard';
  world.highScore = 0;
  this.classList.add('active');
  easyBtn.classList.remove('active')
})

canvas.addEventListener('click', player.playerFly);
window.addEventListener('keypress', player.playerFly);



requestAnimationFrame(world.animate);
