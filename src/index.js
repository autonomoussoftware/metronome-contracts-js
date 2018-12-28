'use strict'

const addresses = require('./addresses')

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
      throw new Error('Invalid "chain" parameter')
    }

    this.chain = chain
    this.addresses = addresses[chain]

    const contracts = {
      auctions: require('./abis/Auctions'),
      autonomousConverter: require('./abis/AutonomousConverter'),
      metToken: require('./abis/METToken'),
      tokenPorter: require('./abis/TokenPorter'),
      validator: require('./abis/Validator')
    }
    // eslint-disable-next-line no-return-assign
    Object.keys(contracts).forEach(name =>
      this[name] = createContract(web3, contracts[name], addresses[chain][name])
    )
  }
}

MetronomeContracts.addresses = addresses

module.exports = MetronomeContracts
