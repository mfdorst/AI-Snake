import { should } from 'chai'
should()
import { Node, hCost } from '../public/a_star'

describe('A*', () => {
  describe('Heuristic cost function', () => {
    it('should be 0 when the nodes are the same', () => {
      hCost(new Node(3, 4), new Node(3, 4)).should.equal(0)
    })
    it('should be 1 when the nodes are adjacent', () => {
      hCost(new Node(0, 4), new Node(0, 5)).should.equal(1)
      hCost(new Node(24, 16), new Node(25, 16)).should.equal(1)
    })
    it('should be 2 when the nodes are diagonally adjacent', () => {
      hCost(new Node(0, 0), new Node(1, 1)).should.equal(2)
      hCost(new Node(12, 6), new Node(11, 7)).should.equal(2)
    })
    it('should be the same no matter the order of the nodes', () => {
      hCost(new Node(1, 3), new Node(5, 7)).should.equal(8)
      hCost(new Node(5, 7), new Node(1, 3)).should.equal(8)
    })
  })
})
