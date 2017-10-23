/* global describe it expect */

const chai = require('chai')
chai.should()

const buildInterface = require('../src/buildInterface')

describe.skip('metronome.js', () => {
  it('Should validate correctly the library interface of the metronome contract', () => {
    const client = require('../contracts/interface/metronome.sol')
    const contextDummy = {
      client: client
    }
    const metronome = buildInterface(contextDummy)
    metronome.should.itself.respondTo('whatWouldPurchaseDo')
  })
})
