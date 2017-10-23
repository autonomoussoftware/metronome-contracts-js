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
  const web3 = new Web3(provider)

  if (!config.account.addr) {
    config.account.addr = web3.eth.accounts[0]
  }

  const context = {
    config,
    provider,
    web3
  }

  return buildClient(context)
}

module.exports = metronome
