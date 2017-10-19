/* global describe it expect */

const chai = require('chai')
chai.should()

const metronome = require('../src')

describe('metronome.js', () => {
  it('Should validate correctly the library interface', () => {
    metronome.should.itself.respondTo('createInstance')
  })
})
