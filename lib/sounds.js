const score = new Audio();
const hurt = new Audio();
const flap = new Audio();
const start = new Audio();

score.src = './audio/score.wav'
hurt.src = './audio/hurt.wav'
flap.src = './audio/flap.wav'
start.src = './audio/start.wav'

module.exports = { score, hurt, flap, start };
