'use strict'

const mapValues = require('../lib/map-values')

const aliases = require('./aliases.json')
const contractsDefinition = require('./contracts.json')

const allContracts = mapValues(aliases, alias =>
  mapValues(contractsDefinition[alias], ({ address, version }, name) => ({
    abi: require(`./abis/${version}/${name}.json`),
    address
  }))
)

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
    Object.assign(this, mapValues(contracts, ({ abi, address }) =>
      createContract(web3, abi, address)
    ))
  }
}

Object.assign(MetronomeContracts, allContracts)

module.exports = MetronomeContracts
