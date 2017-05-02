require('./styles.css');
const Player = require('./Player.js');
const Pipe = require('./Pipe.js');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const bird = new Player();
const pipeBottom = new Pipe();

bird.draw(c);

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  bird.fall(canvas);
  bird.draw(c);
  pipeBottom.draw(c, canvas);
  requestAnimationFrame(animate);
}

canvas.addEventListener('click', function() {
  bird.fly();
});

requestAnimationFrame(animate);