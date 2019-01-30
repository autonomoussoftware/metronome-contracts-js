'use strict'

const mapValues = require('../lib/map-values')

const aliases = require('./aliases.json')
const contractsDefinition = require('./contracts.json')

// Create an object containing all chains, its contracts and static data.
const allContracts = mapValues(aliases, function (alias) {
  const definitions = contractsDefinition[alias]
  return mapValues(
    definitions.contracts,
    ({ address, birthblock, version }, name) =>
      ({
        abi: require(`./abis/${version || definitions.version}/${name}.json`),
        address,
        birthblock: birthblock || definitions.birthblock
      })
  )
})

/**
 * Create a contract using either web3@0.2x or web3@1.0.0
 *
 * @param {Web3} web3 The Web3 instance to instantiate the contracts.
 * @param {Array} abi The contract's ABI.
 * @param {string} address The contract's address.
 * @returns {*} The contract instance.
 */
const createContract = (web3, abi, address) =>
  typeof web3.eth.Contract === 'function'
    ? new web3.eth.Contract(abi, address)
    : web3.eth.contract(abi).at(address)

/** Class representing a contracts set. */
class MetronomeContracts {
  /**
   * Create a Metronome contracts set.
   *
   * The contract set contains instances of all the contracts at the proper
   * addresses depending on the target chain.
   *
   * @param {Web3} web3 The Web3 instance to instantiate the contracts.
   * @param {string} [chain='mainnet'] The target chain name or ID.
   */
  constructor (web3, chain = 'mainnet') {
    if (!web3 || !web3.eth) {
      throw new Error('Invalid web3 provided')
    }

    const contracts = allContracts[aliases[chain]]

    if (!contracts) {
      throw new Error('Unknown chain')
    }

    Object.assign(this, mapValues(contracts, ({ abi, address }) =>
      createContract(web3, abi, address)
    ))
  }
}

// Add contract definitions to the MetronomeContracts class for convenience
Object.assign(MetronomeContracts, allContracts)

module.exports = MetronomeContracts
