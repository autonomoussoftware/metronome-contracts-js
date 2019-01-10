'use strict'

const mapValues = require('../lib/map-values')

const aliases = require('./aliases.json')
const allContracts = require('./contracts.json')

const createContract = (web3, abi, address) =>
  typeof web3.eth.Contract === 'function'
    ? new web3.eth.Contract(abi, address)
    : web3.eth.contract(abi).at(address)

class MetronomeContracts {
  constructor (web3, _chain = 'mainnet') {
    if (!web3 || !web3.eth) {
      throw new Error('Invalid web3 instance or not supplied')
    }

    const chain = aliases[_chain]

    if (!allContracts[chain]) {
      throw new Error('Unknown "chain" parameter')
    }

    this.chain = chain
    this.addresses = mapValues(allContracts[chain], contract =>
      contract.address
    )

    const contracts = allContracts[chain]
    Object.assign(this, mapValues(contracts, (contract, name) =>
      createContract(
        web3,
        require(`./abis/${contract.version}/${name}.json`),
        contract.address
      )
    ))
  }
}

MetronomeContracts.addresses = mapValues(allContracts, contracts =>
  mapValues(contracts, contract => contract.address)
)

module.exports = MetronomeContracts
