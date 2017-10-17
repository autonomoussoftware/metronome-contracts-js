/* global describe it expect */

const metronome = require('../src')

describe('metronome.js', () => {
  it('has a test function', () => {
    metronome.test()
    expect(typeof metronome.test).toBe('function')
  })
})
