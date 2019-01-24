'use strict'

const mapValues = require('../lib/map-values')

const aliases = require('./aliases.json')
const contractsDefinition = require('./contracts.json')

const allContracts = mapValues(aliases, alias =>
  mapValues(
    contractsDefinition[alias].contracts,
    ({ address, birthblock, version }, name) => ({
      abi: require(`./abis/${version}/${name}.json`),
      address,
      birthblock: birthblock || contractsDefinition[alias].birthblock
    })
  )
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

    const contracts = allContracts[aliases[_chain]]

    if (!contracts) {
      throw new Error('Unknown "chain" parameter')
    }

    Object.assign(this, mapValues(contracts, ({ abi, address }) =>
      createContract(web3, abi, address)
    ))
  }
}

Object.assign(MetronomeContracts, allContracts)

module.exports = MetronomeContracts
