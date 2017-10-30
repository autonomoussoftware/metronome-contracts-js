const Web3 = require('web3')
const buildClient = require('./buildClient')
const metronome = {}

const defaultConfig = {
  rpc: {
    host: 'http://localhost:8545'
  },
  account: {
    addr: null
  },
  metronome: {
    addr: 'default'
  }
}

metronome.createInstance = instanceConfig => {
  const config = Object.assign({}, defaultConfig, instanceConfig)
  const provider = new Web3.providers.HttpProvider(config.rpc.host)

  const context = {
    config,
    provider
  }

  return buildClient(context)
}

module.exports = metronome
