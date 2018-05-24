'use strict'

const addresses = require('./addresses')

const metTokenAbi = require('./abis/METToken')
const auctionsAbi = require('./abis/Auctions')
const autonomousConverterAbi = require('./abis/AutonomousConverter')

const createContract = (web3, abi, address) =>
  typeof web3.eth.Contract === 'function'
    ? new web3.eth.Contract(abi, address)
    : web3.eth.contract(abi).at(address)

class MetronomeContracts {
  constructor (web3, chain = 'mainnet') {
    if (!web3 || !web3.eth) {
      throw new Error('Invalid web3 instance or not supplied')
    }
    if (!addresses[chain]) {
      throw new Error(`Invalid 'chain' parameter`)
    }

    this.chain = chain
    this.addresses = addresses[chain]

    this.metToken = createContract(web3, metTokenAbi, addresses[chain].metToken)
    this.auctions = createContract(web3, auctionsAbi, addresses[chain].auctions)
    this.autonomousConverter = createContract(
      web3,
      autonomousConverterAbi,
      addresses[chain].autonomousConverter
    )
  }
}

MetronomeContracts.addresses = addresses

module.exports = MetronomeContracts
