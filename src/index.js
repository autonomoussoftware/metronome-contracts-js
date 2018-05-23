'use strict'

const addresses = require('./addresses')

const metTokenAbi = require('./abis/METToken')
const auctionsAbi = require('./abis/Auctions')
const autonomousConverterAbi = require('./abis/AutonomousConverter')

class Metronome {
  constructor (web3, chain = 'main') {
    if (!addresses[chain]) {
      throw new Error(`Invalid 'chain' parameter`)
    }

    this.chain = chain
    this.addresses = addresses[chain]

    this.metToken = new web3.eth.Contract(metTokenAbi, addresses[chain].metToken)
    this.auctions = new web3.eth.Contract(auctionsAbi, addresses[chain].auctions)
    this.autonomousConverter = new web3.eth.Contract(autonomousConverterAbi, addresses[chain].autonomousConverter)
  }
}

Metronome.addresses = addresses

module.exports = Metronome
