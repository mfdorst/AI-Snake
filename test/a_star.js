import { should } from 'chai'
should()
import { Node, heuristicCost, fCost } from '../public/a_star'

describe('A*', () => {
  describe('heuristicCost(start, end)', () => {
    it('should be 0 when the nodes are the same', () => {
      heuristicCost(new Node(3, 4), new Node(3, 4)).should.equal(0)
    })
    it('should be 1 when the nodes are adjacent', () => {
      heuristicCost(new Node(0, 4), new Node(0, 5)).should.equal(1)
      heuristicCost(new Node(24, 16), new Node(25, 16)).should.equal(1)
    })
    it('should be 2 when the nodes are diagonally adjacent', () => {
      heuristicCost(new Node(0, 0), new Node(1, 1)).should.equal(2)
      heuristicCost(new Node(12, 6), new Node(11, 7)).should.equal(2)
    })
    it('should be the same no matter the order of the nodes', () => {
      heuristicCost(new Node(1, 3), new Node(5, 7)).should.equal(8)
      heuristicCost(new Node(5, 7), new Node(1, 3)).should.equal(8)
    })
  })

  describe('fCost(node, start, end)', () => {
    const a = new Node(24, 12)
    const b = new Node(13, 15)
    const c = new Node(20, 3)
    const aToB = 14
    const aToC = 13
    const bToC = 19
    it('should be 0 when node, start and end are the same', () => {
      fCost(a, a, a).should.equal(0)
      fCost(b, b, b).should.equal(0)
      fCost(c, c, c).should.equal(0)
    })
    it('should be the heuristic cost of start to end when node is at start', () => {
      fCost(a, a, b).should.equal(aToB)
      fCost(b, b, c).should.equal(bToC)
      fCost(c, c, a).should.equal(aToC)
    })
    it('should be the heuristic cost of start to end when node is at end', () => {
      fCost(a, b, a).should.equal(aToB)
      fCost(b, c, b).should.equal(bToC)
      fCost(c, a, c).should.equal(aToC)
    })
    it('should be the sum of the heuristic cost from start to node and node to end', () => {
      fCost(a, b, b).should.equal(aToB * 2)
      fCost(a, b, c).should.equal(aToB + aToC)
      fCost(b, a, c).should.equal(aToB + bToC)
    })
  })
})
