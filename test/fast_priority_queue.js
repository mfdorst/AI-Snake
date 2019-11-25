import { should } from 'chai'
should()
import FastPriorityQueue from 'fastpriorityqueue'

describe('FastPriorityQueue', () => {
  const queue = new FastPriorityQueue()

  beforeEach(() => {
    queue.add(2)
    queue.add(3)
    queue.add(1)
  })

  describe('poll()', () => {
    it('should return the smallest element', () => {
      queue.poll().should.equal(1)
    })
    it('should remove elements as it returns them', () => {
      queue.poll().should.equal(1)
      queue.poll().should.equal(2)
    })
  })
})
