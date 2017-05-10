import { expect } from 'chai';
import Player from '../lib/Player.js'

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

  // it('should have a fillStyle of transparent when bird.draw is called', () => {
  //   bird.draw(c)
  //   expect(c.fillStyle === 'transparent')
  // })

  // it("should have it's y value increase by 5 when fall is called",() => {
  //   expect(bird.y).to.equal(300)
  //   bird.fall(canvas)
  //   expect(bird.y).to.equal(305)
  // })

  // it("should have it's y value decreased by 75 when bird.fly is called", () => {
  //   expect(bird.y).to.equal(300)
  //   bird.fly()
  //   expect(bird.y).to.equal(225)
  })
})
