/* global describe it expect */

const metronome = require('../src')

describe('metronome.js', () => {
  it('has a test function', () => {
    expect(typeof metronome.test).toBe('function')
  })
})
