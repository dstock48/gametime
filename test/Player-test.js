// import { expect } from 'chai';
// import Player from '../lib/Player.js'

const expect = require('chai').expect;
const Player = require('../lib/Player.js');
const Pipe = require('../lib/Pipe.js');


describe('Player', () => {
  const player = new Player();

  it('should be an instance of Player', () => {
    expect(player).to.be.an.instanceof(Player);
  });

  it('should have an x value', () => {
    expect(player.x).to.equal(110);
  });

  it('should have an y value', () => {
    expect(player.y).to.equal(300);
  });

  it('should have an width value', () => {
    expect(player.width).to.equal(30);
  });

  it('should have an height value', () => {
    expect(player.height).to.equal(30);
  });

  it("should have it's y value increase by 5 when fall is called", () => {
    expect(player.y).to.equal(300);
    player.fall({height: 900});
    expect(player.y).to.equal(305);
  });

  it("should have it's y value decreased by 75 when player.fly is called", () => {
    expect(player.y).to.equal(305);
    player.fly();
    expect(player.y).to.equal(230);
  });

  it('should collide with pipe when they occupy the same coordinates', () => {
    const canvas = {height: 667, width: 900};
    const pipe = new Pipe(canvas, 1, 100);
    const pipeArray = [pipe];

    expect(player.detectColllision(canvas, pipeArray)).to.equal(false);
    pipe.move(795);
    expect(player.detectColllision(canvas, pipeArray)).to.equal(true);
  });
});
