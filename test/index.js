import { expect } from 'chai';
import Player from '../lib/Player.js'
import Pipe from '../lib/Pipes.js'
import {gameScore} from '../lib/game.js'
// const gameScore = require('../lib/game.js').gameScore;
// import canvas from '../lib/game.js'

describe('bird/Player', () => {
  const bird = new Player();

  it('should be an instance of Player', () => {
    expect(bird).to.be.an.instanceof(Player)
  })

  it('should have an x value', () => {
    expect(bird.x).to.equal(60)
  })

  it('should have an y value', () => {
    expect(bird.y).to.equal(300)
  })

  it('should have an width value', () => {
    expect(bird.width).to.equal(30)
  })

  it('should have an height value', () => {
    expect(bird.height).to.equal(30)
  })

  // it("should have it's y value increase by 5 when fall is called",() => {
  //   expect(bird.y).to.equal(300)
  //   bird.fall(canvas)
  //   expect(bird.y).to.equal(305)
  // })
})

describe('Pipes', () => {
  const pipe = new Pipe({width: 900}, 300, 100);

  it('should be an instance of Pipe', () => {
    expect(pipe).to.be.an.instanceof(Pipe)
  })

  it('should have a width of 90', () => {
    expect(pipe.width).to.equal(90)
  })

  it('should have a x value of 900', () => {
    expect(pipe.x).to.equal(900)
  })

  it('should have a point value of true', () => {
    expect(pipe.point).to.equal(true)
  })

  it('should have a gapSize value of 300', () => {
    expect(pipe.gapSize).to.equal(300)
  })

  it('should have a padding value of 100', () => {
    expect(pipe.padding).to.equal(100)
  })
})


describe ('game', () => {

  it('should have a gameScore of 0 to start', () => {
    expect(gameScore).to.equal(0)
  })

})

// this.width = 90;
// this.x = canvas.width;
// this.point = true;
// this.gapSize = gapSize;
// this.padding = padding;


//function Player () {
//   this.x = 60;
//   this.y = 300;
//   this.width = 30;
//   this.height = 30;
// }
