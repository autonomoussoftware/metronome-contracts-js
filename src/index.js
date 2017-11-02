const Web3 = require('web3')
const buildClient = require('./buildClient')
const metronome = {}

const defaultConfig = {
  rpc: {
    host: 'http://localhost:8545'
  },
  contracts: {
    metronome: {
      addr: null
    },
    reservetoken: {
      addr: null
    },
    smartContract: {
      addr: null
    },
    aux: {
      addr: null
    },
    pair: {
      addr: null
    }
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
