const Web3 = require('web3')
const buildClient = require('./buildClient')

const metronome = {}

const defaultConfig = {
  rpc: {
    host: 'http://localhost:8545'
  },
  contracts: {
    metronome: null,
    reservetoken: null,
    smartContract: null,
    aux: null,
    pair: null
  }
}

metronome.createInstance = instanceConfig => {
  const config = Object.assign({}, defaultConfig, instanceConfig)
  const provider = new Web3.providers.HttpProvider(config.rpc.host)
  const web3 = new Web3(provider)

  const context = {
    config,
    provider,
    web3
  }

  return buildClient(context)
}

module.exports = metronome
