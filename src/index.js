'use strict'

const addresses = require('./addresses')

const metToken = require('./contracts/METToken')
const auctions = require('./contracts/Auctions')
const autonomousConverter = require('./contracts/AutonomousConverter')

class Metronome {
  constructor (web3, { chain = 'main' } = {}) {
    if (!addresses[chain]) {
      throw new Error(`Invalid 'chain' parameter`)
    }

    return {
      metToken: new web3.eth.Contract(metToken.abi, addresses[chain].metToken),
      auctions: new web3.eth.Contract(auctions.abi, addresses[chain].auctions),
      autonomousConverter: new web3.eth.Contract(autonomousConverter.abi, addresses[chain].autonomousConverter)
    }
  }
}

Metronome.addresses = addresses

module.exports = Metronome
